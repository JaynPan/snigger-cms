import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import App from './App.vue';
import router from './router';
import firebaseConfig from './config/firebaseConfig';

const app = initializeApp(firebaseConfig);

getAuth(app);
createApp(App).use(router).mount('#app');
