<template>
    
    <div class="container-fluid p-0">
        <div class="row bg-yagray c-yawhite px-5 py-3">
            <div class="col">
                <div class="text-uppercase c-yaorange h1 mt-3">{{ STATE.titleH1 }}</div>
                <div class="clock">
                    <Timer />
                </div>
            </div>
            <div class="col-1 px-5 py-3 logo">
                <img  
                    :src="require('../assets/images/tank.png')" class="w-100" />
            </div>
        </div>

        <div 
            class="row p-5"
            v-if="Object.keys(STATE.managers).length"
            >
            <div class="col-3">
                <img 
                        class="w-100" 
                        :src="STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].PERSONAL_PHOTO" />
                <p class="mt-5">
                    <strong>{{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].LAST_NAME }} {{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].NAME }}</strong>
                    <br />
                    Мастер-консультант
                </p>
            </div>
            
            <div class="col-9">
                <table class="table table-striped  m-0" v-if="STATE.items">
                    <thead>
                        <tr class="fon-weight-bold">
                            <th style="width: 25%;" class="pl-5">Время<br />приемки</th>
                            <th style="width: 45%;">Клиент</th>
                            <th style="width: 30%;">Гос. номер<br />Модель а/м</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].items"
                            :key="item.ID">
                            <td class="pl-5">{{ item.time.in }}</td>
                            <td>{{ item.client}}</td>
                            <td>{{ item.plate }} {{ item.model }}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-if="Object.keys(STATE.managers).length && !STATE.items.length" class="pl-5">{{ STATE.empty }}</p>
                <p class="pl-5 mt-3">{{ STATE.footer }}</p>
            </div>

        </div>
        <div class="row p-5 text-center" v-if="!Object.keys(STATE.managers).length">{{ STATE.empty }}</div>

    </div>

</template>

<script>

import manager from "../assets/images/default.jpg"
import Timer from "./parts/Timer.tank.vue"

export default {
    name: 'Lada',
    components: {
        Timer
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
    --yadarkgray: #080808;

    font-family: "TT TANK", Arial, sans-serif; font-weight: normal; font-style: normal;
    color: var(--yablack);

    height: 100vh !important;
    font-size: 1.6rem;
    overflow: hidden;
}
.c-yaorange {color: var(--yaorange)}
table {
    overflow: hidden;
    font-size: 1.6rem;
}
.h1 {
    font-size: 3rem;
    font-weight: 500;
}

.datetime {
    font-size: 1.2rem;
}


.logo img {
    width: 320px;
}
.clock {
    color: var(--white);
    font-size: 2rem;
    font-weight: normal;
    line-height: 1;
}


table tbody tr:nth-child(n + 8) {
    display: none;
}
.table-striped tbody tr:nth-of-type(odd) {
    background-color: var(--yawhite);
}
.table-striped tbody tr:nth-of-type(even) {
    background-color: var(--yalightgray);
}
table thead {
    background-color: var(--yalightgray);
}
.table thead th {
    vertical-align: top;
    border-bottom: none;
}
</style>