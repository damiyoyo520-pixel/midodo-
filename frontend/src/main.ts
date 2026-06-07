import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import AntDesignVue from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './styles/globals.css';
import { useAuthStore } from './stores/auth';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(AntDesignVue);

const authStore = useAuthStore();
authStore.initializeAuth();

app.mount('#app');
