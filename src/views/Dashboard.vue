<template>
  <Layout>
    <div class="title">Meme List</div>
    <main class="container">
        <div v-for="(image, index) in images" :key="index" class="image-container">
          <img :src="image.url" :alt="image.filePath" />
          <p>Document ID:</p>
          <b>{{ image.documentId }}</b>
          <p>Image File Path:</p>
          <b>{{ image.filePath }}</b>
        </div>
    </main>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

import Layout from '@/components/Layout.vue';
import { API_BASE_URL } from '@/config/private';

const images = ref<{url: string; filePath: string; documentId: string}[]>([]);

const fetchMemeList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/memeList`);
    images.value = response.data;
  } catch (error) {
    console.error('Error fetching meme list:', error);
  }
};

onMounted(() => {
  fetchMemeList();
});
</script>

<style>

.title {
  margin-bottom: 16px;
  font-size: 24px;
}

main.container {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 16px;
  row-gap: 16px;
}

img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.item-container {
  width: auto;
}

@media (min-width: 650px) {
  main.container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1050px) {
  main.container {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1400px) {
  main.container {
    grid-template-columns: repeat(6, 1fr);
  }
}

</style>
