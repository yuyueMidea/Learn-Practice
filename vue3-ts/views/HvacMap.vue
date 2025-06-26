<template>
  <div class="hvac-map-system">
    <div ref="mapContainer" class="map-container"></div>
    
    <div class="map-controls">
      <div class="control-group">
        <button @click="toggleEquipment" :class="{active: showEquipment}">
          <i class="icon-equipment"></i> 设备视图
        </button>
        <button @click="toggleHeatmap" :class="{active: showHeatmap}">
          <i class="icon-heatmap"></i> 热力分析
        </button>
        <button @click="togglePipelines" :class="{active: showPipelines}">
          <i class="icon-pipeline"></i> 管网视图
        </button>
      </div>
      
      <div class="search-group">
        <input 
          v-model="searchQuery" 
          placeholder="搜索设备或区域..."
          @input="searchEquipment"
        />
        <div v-if="searchResults.length" class="search-results">
          <div 
            v-for="result in searchResults" 
            :key="result.id"
            @click="zoomToResult(result)"
          >
            {{ result.name }} - {{ result.typeName }}
          </div>
        </div>
      </div>
      
      <div class="legend">
        <div class="legend-item" v-for="item in legendItems" :key="item.label">
          <div class="color-box" :style="{backgroundColor: item.color}"></div>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    
    <div v-if="selectedEquipment" class="equipment-detail">
      <div class="detail-header">
        <h3>{{ selectedEquipment.name }}</h3>
        <button @click="selectedEquipment = null">×</button>
      </div>
      <div class="detail-body">
        <p><strong>类型:</strong> {{ selectedEquipment.typeName }}</p>
        <p><strong>状态:</strong> 
          <span :class="['status', selectedEquipment.status]">
            {{ statusText[selectedEquipment.status] }}
          </span>
        </p>
        <p><strong>位置:</strong> {{ selectedEquipment.location }}</p>
        <p><strong>温度:</strong> {{ selectedEquipment.temperature }}°C</p>
        <p><strong>压力:</strong> {{ selectedEquipment.pressure }} kPa</p>
        <div class="detail-actions">
          <button @click="highlightEquipment(selectedEquipment.id)">高亮显示</button>
          <button @click="showMaintenanceHistory(selectedEquipment.id)">维护记录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Point, LineString, Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { 
  Style, Icon, Circle, Fill, Stroke, Text 
} from 'ol/style';
import { GeoJSON } from 'ol/format';
import HeatmapLayer from 'ol/layer/Heatmap';
import { defaults as defaultInteractions } from 'ol/interaction';
import { transform } from 'ol/proj';
import { createEquipmentStyle, createPipelineStyle } from './mapUtils';

// 设备类型定义
const equipmentTypes = {
  chiller: { name: '空调主机', color: '#3498db', icon: 'chiller.png' },
  coolingTower: { name: '冷却塔', color: '#e74c3c', icon: 'cooling-tower.png' },
  pump: { name: '水泵', color: '#2ecc71', icon: 'pump.png' },
  fan: { name: '风机', color: '#f39c12', icon: 'fan.png' },
  valve: { name: '阀门', color: '#9b59b6', icon: 'valve.png' }
};

// 设备状态文本
const statusText = {
  normal: '正常运行',
  warning: '警告',
  error: '故障',
  offline: '离线'
};

// 地图引用
const mapContainer = ref(null);
let map = null;

// 图层控制
const showEquipment = ref(true);
const showHeatmap = ref(false);
const showPipelines = ref(true);

// 设备数据
const hvacEquipment = ref([
  { 
    id: 1, 
    name: '1号空调主机', 
    type: 'chiller', 
    lon: 116.404, 
    lat: 39.915, 
    status: 'normal',
    temperature: 12.5,
    pressure: 350,
    location: 'A栋地下室'
  },
  { 
    id: 2, 
    name: '冷却塔-东侧', 
    type: 'coolingTower', 
    lon: 116.41, 
    lat: 39.92, 
    status: 'warning',
    temperature: 32.8,
    pressure: 120,
    location: '屋顶东区'
  },
  { 
    id: 3, 
    name: '冷冻水泵-1', 
    type: 'pump', 
    lon: 116.395, 
    lat: 39.91, 
    status: 'normal',
    temperature: 18.2,
    pressure: 420,
    location: 'B1层泵房'
  }
]);

// 管网数据
const pipelines = ref([
  {
    id: 'pipe-1',
    type: 'chilledWater',
    points: [[116.404, 39.915], [116.405, 39.916], [116.407, 39.917]],
    diameter: 200,
    status: 'normal'
  },
  {
    id: 'pipe-2',
    type: 'condenserWater',
    points: [[116.41, 39.92], [116.409, 39.919], [116.407, 39.917]],
    diameter: 250,
    status: 'normal'
  }
]);

// 热力数据
const heatmapData = ref([
  { lon: 116.404, lat: 39.915, value: 0.8 },
  { lon: 116.405, lat: 39.916, value: 0.6 },
  { lon: 116.406, lat: 39.917, value: 0.7 },
  { lon: 116.407, lat: 39.918, value: 0.9 },
  { lon: 116.41, lat: 39.92, value: 0.95 }
]);

// 搜索功能
const searchQuery = ref('');
const searchResults = ref([]);
const selectedEquipment = ref(null);

// 图例项
const legendItems = computed(() => [
  ...Object.values(equipmentTypes).map(type => ({
    label: type.name,
    color: type.color
  })),
  { label: '冷冻水管', color: '#3498db' },
  { label: '冷却水管', color: '#e74c3c' },
  { label: '负荷区域', color: 'rgba(243, 156, 18, 0.5)' }
]);

// 初始化地图
const initMap = () => {
  map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: fromLonLat([116.404, 39.915]),
      zoom: 15,
      minZoom: 10,
      maxZoom: 19
    }),
    interactions: defaultInteractions({
      altShiftDragRotate: false,
      pinchRotate: false
    })
  });

  // 添加设备图层
  addEquipmentLayer();
  
  // 添加管网图层
  addPipelineLayer();
  
  // 添加热力图层（默认隐藏）
  addHeatmapLayer();
  
  // 添加区域图层
  addZonesLayer();
};

// 添加设备图层
const addEquipmentLayer = () => {
  const source = new VectorSource();
  
  hvacEquipment.value.forEach(equip => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([equip.lon, equip.lat])),
      name: equip.name,
      type: equip.type,
      status: equip.status,
      id: equip.id,
      data: equip
    });
    
    feature.setStyle(createEquipmentStyle(equip, equipmentTypes));
    source.addFeature(feature);
  });

  const layer = new VectorLayer({
    source: source,
    zIndex: 10
  });
  
  layer.set('name', 'equipment');
  map.addLayer(layer);
  
  // 添加点击事件
  map.on('click', (event) => {
    map.forEachFeatureAtPixel(event.pixel, (feature) => {
      if (feature.get('data')) {
        selectedEquipment.value = feature.get('data');
        return true; // 停止事件传播
      }
    });
  });
};

// 添加管网图层
const addPipelineLayer = () => {
  const source = new VectorSource();
  
  pipelines.value.forEach(pipe => {
    const line = new LineString(
      pipe.points.map(pt => fromLonLat(pt))
    );
    
    const feature = new Feature({
      geometry: line,
      type: pipe.type,
      diameter: pipe.diameter,
      status: pipe.status,
      id: pipe.id
    });
    
    feature.setStyle(createPipelineStyle(pipe));
    source.addFeature(feature);
  });

  const layer = new VectorLayer({
    source: source,
    zIndex: 5
  });
  
  layer.set('name', 'pipelines');
  map.addLayer(layer);
};

// 添加热力图图层
const addHeatmapLayer = () => {
  const source = new VectorSource();
  
  heatmapData.value.forEach(point => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([point.lon, point.lat]))
    });
    feature.set('weight', point.value);
    source.addFeature(feature);
  });

  const layer = new HeatmapLayer({
    source: source,
    blur: 20,
    radius: 25,
    opacity: 0.7,
    zIndex: 1,
    visible: showHeatmap.value
  });
  
  layer.set('name', 'heatmap');
  map.addLayer(layer);
};

// 添加区域图层
const addZonesLayer = () => {
  const source = new VectorSource();
  
  // 示例区域数据
  const zones = [
    {
      name: '办公区A',
      polygon: [[116.402, 39.914], [116.406, 39.914], [116.406, 39.918], [116.402, 39.918]],
      load: 1200 // kW
    },
    {
      name: '数据中心',
      polygon: [[116.408, 39.916], [116.412, 39.916], [116.412, 39.919], [116.408, 39.919]],
      load: 2500 // kW
    }
  ];
  
  zones.forEach(zone => {
    const polygon = new Polygon([zone.polygon.map(pt => fromLonLat(pt))]);
    const feature = new Feature({
      geometry: polygon,
      name: zone.name,
      load: zone.load
    });
    
    // 根据负荷设置颜色
    const opacity = Math.min(0.7, zone.load / 3000);
    feature.setStyle(new Style({
      fill: new Fill({
        color: `rgba(243, 156, 18, ${opacity})`
      }),
      stroke: new Stroke({
        color: 'rgba(192, 57, 43, 0.8)',
        width: 2
      }),
      text: new Text({
        text: `${zone.name}\n${zone.load} kW`,
        font: 'bold 12px sans-serif',
        fill: new Fill({ color: '#2c3e50' })
      })
    }));
    
    source.addFeature(feature);
  });

  const layer = new VectorLayer({
    source: source,
    zIndex: 2
  });
  
  layer.set('name', 'zones');
  map.addLayer(layer);
};

// 切换设备显示
const toggleEquipment = () => {
  showEquipment.value = !showEquipment.value;
  setLayerVisibility('equipment', showEquipment.value);
};

// 切换热力图显示
const toggleHeatmap = () => {
  showHeatmap.value = !showHeatmap.value;
  setLayerVisibility('heatmap', showHeatmap.value);
};

// 切换管网显示
const togglePipelines = () => {
  showPipelines.value = !showPipelines.value;
  setLayerVisibility('pipelines', showPipelines.value);
};

// 设置图层可见性
const setLayerVisibility = (layerName, visible) => {
  console.log(layerName,6666, visible )
  map.getLayers().forEach(layer => {
    if (layer.get('name') === layerName) {
      layer.setVisible(visible);
    }
  });
};

// 搜索设备
const searchEquipment = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  
  const query = searchQuery.value.toLowerCase();
  /* searchResults.value = [
    ...hvacEquipment.value.filter(equip => 
        equip.name.toLowerCase().includes(query) || 
        equipmentTypes[equip.type].name.toLowerCase().includes(query).map(equip => ({
        ...equip,
        typeName: equipmentTypes[equip.type].name,
        isEquipment: true
      })),
    ...pipelines.value.filter(pipe => pipe.id.toLowerCase().includes(query)).map(pipe => ({
        id: pipe.id,
        name: pipe.id,
        typeName: pipe.type === 'chilledWater' ? '冷冻水管' : '冷却水管',
        data: pipe,
        isEquipment: false,
      }))
  ]; */
};

// 缩放到搜索结果
const zoomToResult = (result) => {
  if (result.isEquipment) {
    // 设备类型
    map.getView().animate({
      center: fromLonLat([result.lon, result.lat]),
      zoom: 18,
      duration: 1000
    });
    selectedEquipment.value = result;
  } else {
    // 管网类型
    const points = result.data.points;
    const centerLon = points.reduce((sum, pt) => sum + pt[0], 0) / points.length;
    const centerLat = points.reduce((sum, pt) => sum + pt[1], 0) / points.length;
    
    map.getView().animate({
      center: fromLonLat([centerLon, centerLat]),
      zoom: 17,
      duration: 1000
    });
  }
  
  searchResults.value = [];
  searchQuery.value = '';
};

// 高亮设备
const highlightEquipment = (id) => {
  map.getLayers().forEach(layer => {
    if (layer.get('name') === 'equipment') {
      const source = layer.getSource();
      source.getFeatures().forEach(feature => {
        if (feature.get('id') === id) {
          // 创建高亮样式
          const originalStyle = feature.getStyle();
          feature.setStyle(new Style({
            image: new Circle({
              radius: 15,
              fill: new Fill({ color: 'rgba(255, 255, 0, 0.5)' }),
              stroke: new Stroke({ color: '#f1c40f', width: 3 })
            })
          }));
          
          // 3秒后恢复原始样式
          setTimeout(() => {
            feature.setStyle(originalStyle);
          }, 3000);
        }
      });
    }
  });
};

// 显示维护记录
const showMaintenanceHistory = (id) => {
  console.log(`显示设备 ${id} 的维护记录`);
  // 实际项目中这里会打开维护记录弹窗
};

onMounted(() => {
  initMap();
});

onBeforeUnmount(() => {
  if (map) {
    map.setTarget(undefined);
  }
});
</script>

<style scoped>
.hvac-map-system {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
  background-color: #f0f5f9;
}

.map-controls {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
}

.control-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.control-group button {
  padding: 8px 12px;
  background: #ecf0f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  transition: all 0.3s;
}

.control-group button:hover {
  background: #d5dbdb;
}

.control-group button.active {
  background: #3498db;
  color: white;
}

.search-group {
  position: relative;
}

.search-group input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 200;
}

.search-results div {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 14px;
}

.search-results div:hover {
  background-color: #f5f5f5;
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.equipment-detail {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.detail-header h3 {
  margin: 0;
  font-size: 18px;
}

.detail-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #7f8c8d;
}

.detail-body p {
  margin: 8px 0;
  font-size: 14px;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
}

.status.normal { background: #2ecc71; }
.status.warning { background: #f39c12; }
.status.error { background: #e74c3c; }
.status.offline { background: #7f8c8d; }

.detail-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.detail-actions button {
  flex: 1;
  padding: 8px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.detail-actions button:last-child {
  background: #9b59b6;
}

.icon-equipment, .icon-heatmap, .icon-pipeline {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
}

.icon-equipment { background-image: url('@/assets/icons/equipment.png'); }
.icon-heatmap { background-image: url('@/assets/icons/heatmap.png'); }
.icon-pipeline { background-image: url('@/assets/icons/pipeline.png'); }
</style>