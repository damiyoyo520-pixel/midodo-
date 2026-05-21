import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import AntDesignVue from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './styles/globals.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(AntDesignVue);

app.mount('#app');
