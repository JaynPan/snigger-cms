import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// eslint-disable-next-line import/extensions
import 'vuetify/styles';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { fa } from 'vuetify/iconsets/fa';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue';
import router from './router';
import firebaseConfig from './config/firebaseConfig';

const app = initializeApp(firebaseConfig);
console.log(process.env.VUE_APP_FIRBASE_API_KEY);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  theme: {
    defaultTheme: 'dark',
  },
});

getAuth(app);
createApp(App).use(router).use(vuetify).use(ToastPlugin)
  .mount('#app');
