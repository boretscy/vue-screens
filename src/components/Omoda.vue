<template>

    <div class="container-omoda bg-yabggray">
        <div class="container-fluid p-0">
            <div class="row top-line bg-yadarkgray"></div>
            <div class="row px-5 mx-5 mb-5">
                <div class="col-7 d-flex justify-content-end">
                    <div 
                        class="col-3 manager"
                        v-for="manager in STATE.managers"
                        :key="manager.ID"
                        >
                        <img 
                            class="w-100" 
                            :src="manager.PERSONAL_PHOTO" />
                        <p class="font-weight-bold m-0 mt-2">{{ manager.LAST_NAME }} {{ manager.NAME }}</p>
                    </div>
                </div>
                <div class="col-5">
                    <div class="d-flex justify-content-center mb-5">
                        <img class="" :src="require('../assets/images/omoda.svg')" />
                        <div class="mx-4 bg-yared w-4px h-100"></div>
                        <img class="" :src="require('../assets/images/jaecoo.svg')" />
                    </div>
                    <div class="pt-3 text-center datetime"><Timer /></div>
                </div>
            </div>
            <div class="row px-5 mx-5 mb-5">
                <div class="col">
                    <table class="table table-striped text-center m-0">
                        <thead>
                            <tr class="bg-yadarkgray c-yawhite fw-bold">
                                <th style="width: 12%;">Время записи</th>
                                <th style="width: 12%;">Время выдачи</th>
                                <th style="width: 19%;">Гос.номер a/м</th>
                                <th style="width: 20%;">Модель a/м</th>
                                <th style="width: 23%;">Мастер-консультант</th>
                                <th style="width: 14%;">Статус</th>
                            </tr>
                        </thead>
                        <tbody v-if="STATE.items">
                            <tr
                                v-for="(item, indx) in STATE.items"
                                :key="indx"
                                >
                                <td class="fw-bold">{{ item.time.in }}</td>
                                <td class="fw-bold">{{ item.time.out }}</td>
                                <td class="fw-bold">{{ item.plate }}</td>
                                <td>{{ item.model }}</td>
                                <td>{{ STATE.managers[item.manager].LAST_NAME }} {{ STATE.managers[item.manager].NAME }}</td>
                                <td class="fw-bold" :class="item.status">
                                    {{ STATE.statuses[item.status] }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row my-5" v-if="!STATE.items.length">
                <div class="col py-5 text-center footer fw-bold">{{ STATE.empty }}</div>
            </div>
            <div class="row" v-if="STATE.items.length">
                <div class="col text-center footer text-uppercase fw-bold">{{ STATE.footer }}</div>
            </div>

        </div>
    </div>

</template>

<script>

import manager from "../assets/images/default.jpg"
import Timer from "./parts/Timer.omoda.vue"

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
@import '../assets/css/fonts/omoda.css';

.container-omoda {
	--yablack: #30363A;
    --yawhite: #ffffff;
    
    --yadarkgray: #454F51;
    --yabggray: #DBDBDB;
    --yagray: #D1D3D4;
    --yalightgray: #E8EAEB;
    --yagreen: #75D45D;
    --yablue: #0E86BA;
    --yared: #DA2445;

    height: 100vh !important;
    overflow: hidden;

    font-family: "Dopis", Arial, sans-serif; font-weight: normal; font-style: normal;
    font-weight: normal;
    font-style: normal;
}
.container-omoda {height: 100vh !important;}
/* color */
.c-yawhite {color: var(--yawhite) !important;transition: 0;}
.c-yablack {color: var(--yablack) !important;transition: 0;}
.c-yadarkgray {color: var(--yadarkgray) !important;transition: 0;}
.c-yabggray {color: var(--yabggray) !important;transition: 0;}
.c-yagray {color: var(--yagray) !important;transition: 0;}
.c-yalightgray {color: var(--yalightgray) !important;transition: 0;}
.c-yagreen {color: var(--yagreen) !important;transition: 0;}
.c-yablue {color: var(--yablue) !important;transition: 0;}
.c-yared {color: var(--yared) !important;transition: 0;}

/* background-color */
.bg-yawhite {background-color: var(--yawhite);transition: 0;}
.bg-yablack {background-color: var(--yablack);transition: 0;}
.bg-yadarkgray {background-color: var(--yadarkgray);transition: 0;}
.bg-yabggray {background-color: var(--yabggray);transition: 0;}
.bg-yagray {background-color: var(--yagray);transition: 0;}
.bg-yalightgray {background-color: var(--yalightgray);transition: 0;}
.bg-yagreen {background-color: var(--yagreen);transition: 0;}
.bg-yablue {background-color: var(--yablue);transition: 0;}
.bg-yared {background-color: var(--yared);transition: 0;}


.top-line {height: 150px; margin-bottom: -75px;}
.w-4px {width: 4px; height: 30px !important;}

.datetime {
    font-weight: 700;
    font-size: 72px;
    line-height: 1;
}
.manager {font-size: 20px;}
.fw-bold {font-weight: 700;}

table {
    border: var(--yawhite) 1px solid;
    font-size: 22px;
}
thead, tbody, tr, th, td {
    border: var(--yawhite) 1px solid;
}
table thead {font-size: 24px;}
.table-striped tbody tr:nth-of-type(odd) {background-color: var(--yagray);}
.table-striped tbody tr:nth-of-type(even) {background-color: var(--yalightgray);}


table tbody tr:nth-child(n + 8) {
    display: none;
}
.footer {font-size: 48px;}

.waiting {background-color: var(--yared); color: var(--yawhite);}
.working {background-color: var(--yablue); color: var(--yawhite);}
.success {background-color: var(--yagreen); color: var(--yawhite);}
.error {background-color: var(--red); color: var(--yawhite);}
.canceled {background-color: var(--gray);}
</style>