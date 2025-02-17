<template>
    
    <div class="container-fluid p-0">
        <div class="row bg-yagray c-yawhite px-5 py-3">
            <div class="col-1 px-5 py-3 logo">
                <img  
                    :src="require('../assets/images/tank.png')" class="w-100" />
            </div>
            <div class="col-6 d-flex justify-content-center align-items-center b-r-yawhite"><div class="text-uppercase c-yawhite h1 mt-3">{{ STATE.titleH1 }}</div></div>
            <div class="col px-5 d-flex justify-content-start align-items-center">
                <div class="date">
                    <Date />
                </div>
            </div>
            <div class="col">
                <div class="clock">
                    <Timer />
                </div>
            </div>
        </div>

        <div 
            class="row p-5"
            v-if="Object.keys(STATE.managers).length"
            >
            <div class="col-2">
                <img 
                        class="w-100" 
                        :src="STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].PERSONAL_PHOTO" />
                <p class="mt-5 font-weight-light manager">
                    Мастер-консультант <br /> <br />
                    <strong>{{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].LAST_NAME }} {{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].NAME }}</strong>
                </p>
            </div>
            
            <div class="col-10 pl-5">
                <table class="table m-0" v-if="STATE.items">
                    <thead>
                        <tr class="font-weight-bold">
                            <th style="width: 25%;" class="pl-5">Модель</th>
                            <th style="width: 25%;">Гос. номер</th>
                            <th style="width: 25%;">Статус</th>
                            <th style="width: 25%;">Время<br />записи</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].items"
                            :key="item.ID"
                            class="font-weight-light">
                            <td class="pl-5">{{ item.model }}</td>
                            <td class="font-weight-bold">{{ item.plate }}</td>
                            <td>{{ STATE.statuses[item.status] }}</td>
                            <td>{{ item.time.in }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <div class="row p-5 text-center" v-if="!Object.keys(STATE.managers).length">{{ STATE.empty }}</div>

    </div>

</template>

<script>

import manager from "../assets/images/default.jpg"
import Timer from "./parts/Timer.tank.vue"
import Date from "./parts/Date.tank.vue"

export default {
    name: 'Lada',
    components: {
        Timer,
        Date
    },
    data: function () {
        return {
            manager: manager,
        }
    },
    computed: {

        STATE() { 
            
            let STATE = this.$store.state

            for ( let i in STATE.managers ) {
                
                if ( STATE.managers[i].PERSONAL_PHOTO && STATE.managers[i].PERSONAL_PHOTO.indexOf('portal.yug-avto.ru') == -1 ) STATE.managers[i].PERSONAL_PHOTO = 'https://portal.yug-avto.ru'+STATE.managers[i].PERSONAL_PHOTO
                if ( !STATE.managers[i].PERSONAL_PHOTO )  STATE.managers[i].PERSONAL_PHOTO = manager
                
                STATE.managers[i].items = []
                for ( let k in STATE.items ) {
                    if ( STATE.items[k].manager == i ) STATE.managers[i].items.push(STATE.items[k])
                }
            }

            return STATE
        },
    },
    mounted: function() {

        let STATE = this.$store.state
        console.log(STATE)

        setInterval( function() {

            STATE.curMIndx++;
            if ( Object.keys(STATE.managers).length-1 < STATE.curMIndx ) STATE.curMIndx = 0;

        }, 5000);
    }
}
</script>

<style scoped>
@import '../assets/css/fonts/tank.css';

.container-fluid {
	--yadarkblue: #bb162a;
    --yablackblue: #00214c;
    
    --yaorange: #FF9549;
    --yadarkorange: #e68526;
    --yalightgray: #dadedf;
    --yagray: #252C2C;
    --yadarkgray: #272E2B;

    font-family: "TT TANK", Arial, sans-serif; font-weight: normal; font-style: normal;
    color: var(--yadarkgray);

    height: 100vh !important;
    font-size: 1.6rem;
    overflow: hidden;
}
.c-yaorange {color: var(--yaorange)}
.b-r-yawhite {border-right: var(--yawhite) 1px solid;}
table {
    overflow: hidden;
    font-size: 41px;
}
.h1 {
    font-size: 62px;
    font-weight: 700;
}

.datetime {
    font-size: 1.2rem;
}


.logo img {
    width: 320px;
}
.clock {
    color: var(--yadarkorange);
    font-size: 114px;
    font-weight: normal;
    line-height: 1;
}
.line {width: 1px;}
.manager {font-size: 25px;}
.manager strong {font-size: 41px; line-height: 1;}

table tbody tr:nth-child(n + 8) {
    display: none;
}
.table thead th {
    vertical-align: top;
    border-bottom: none;
}
</style>