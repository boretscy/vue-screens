<template>
    
    <div class="container p-0">
        <div class="row">
            <div class="col-6">
                <div class="row">
                    <div class="col-2 logo">
                        <img 
                            class="w-100" 
                            :src="require('../assets/images/vw.jpg')" />
                    </div>
                    <div class="col-10 pl-5">
                        <h1 class="pt-3 pb-0 mb-0">{{ STATE.titleH1 }}</h1>
                        <h2>{{ STATE.titleH2 }}</h2>
                        <Timer />
                    </div>
                </div>
            </div>
            <div 
                class="col-6 d-flex justify-content-end"
                v-if="STATE.managers"
                >
                <div 
                    class="col-3 text-center manager"
                    v-for="manager in STATE.managers"
                    :key="manager.ID"
                    >
                    <img 
                        class="w-100" 
                        :src="manager.PERSONAL_PHOTO" />
                    <p class="font-weight-bold m-0 mt-2">{{ manager.LAST_NAME }} {{ manager.NAME }}</p>
                    <p class="m-0 phone">{{ FormatPhone(STATE.company.PROPERTY_PHONE_ADV_VALUE) }}</p>
                </div>
            </div>
        </div>
        <div class="row py-4">
            <div class="col">
                <table class="table text-center m-0">
                    <thead>
                        <tr>
                            <th style="width: 10%;">Время записи</th>
                            <th style="width: 10%;">Время выдачи</th>
                            <th style="width: 20%;">Гос. номер автомобиля</th>
                            <th style="width: 20%;">Модель автомобиля</th>
                            <th style="width: 25%;">Мастер-консультант</th>
                            <th style="width: 15%;">Статус готовности</th>
                        </tr>
                    </thead>
                    <tbody v-if="STATE.items">
                        <tr
                            v-for="(item, indx) in STATE.items"
                            :key="indx"
                            >
                            <td>{{ item.time.in }}</td>
                            <td>{{ item.time.out }}</td>
                            <td>{{ item.plate }}</td>
                            <td>{{ item.model }}</td>
                            <td>{{ STATE.managers[item.manager].LAST_NAME }} {{ STATE.managers[item.manager].NAME }}</td>
                            <td class="status text-left">
                                <span :class="item.status"></span>
                                {{ STATE.statuses[item.status] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row my-5" v-if="!STATE.items.length">
            <div class="col py-5 text-center datetime">{{ STATE.empty }}</div>
        </div>
        <div class="row" v-if="STATE.items.length">
            <div class="col text-center datetime">{{ STATE.footer }}</div>
        </div>

    </div>

</template>

<script>

import manager from "../assets/images/default.jpg"
import Timer from "./parts/Timer.vue"

export default {
    name: 'VW',
    components: {
        Timer
    },
    data: function () {
        return {
            manager: manager
        }
    },
    computed: {

        STATE() { 
            
            let STATE = this.$store.state
            for ( let i in STATE.managers ) {
                
                if ( STATE.managers[i].PERSONAL_PHOTO && STATE.managers[i].PERSONAL_PHOTO.indexOf('portal.yug-avto.ru') == -1 ) STATE.managers[i].PERSONAL_PHOTO = 'https://portal.yug-avto.ru'+STATE.managers[i].PERSONAL_PHOTO
                if ( !STATE.managers[i].PERSONAL_PHOTO )  STATE.managers[i].PERSONAL_PHOTO = manager
            }

            return STATE
        }
    },
	methods: {

        FormatPhone( q ) {
			
			q = String(q).replace(/[^\d;]/g, '');
			return ( q.length >= 11 ) ? '+' + ((q[0]=='7')?q[0]:'7') + ' ' + q[1] + q[2] + q[3] + ' ' + q[4] + q[5] + q[6] + ' ' + q[7] + q[8] + ' ' + q[9] + q[10] : null;
		}
	}
}
</script>

<style scoped>
@import '../assets/css/fonts/vw.css';

.container {
	--yablack: #000000;
    --yawhite: #ffffff;
    
    --yadarkblue: #001e50;
    --yagreen: #00872b;
    --yayellow: #ffd100;
    --yalightblue: #00b0f0;

    max-width: calc(100vw - 17%);
    margin: 8.5% auto 0 auto;
    height: calc(100vh - 17%) !important;
    overflow: hidden;
}
.bg-gray {
    background-color: #ccc;
}

.container, table {
    font-family:"VWTextWeb";
    font-size: 1.15vw; /* 0.75 */
    overflow: hidden;
    color: var(--yablack);
}
.phone {
    font-size: 1vw;
}
.badge{padding-right: .6em; padding-left: .6em; font-size: 85%;}

h1 {
    font-size: 1.98vw; /* 1.58 */
    font-family:"VWHeadWeb";
    font-weight: 700;
    color: var(--yadarkblue);
}
h2 {
    font-size: 1.98vw; /* 1.58 */
    font-family:"VWHeadWeb";
    font-weight: 300;
    color: var(--yadarkblue);
}
.datetime {
    font-size: 1.3vw;
    font-family:"VWHeadWeb";
    font-weight: 700;
}

table {
    border-bottom: 3px var(--yablack) solid;
    border-top: 3px var(--yablack) solid;
}
thead, tbody, tr, th, td {
    border: none !important;
}
table tbody tr, table thead tr {
    border-bottom: 1px var(--yablack) solid !important;
    border-top: 1px var(--yablack) solid !important;
}
table tbody tr:nth-child(n + 7) {
    display: none;
}

td.status {
    line-height: 1;
    position: relative;
    padding-left: 1.6vw;
}
td.status span {
    position: absolute;
    left: 0;
    width: 1.1vw;
    height: 1.1vw;
    border-radius: 50%;
}
.waiting {background-color: var(--yalightblue);}
.working {background-color: var(--yayellow);}
.success {background-color: var(--yagreen);}
.error {background-color: var(--red);}
.canceled {background-color: var(--gray);}
</style>