<!-- <template>
    <div id="gis_wrapper">
        <GisMap :center="[116.404, 39.915]" :zoom="12" />
    </div>
</template>


<script setup>
import GisMap from './GisMap.vue';
</script> -->

<template>
    <div ref="container" class="map-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  
  const container = ref()
  
  let scene, camera, renderer, controls, globeMesh
  
  onMounted(() => {
    initThree()
    animate()
  })
  
  onBeforeUnmount(() => {
    if (renderer) renderer.dispose()
  })
  
  function initThree() {
    const width = container.value.clientWidth
    const height = container.value.clientHeight
  
    // 初始化场景
    scene = new THREE.Scene()
  
    // 初始化相机
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5)
  
    // 初始化渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    container.value.appendChild(renderer.domElement)
  
    // 控制器
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
  
    // 添加光源
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)
  
    // 添加球体（地球）
    const geometry = new THREE.SphereGeometry(1.5, 64, 64)
    const textureLoader = new THREE.TextureLoader()
  
    // 可替换为地图纹理或 DEM 数据图
    // const earthTexture = textureLoader.load('https://planetpixelemporium.com/download/earth_atmos_2048.jpg')
    const earthTexture = textureLoader.load('/eo_base_2020_clean_3600x1800.png')


    // const earthTexture = textureLoader.load('https://raw.githubusercontent.com/JulianLaval/cosmos-browser/master/images/earthmap1k.jpg')
  
    const material = new THREE.MeshStandardMaterial({ map: earthTexture })
    globeMesh = new THREE.Mesh(geometry, material)
    scene.add(globeMesh)
  
    // 窗口自适应
    window.addEventListener('resize', onWindowResize)
  }
  
  function onWindowResize() {
    const width = container.value.clientWidth
    const height = container.value.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }
  
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 100vh;
    background-color: #000;
    overflow: hidden;
  }
  </style>
  