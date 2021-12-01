<template>
    
    <div class="container p-0">
        <div class="row">
            <div class="col-6">
                <div class="row">
                    <div class="col-3 pt-3">
                        <img 
                            class="w-100" 
                            :src="require('../assets/images/all.jpg')" />
                    </div>
                    <div class="col-9 pl-5">
                        <h1 class="c-yadarkblue pt-3 pb-0 mb-0"><strong>{{ STATE.titleH1 }}</strong></h1>
                        <h2 class="c-yadarkblue">{{ STATE.titleH2 }}</h2>
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
                    <p class="m-0 mt-2">{{ manager.LAST_NAME }} {{ manager.NAME }}</p>
                </div>
            </div>
        </div>
        <div class="row py-4">
            <div class="col">
                <table class="table table-borderless table-striped m-0">
                    <thead>
                        <tr class="c-yadarkblue">
                            <th style="width: 14%;" class="text-center">Время</th>
                            <th style="width: 24%;">Клиент</th>
                            <th style="width: 24%;">Модель и гос. номер автомобиля</th>
                            <th style="width: 23%;">Мастер-консультант</th>
                            <th style="width: 15%;">Статус</th>
                        </tr>
                    </thead>
                    <tbody v-if="STATE.items">
                        <tr
                            v-for="(item, indx) in STATE.items"
                            :key="indx"
                            >
                            <td class="text-center">{{ item.time.in }}</td>
                            <td>{{ item.client}}</td>
                            <td>{{ item.model }} {{ item.plate }}</td>
                            <td>{{ STATE.managers[item.manager].LAST_NAME }} {{ STATE.managers[item.manager].NAME }}</td>
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
            <div class="col c-yadarkblue text-center datetime">{{ STATE.footer }}</div>
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
                if ( !STATE.managers[i].PERSONAL_PHOTO ) STATE.managers[i].PERSONAL_PHOTO = manager
            }

            return STATE
        }
    },
    mounted: function() {

        
    }
}
</script>

<style scoped>
body, table {
    overflow: hidden;
    color: var(--yablack);
    font-size: 1.1rem;
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
    font-size: 1.2rem;
}

table tbody tr:nth-child(n + 8) {
    display: none;
}
.table-striped tbody tr:nth-of-type(odd) {
    background-color: var(--yagray);
}
</style>