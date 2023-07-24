<template>
  <Layout>
    <div class="heading">
      <h3>Meme List</h3>
      <v-btn prepend-icon="mdi-refresh" @click="fetchMemeList">
        Refresh
      </v-btn>
    </div>
    <main class="container">
        <div v-for="(image, index) in images" :key="index" class="item-container">
          <v-btn
            density="default"
            icon="mdi-trash-can"
            class="delete-btn"
            @click="deletePhoto({documentId: image.documentId, filePath: image.filePath})"
          />
          <img :src="image.url" :alt="image.filePath" />
          <p>Document ID:</p>
          <b>{{ image.documentId }}</b>
          <p>Image File Path:</p>
          <b>{{ image.filePath }}</b>
        </div>
      </main>

      <v-progress-circular indeterminate color="red" class="spinner" v-if="isLoading"></v-progress-circular>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

import Layout from '@/components/Layout.vue';
import axiosInstance from '@/config/axios';

const images = ref<{url: string; filePath: string; documentId: string}[]>([]);
const isLoading = ref(false);
const $toast = useToast();

const fetchMemeList = async () => {
  try {
    isLoading.value = true;

    const response = await axiosInstance.get('/api/memeList');
    images.value = response.data;
  } catch (error) {
    console.error('Error fetching meme list:', error);
  } finally {
    isLoading.value = false;
  }
};

const deletePhoto = async ({ documentId, filePath }: {documentId: string; filePath: string}) => {
  try {
    isLoading.value = true;

    const response = await axiosInstance.delete('/api/meme', {
      params: { documentId, filePath },
    });

    const deleteImageIdx = images.value.findIndex((image) => image.documentId === response.data.documentId);

    if (deleteImageIdx > -1) {
      images.value.splice(deleteImageIdx, 1);
    }

    $toast.success('delete successfully!', {
      position: 'top-right',
    });
  } catch (error) {
    $toast.error('delete failed!', {
      position: 'top-right',
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchMemeList();
});
</script>

<style scoped>

.heading {
  margin-bottom: 16px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
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
  position: relative;
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}

.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
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
