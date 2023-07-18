<template>
  <nav>
    <router-link to="/">Dashboard</router-link> |
    <button @click="handleSignOut" v-if="isAuthenticated">Sign out</button>
  </nav>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const isAuthenticated = ref(false);
    const auth = getAuth();
    const router = useRouter();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isAuthenticated.value = true;
        } else {
          isAuthenticated.value = false;
        }
      });
    });

    function handleSignOut() {
      signOut(auth).then(() => {
        router.push('/login');
      });
    }

    return {
      isAuthenticated,
      handleSignOut,
    };
  },
};
</script>
