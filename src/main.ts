import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as Sentry from '@sentry/vue';

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

const vueApp = createApp(App);

Sentry.init({
  // vueApp,
  dsn: 'https://27e49e76ec8bbfe21cb459e344bb3de2@o4505934128939008.ingest.sentry.io/4505934132477952',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

vueApp.use(router).use(vuetify).use(ToastPlugin)
  .mount('#app');
