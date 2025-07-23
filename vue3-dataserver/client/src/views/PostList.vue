<script setup>
import { useFetch } from './useFetch';

const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')

</script>
<template>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">出错了：{{ error.message }}</div>
    <ul v-else>
      <li v-for="post in data" :key="post.id">{{ post.title }}</li>
    </ul>
  </template>