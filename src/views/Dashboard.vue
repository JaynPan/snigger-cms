<template>
  <NavBar />
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from '@/components/NavBar.vue';

@Options({
  components: {
    NavBar,
  },
})
export default class HomeView extends Vue {}
</script>
