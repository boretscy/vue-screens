<template>
    
    <div class="container-fluid p-0">
        <div class="row px-3 pt-3">
            <div class="col-6">
                <div class="row">
                    <div class="col-3 pt-3">
                        <img 
                            class="w-100" 
                            :src="require('../assets/images/kia.jpg')" />
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
                <table class="table table-bordered m-0">
                    <thead>
                        <tr class="c-yadarkblue">
                            <th style="width: 10%;" class="text-center">Время</th>
                            <th style="width: 28%;">Клиент</th>
                            <th style="width: 27%;">Модель и гос. номер автомобиля</th>
                            <th style="width: 20%;">Мастер-консультант</th>
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
    name: 'Kia',
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
    mounted: function() {

        
    }
}
</script>

<style scoped>
@import '../assets/css/fonts/kia.css';

.container-fluid {
	--yadarkblue: #05141f;
	--yablackblue: #00214c;

    height: 100vh !important;
    overflow: hidden;
    color: var(--yablack);
    font-size: 1.8rem;
    font-family: "KIA", Arial, sans-serif; font-weight: 400; font-style: normal;
    border: var(--yadarkblue) 5px solid;
}
table {
    overflow: hidden;
    color: var(--yablack);
    font-size: 1.8rem;
    font-family: "KIA", Arial, sans-serif; font-weight: 400; font-style: normal;
}
h1 {
    font-size: 2.8rem;
    font-family: "KIA", Arial, sans-serif; font-weight: 700; font-style: normal;
}
h2 {
    font-family: "KIA", Arial, sans-serif; font-weight: 700; font-style: normal;
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
.table-bordered th, .table-bordered td {
    border: 2px solid var(--yadarkblue);
}
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid var(--yadarkblue);
    font-family: "KIA", Arial, sans-serif; font-weight: 700; font-style: normal;
}

</style>