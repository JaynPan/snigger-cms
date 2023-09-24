<template>
  <div class="container">
    <img src="../assets//logo.png" alt="Snigger" class="logo" />
    <div>
      <v-btn @click="googleLogin" color="primary" vai>Google Login</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import * as Sentry from '@sentry/vue';

import { adminUserUid } from '@/config/private';

@Options({
  components: {},
})
export default class Login extends Vue {
  private router = useRouter();

  private toast = useToast();

  googleLogin() {
    Sentry.captureException('login failed');
    // const auth = getAuth();
    // const provider = new GoogleAuthProvider();

    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);

    //     if (!credential) return;

    //     // const token = credential.accessToken;
    //     const { user } = result;

    //     if (user && user.uid === adminUserUid) {
    //       this.router.push('/uploader');
    //     } else {
    //       this.toast.error('your are not admin user');
    //     }
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const { email } = error.customData;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //   });
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 100px;
}
</style>
