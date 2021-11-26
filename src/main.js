// const _GET = function () {
//     let pairs = window.location.search.substring(1).split("&"),
//         pair, i, res = {};
//     for ( i in pairs ) {
//         if ( pairs[i] === "" ) continue;
//         pair = pairs[i].split("=");
//         res[ decodeURIComponent(pair[0]) ] = decodeURIComponent(pair[1]);
//     }
//     return res;
// }

var s = JSON.parse('{"company":{"ID":"test","PROPERTY_INN_VALUE":"0101010101010101","PROPERTY_BRAND_VALUE":"Other","PROPERTY_PHONE_ADV_VALUE":"79529811232"},"managers":{"128cff59-42d1-11e3-b795-00155d003503":{"ID":"3436","XML_ID":"128cff59-42d1-11e3-b795-00155d003503","NAME":"Рустам","LAST_NAME":"Сиюхов","PERSONAL_PHOTO":null,"PERSONAL_MOBILE":"89618183000"}},"items":[{"manager":"128cff59-42d1-11e3-b795-00155d003503","time":{"in":"13:39","out":""},"plate":"К684КВ01","model":"HYUNDAI CRETA","status":"waiting","client":"Романенко Анна Викторовна"}],"statuses":{"waiting":"Ожидание клиента","working":"В работе","success":"Ремонт выполнен","error":"Что-то пошло не так","canceled":"Отменено"},"titleH1":"Добро пожаловать!","titleH2":"Юг-Авто","empty":"Для записи, пожалуйста, обратитесь к любому свободному мастеру-консультанту.","footer":"Мы ценим Ваше время, спасибо за пунктуальность!","design":"all","status":"success","ADV":false,"currentDATE":{"Y":2021,"M":11,"D":26},"currentTIME":{"H":14,"M":37,"S":39}}');

import Vue from 'vue';
import Vuex from 'vuex';
// import Axios from 'axios';
import App from './App.vue'

Vue.use(Vuex);


// Axios.post(
//     'https://portal.yug-avto.ru/service/screens/api/get/',
//     _GET(), 
//     {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Accept': 'application/json'
//         }
//     }
// ).then(response => {
//     const store = new Vuex.Store({
//         state: response.data
//     });
//     new Vue({
//         render: h => h(App),
//         store: store
//     }).$mount('#app')
// })
// .catch(error => { console.log(error) });



const store = new Vuex.Store({
    state: s
});
new Vue({
    render: h => h(App),
    store: store
}).$mount('#app')
