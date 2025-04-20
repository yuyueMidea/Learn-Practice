<template>
  <nav>
    <router-link to="/">主页</router-link> | 
    <router-link v-for="dataEgg in dataEggs" :key="dataEgg.id" :title="dataEgg.type"
      :to="{name:'eggs', params:{eggType:dataEgg.type}}">{{dataEgg.name}} | </router-link>
      <button @click="backward">退后</button>
      <button @click="forward">前进</button>
  </nav>
  <router-view></router-view>
</template>

<script>
import dataEggs from "./data.json";

export default {
  data() {
    return {
      dataEggs
    }
  },
  methods: {
    backward() {
      this.$router.go(-1)
    },
    forward() {
      this.$router.go(1)
    }
  }
}
</script>