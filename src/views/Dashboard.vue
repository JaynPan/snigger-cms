<template>https://eslint.vuejs.org/rules/multi-word-component-names.html
  <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Snigger</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="drawerLocation"
        temporary
      >
        <v-list color="primary">
        <!-- Dashboard Item -->
        <v-list-item @click="goToDashboard">
          <template v-slot:prepend>
            <v-icon icon="mdi-view-dashboard"></v-icon>
          </template>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Logout Item -->
        <v-list-item @click="logout">
          <template v-slot:prepend>
            <v-icon icon="mdi-clock"></v-icon>
          </template>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh;">
        <v-card-text>
          The navigation drawer will appear from the bottom on smaller size screens.
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';

const drawer = ref(false);
const group = ref(null);
const drawerLocation = ref(window.innerWidth < 960 ? 'bottom' : 'left');

const router = useRouter();
const auth = getAuth();

watch(group, () => {
  drawer.value = false;
});

const goToDashboard = () => {
  router.push('/');
};
const logout = () => {
  signOut(auth).then(() => {
    router.push('/login');
  });
};

</script>
