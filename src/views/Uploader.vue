<template>
  <Layout>
    <v-file-input
      label="File input"
      accept="image/png, image/jpeg"
      prepend-icon="mdi-camera"
    ></v-file-input>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '@/components/Layout.vue';
</script>
