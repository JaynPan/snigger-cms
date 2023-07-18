<template>
  <div>
    <button @click="googleLogin">google login</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

@Options({
  components: {},
})

export default class Login extends Vue {
  private router = useRouter();

  googleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (!credential) return;

        const token = credential.accessToken;

        console.log(token);
        // The signed-in user info.
        const { user } = result;

        console.log(user);
        this.router.push('/');
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
}
</script>
