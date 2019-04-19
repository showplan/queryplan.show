import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
    faCloudUploadAlt,
    faExclamationCircle,
    faSun,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'normalize.css';
import 'showplan-vue/dist/showplan-vue.css';
import '../styles/web-app.scss';
import App from './App.vue';

// Vue.config.productionTip = false;
library.add(faGithub, faCloudUploadAlt, faSun, faMoon);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
    render: h => h(App),
}).$mount('#app');
