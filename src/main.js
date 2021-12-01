const _GET = function () {
    let pairs = window.location.search.substring(1).split("&"),
        pair, i, res = {};
    for ( i in pairs ) {
        if ( pairs[i] === "" ) continue;
        pair = pairs[i].split("=");
        res[ decodeURIComponent(pair[0]) ] = decodeURIComponent(pair[1]);
    }
    return res;
}

import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import App from './App.vue'

Vue.use(Vuex);

Axios.post(
    'https://portal.yug-avto.ru/service/screens/api/get/',
    _GET(), 
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
).then(response => {
    
    response.data._GET = _GET()
    const store = new Vuex.Store({
        state: response.data
    });
    new Vue({
        render: h => h(App),
        store: store
    }).$mount('#app')
})
.catch(error => { console.log(error) });
