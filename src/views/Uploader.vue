<template>
  <Layout>
    <v-file-input
      v-model="selectedFile"
      label="Select an image"
      accept="image/png, image/jpeg"
      prepend-icon="mdi-camera"
    ></v-file-input>
  <div style="text-align: right;">
    <v-btn @click="uploadImage" :loading="loading" color="primary" vai>Upload Image</v-btn>
  </div>
  </Layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';

import Layout from '@/components/Layout.vue';
import { API_BASE_URL } from '@/config/private';

const $toast = useToast();
const selectedFile = ref<any>(undefined);
const loading = ref(false);
const API_URL = `${API_BASE_URL}/api/meme`;

async function uploadImage() {
  if (selectedFile.value && !selectedFile.value[0]) {
    $toast.error('no image selected!', {
      position: 'top-right',
    });
    return;
  }

  const formData = new FormData();

  formData.append('photo', selectedFile.value[0]);

  try {
    loading.value = true;
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed.');
    }

    $toast.success('Upload Successfully!', {
      position: 'top-right',
    });
  } catch (error) {
    $toast.error('Error uploading image:', {
      position: 'top-right',
    });
    console.error(error);
    throw error;
  } finally {
    loading.value = false;
    selectedFile.value = undefined;
  }
}

</script>
