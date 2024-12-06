import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Importa el enrutador
import 'bulma/css/bulma.css';
import './assets/scss/variables.scss';
import '@fortawesome/fontawesome-free/css/all.css';


createApp(App)
  .use(router)  // Usa el enrutador
  .mount('#app'); // Monta la aplicación
