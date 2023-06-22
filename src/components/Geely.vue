<template>
    
    <div class="container p-0">
        <div class="row">
            <div class="col-8"><h1 class="c-yablack text-uppercase">{{ STATE.titleH1 }}</h1></div>
            <div class="col-4">
                <img 
                    class="w-100" 
                    :src="require('../assets/images/geely.jpg')" />
            </div>
        </div>
        <div class="row py-4">
            <div class="col">
                <Timer />
            </div>
        </div>
        <div class="row py-4">
            <div 
                class="col-2 d-flex justify-content-start"
                v-if="Object.keys(STATE.managers).length"
                >
                <div 
                    class="manager"
                    >
                    <img 
                    class="w-100" 
                    :src="STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].PERSONAL_PHOTO" />
                <p class="mt-3 datetime text-uppercase">
                    {{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].LAST_NAME }} {{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].NAME }}
                </p>
                </div>
            </div>
            <div class="col">
                <table class="table table-borderless table-striped m-0">
                    <thead>
                        <tr class="text-uppercase">
                            <th style="width: 15%;">Время</th>
                            <th style="width: 35%;">Клиент</th>
                            <th style="width: 35%;">Модель и гос. номер автомобиля</th>
                            <th style="width: 15%;">Статус</th>
                        </tr>
                    </thead>
                    <tbody v-if="STATE.items">
                        <tr
                            v-for="(item, indx) in STATE.items"
                            :key="indx"
                            >
                            <td>{{ item.time.in }}</td>
                            <td>{{ item.client}}</td>
                            <td>{{ item.model }} {{ item.plate }}</td>
                            <td>{{ STATE.statuses[item.status] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row mt-5" v-if="!STATE.items.length">
            <div class="col py-5 text-center datetime">{{ STATE.empty }}</div>
        </div>
        <div class="row mt-5" v-if="STATE.items.length">
            <div class="col text-center datetime">{{ STATE.footer }}</div>
        </div>

    </div>

</template>

<script>

import manager from "../assets/images/default.jpg"
import Timer from "./parts/Timer.vue"

export default {
    name: 'All',
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
                
                STATE.managers[i].items = []
                for ( let k in STATE.items ) {
                    if ( STATE.items[k].manager == i ) STATE.managers[i].items.push(STATE.items[k])
                }
            }

            return STATE
        }
    },
    mounted: function() {

        let STATE = this.$store.state

        setInterval( function() {

            STATE.curMIndx++;
            if ( Object.keys(STATE.managers).length-1 < STATE.curMIndx ) STATE.curMIndx = 0;

        }, 5000);
    }
}
</script>

<style scoped>
@import '../assets/css/fonts/geely.css';
body, table {
    overflow: hidden;
    color: var(--yablack);
    font-size: 1.1rem;
    font-family: 'Open Sans';
    font-weight: normal;
    font-style: normal;
}
.container {
    max-width: calc(100vw - 10%);
    margin: 5% auto;
    height: calc(100vh - 10%) !important;
    overflow: hidden;
}
h1 {
    font-size: 2.8rem;
}

.datetime {
    font-size: 1.6rem;
}

table tbody tr:nth-child(n + 8) {
    display: none;
}
.table-striped tbody tr:nth-of-type(odd) {
    background-color: var(--yagray);
}
</style>