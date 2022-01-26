<template>

    <div class="container p-0">
        <div class="row">
            <div class="col-9">
                <h1 class="pb-0 mb-3">{{ STATE.titleH1 }}</h1>
                <h2 class="pb-0 mb-5">{{ STATE.titleH2 }}</h2>
                <Timer />
            </div>
            <div class="col-1">
                <img  
                    class="w-100"
                    :src="require('../assets/images/peugeot.jpg')" />
            </div>
            <div class="col-1">
                <img  
                    class="w-100"
                    :src="require('../assets/images/citroen.jpg')" />
            </div>
            <div class="col-1">
                <img  
                    class="w-100"
                    :src="require('../assets/images/opel.jpg')" />
            </div>
        </div>

        <div 
            class="row"
            v-if="Object.keys(STATE.managers).length"
            >
            <div class="col-3 pr-5">
                <img 
                    class="w-100" 
                    :src="STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].PERSONAL_PHOTO" />
                <p class="mt-3 datetime text-uppercase">
                    {{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].LAST_NAME }} {{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].NAME }}
                </p>
            </div>
            <div class="col-9">
                <table class="table table-borderless table-striped m-0">
                    <thead>
                        <tr>
                            <th class="py-4" style="width: 15%;">Время</th>
                            <th class="py-4" style="width: 35%;">Клиент</th>
                            <th class="py-4" style="width: 30%;">Модель и гос. номер автомобиля</th>
                            <th class="py-4" style="width: 20%;">Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].items"
                            :key="item.ID"
                            >
                            <td class="py-4">{{ item.time.in }}</td>
                            <td class="py-4">{{ item.client}}</td>
                            <td class="py-4">{{ item.model }} {{ item.plate }}</td>
                            <td class="py-4">{{ STATE.statuses[item.status] }}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-if="Object.keys(STATE.managers).length && !STATE.items.length" class="pl-5">{{ STATE.empty }}</p>
                <p class="mt-3 text-right footer">{{ STATE.footer }}</p>
            </div>
        </div>
        <div class="row p-5 text-center" v-if="!Object.keys(STATE.managers).length">{{ STATE.empty }}</div>

    </div>


</template>

<script>

import manager from "../assets/images/default.jpg"
import Timer from "./parts/Timer.peugeot.vue"

export default {
    name: 'Peugeot',
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
@import '../assets/css/fonts/peugeot.css';

.container {
    max-width: calc(100vw - 10%);
    margin: 5% auto;
    height: calc(100vh - 10%) !important;
    overflow: hidden;
    color: var(--yablack);
    font-size: 1.1rem;
    font-family: 'Peugeot New Cyrillic Beta1';
    font-weight: 300;
    font-style: normal;
}
table {
    overflow: hidden;
    color: var(--yablack);
    font-size: 1.1rem;
    font-family: 'Peugeot New Cyrillic Beta1';
    font-weight: 300;
    font-style: normal;
}
h1 {
    font-size: 3.8rem;
    font-weight: 500;
}
h2 {
    font-size: 2.8rem;
}

.datetime {
    font-size: 1.8rem;
}
table thead tr  tr{
    font-weight: 500;
}
table tbody tr:nth-child(n + 8) {
    display: none;
}
.table-striped tbody tr:nth-of-type(odd) {
    background-color: var(--yagray);
}

</style>