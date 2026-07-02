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
import App from './App.vue';
import managerDefaultPhoto from './assets/images/default.jpg';

Vue.use(Vuex);

// Глобальный миксин для безопасного получения менеджеров
Vue.mixin({
    methods: {
        safeGetManager(managerId) {
            const managers = this.$store.state.managers;
            if (managers && managers[managerId]) {
                const m = { ...managers[managerId] };
                if (m.PERSONAL_PHOTO && m.PERSONAL_PHOTO.indexOf('portal.yug-avto.ru') === -1 && m.PERSONAL_PHOTO.indexOf('default.') === -1) {
                    m.PERSONAL_PHOTO = 'https://portal.yug-avto.ru' + m.PERSONAL_PHOTO;
                }
                if (!m.PERSONAL_PHOTO || m.PERSONAL_PHOTO.match(/[ ]/)) {
                    m.PERSONAL_PHOTO = managerDefaultPhoto;
                }
                m.PERSONAL_PHOTO = m.PERSONAL_PHOTO.replace('ruimg', 'ru/img');
                return m;
            }
            return {
                LAST_NAME: '—',
                NAME: '',
                PERSONAL_PHOTO: managerDefaultPhoto,
                items: []
            };
        },
        safeGetActiveManager() {
            const managers = this.$store.state.managers || {};
            const keys = Object.keys(managers);
            if (keys.length === 0) return null;
            
            let index = this.$store.state.curMIndx || 0;
            if (index < 0 || index >= keys.length) {
                index = 0;
            }
            const managerId = keys[index];
            return this.safeGetManager(managerId);
        }
    }
});

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
    
    response.data._GET = _GET();
    
    // Инициализируем дополнительные реактивные свойства
    if (typeof response.data.curMIndx === 'undefined') {
        response.data.curMIndx = 0;
    }
    response.data.timeOffset = 0;
    response.data.currentTimeFormatted = { D: '01', M: '01', Y: '2026', H: '00', Min: '00', S: '00', Weekday: '' };

    const store = new Vuex.Store({
        state: response.data,
        mutations: {
            SET_DATA(state, payload) {
                if (payload.managers) {
                    state.managers = payload.managers;
                }
                if (payload.items) {
                    state.items = payload.items;
                }
            },
            INCREMENT_CUR_M_INDX(state, step = 1) {
                const keys = Object.keys(state.managers || {});
                if (keys.length === 0) {
                    state.curMIndx = 0;
                    return;
                }
                state.curMIndx += step;
                if (state.curMIndx >= keys.length) {
                    state.curMIndx = 0;
                }
            },
            SET_TIME_OFFSET(state, offset) {
                state.timeOffset = offset;
            },
            UPDATE_TIME(state) {
                let serverNow;
                if (state.currentDATE && state.currentTIME) {
                    const localNow = Date.now();
                    serverNow = new Date(localNow + state.timeOffset);
                } else {
                    serverNow = new Date();
                }
                
                const d = serverNow.getDate();
                const m = serverNow.getMonth() + 1;
                const y = serverNow.getFullYear();
                const h = serverNow.getHours();
                const min = serverNow.getMinutes();
                const s = serverNow.getSeconds();
                
                state.currentTimeFormatted = {
                    D: d < 10 ? '0' + d : String(d),
                    M: m < 10 ? '0' + m : String(m),
                    Y: String(y),
                    H: h < 10 ? '0' + h : String(h),
                    Min: min < 10 ? '0' + min : String(min),
                    S: s < 10 ? '0' + s : String(s),
                    Weekday: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][serverNow.getDay()]
                };
            }
        },
        actions: {
            initTimeSync({ commit, state }) {
                if (state.currentDATE && state.currentTIME) {
                    const serverDate = new Date(
                        state.currentDATE.Y,
                        state.currentDATE.M - 1,
                        state.currentDATE.D,
                        state.currentTIME.H,
                        state.currentTIME.M,
                        state.currentTIME.S || 0
                    );
                    const localNow = Date.now();
                    commit('SET_TIME_OFFSET', serverDate.getTime() - localNow);
                } else {
                    commit('SET_TIME_OFFSET', 0);
                }
                
                commit('UPDATE_TIME');
                
                // Единственный глобальный интервал для хода часов
                setInterval(() => {
                    commit('UPDATE_TIME');
                }, 1000);
            }
        }
    });

    // Запускаем синхронизацию времени
    store.dispatch('initTimeSync');

    new Vue({
        render: h => h(App),
        store: store
    }).$mount('#app')
})
.catch(error => { console.log(error) });

