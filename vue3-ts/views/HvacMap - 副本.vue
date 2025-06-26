<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
    <div class="map-controls">
      <input
        ref="addressInput"
        type="text"
        placeholder="搜索暖通设备位置..."
        class="search-input"
      />
      <button @click="showHeatmap" class="control-btn">显示热力图</button>
      <button @click="showEquipment" class="control-btn">显示设备</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { Style, Icon, Circle, Fill, Stroke } from 'ol/style';
import { GeoJSON } from 'ol/format';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import HeatmapLayer from 'ol/layer/Heatmap';

// 暖通设备示例数据
const hvacEquipmentData = [
  { id: 1, name: '空调主机', lon: 116.404, lat: 39.915, type: 'chiller' },
  { id: 2, name: '冷却塔', lon: 116.41, lat: 39.92, type: 'cooling-tower' },
  { id: 3, name: '水泵', lon: 116.395, lat: 39.91, type: 'pump' },
  // 更多设备数据...
];

const mapContainer = ref(null);
const addressInput = ref(null);
let map = null;
let geocoder = null;
let heatmapLayer = null;

// 设备图标样式
const equipmentStyles = {
  'chiller': new Style({
    image: new Icon({
      src: '/icons/chiller.png', // 替换为实际图标路径
      scale: 0.8
    })
  }),
  'cooling-tower': new Style({
    image: new Icon({
      src: '/icons/cooling-tower.png',
      scale: 0.8
    })
  }),
  'pump': new Style({
    image: new Icon({
      src: '/icons/pump.png',
      scale: 0.8
    })
  })
};

// 初始化地图
const initMap = () => {
  // 创建地图实例
  map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: fromLonLat([116.404, 39.915]), // 默认北京中心
      zoom: 12
    })
  });

  // 初始化地理编码器
  initGeocoder();
  
  // 添加设备图层
  addEquipmentLayer();
};

// 初始化地理编码搜索
const initGeocoder = () => {
  geocoder = new GeocoderAutocomplete(
    addressInput.value,
    'YOUR_GEOAPIFY_API_KEY', // 替换为你的Geoapify API Key
    {
      type: 'amenity',
      lang: 'zh',
      placeholder: '搜索暖通设备位置...',
      limit: 5,
      skipIcons: true
    }
  );

  geocoder.on('select', (location) => {
    if (location.properties.lon && location.properties.lat) {
      map.getView().animate({
        center: fromLonLat([location.properties.lon, location.properties.lat]),
        zoom: 16
      });
    }
  });
};

// 添加设备图层
const addEquipmentLayer = () => {
  console.log('==========添加设备图层')
  const vectorSource = new VectorSource();
  
  hvacEquipmentData.forEach(equipment => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([equipment.lon, equipment.lat])),
      name: equipment.name,
      type: equipment.type
    });
    
    feature.setStyle(equipmentStyles[equipment.type]);
    vectorSource.addFeature(feature);
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    zIndex: 10,
    blur:15,
    radius:11
  });

  map.addLayer(vectorLayer);
  
  // 添加点击交互
  map.on('click', (evt) => {
    const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
    if (feature) {
      const coordinates = feature.getGeometry().getCoordinates();
      console.warn('coordinates_: ', coordinates)
      const equipmentName = feature.get('name');
      console.log(`点击了设备: ${equipmentName}`, feature);
      // 这里可以显示设备详情弹窗等
    }
  });
};

// 显示热力图
const showHeatmap = () => {
  // 先移除现有热力图
  if (heatmapLayer) {
    map.removeLayer(heatmapLayer);
    heatmapLayer = null;
  }
  
  // 创建热力图数据
  const heatmapSource = new VectorSource();
  
  hvacEquipmentData.forEach(equipment => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([equipment.lon, equipment.lat])),
      weight: 0.5, // 热力权重
      name: equipment.name,
      type: equipment.type
    });
    heatmapSource.addFeature(feature);
  });

  heatmapLayer = new HeatmapLayer({
    source: heatmapSource,
    blur: 15,
    radius: 20,
    zIndex: 5
  });

  map.addLayer(heatmapLayer);
};

// 显示设备标记
/* const showEquipment = () => {
  // 移除热力图
  if (heatmapLayer) {
    map.removeLayer(heatmapLayer);
    heatmapLayer = null;
  }
  
  // 确保设备图层存在
  const existingLayer = map.getLayers().array_
    .find(layer => layer.getSource()?.getFeatures()?.some(f => f.get('type')));
  
  if (!existingLayer) {
    addEquipmentLayer();
  }
}; */
// 修改showEquipment方法
const showEquipment = () => {
  // 移除热力图
  if (heatmapLayer) {
    map.removeLayer(heatmapLayer);
    heatmapLayer = null;
  }
  
  // 查找现有的设备图层
  const layers = map.getLayers().getArray();
  const existingLayer = layers.find(layer => {
    const source = layer.getSource();
    return source instanceof VectorSource && 
           source.getFeatures().some(f => f.get('type'));
  });
  console.log(existingLayer, '========', layers)
  // if (!existingLayer) {
    addEquipmentLayer();
  // }
};

onMounted(() => {
  initMap();
});

onBeforeUnmount(() => {
  if (map) {
    map.setTarget(undefined);
    map = null;
  }
  if (geocoder) {
    geocoder.off('select');
    geocoder = null;
  }
});
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.map {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-input {
  width: 250px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.control-btn {
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.control-btn:hover {
  background-color: #f5f5f5;
}
</style>