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
                v-if="safeGetActiveManager()"
                >
                <div 
                    class="manager"
                    >
                    <img 
                    class="w-100" 
                    :src="safeGetActiveManager().PERSONAL_PHOTO" />
                <p class="mt-3 datetime text-uppercase">
                    {{ safeGetActiveManager().LAST_NAME }} {{ safeGetActiveManager().NAME }}
                </p>
                </div>
            </div>
            <div class="col">
                <table class="table table-borderless table-striped m-0">
                    <thead>
                        <tr class="text-uppercase">
                            <th style="width: 15%;">Время</th>
                            <th style="width: 35%;">Модель</th>
                            <th style="width: 35%;">Гос. номер автомобиля</th>
                            <th style="width: 15%;">Статус</th>
                        </tr>
                    </thead>
                    <tbody v-if="STATE.items">
                        <tr
                            v-for="(item, indx) in STATE.items"
                            :key="indx"
                            >
                            <td>{{ item.time.in }}</td>
                            <td>{{ item.model}}</td>
                            <td>{{ item.plate }}</td>
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
            manager: manager,
            rotationInterval: null
        }
    },
    computed: {
        STATE() { 
            return this.$store.state
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