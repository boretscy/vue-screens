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
            v-if="activeManager"
            >
            <div class="col-3 pr-5">
                <img 
                    class="w-100" 
                    :src="activeManager.PERSONAL_PHOTO" />
                <p class="mt-3 datetime text-uppercase">
                    {{ activeManager.LAST_NAME }} {{ activeManager.NAME }}
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
                            v-for="item in activeManagerItems"
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
            manager: manager,
            rotationInterval: null
        }
    },
    computed: {
        STATE() { 
            return this.$store.state
        },
        activeManager() {
            return this.safeGetActiveManager();
        },
        activeManagerItems() {
            const manager = this.safeGetActiveManager();
            if (!manager) return [];
            
            const managers = this.$store.state.managers || {};
            const keys = Object.keys(managers);
            const index = this.$store.state.curMIndx || 0;
            if (keys.length === 0) return [];
            const safeIndex = index % keys.length;
            const managerId = keys[safeIndex];
            
            return (this.$store.state.items || []).filter(item => item.manager == managerId);
        }
    },
    mounted: function() {
        this.rotationInterval = setInterval( () => {
            this.$store.commit('INCREMENT_CUR_M_INDX');
        }, 5000);
    },
    beforeDestroy() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }
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