<template>
    
    <div class="container-fluid p-0">
        <div class="row bg-yagray c-yawhite px-5 py-3">
            <div class="col-3 px-5 py-3 logo">
                <img  
                    :src="require('../assets/images/lada.png')" />
            </div>
            <div class="col-6 pt-3">
                <h1 class="text-uppercase mt-3 mb-0">{{ STATE.titleH1 }}</h1>
                <h2 class="">{{ STATE.titleH2 }}</h2>
            </div>
            <div class="col-3 pl-5">
                <div class="clock bg-yadarkgray mr-2 ml-5 mt-4 p-2 pr-3">
                    <Timer />
                </div>
            </div>
        </div>

        <div 
            class="row p-5"
            v-if="activeManager"
            >
            <div class="col-3">
                <img 
                        class="w-100" 
                        :src="activeManager.PERSONAL_PHOTO" />
                <p class="mt-5">
                    <strong>{{ activeManager.LAST_NAME }} {{ activeManager.NAME }}</strong>
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
                            v-for="item in activeManagerItems"
                            :key="item.ID">
                            <td class="pl-5">{{ item.time.in }}</td>
                            <td>{{ item.client}}</td>
                            <td>{{ item.plate }} {{ item.model }}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-if="activeManager && !STATE.items.length" class="pl-5">{{ STATE.empty }}</p>
                <p class="pl-5 mt-3">{{ STATE.footer }}</p>
            </div>

        </div>
        <div class="row p-5 text-center" v-if="!Object.keys(STATE.managers).length">{{ STATE.empty }}</div>

    </div>

</template>

<script>

import manager from "../assets/images/default.jpg"
import Timer from "./parts/Timer.lada.vue"

export default {
    name: 'Lada',
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
@import '../assets/css/fonts/lada.css';

.container-fluid {
	--yadarkblue: #bb162a;
    --yablackblue: #00214c;
    
    --yaorange: #f18812;
    --yadarkorange: #e68526;
    --yalightgray: #dadedf;
    --yagray: #54606c;
    --yadarkgray: #080808;

    font-family: "Pragmatica", Arial, sans-serif; font-weight: normal; font-style: normal;
    color: var(--yablack);

    height: 100vh !important;
    font-size: 1.6rem;
    overflow: hidden;
}
table {
    overflow: hidden;
    font-size: 1.6rem;
}
h1 {
    font-size: 4.3rem;
    font-weight: 300;
}

.datetime {
    font-size: 1.2rem;
}


.logo img {
    width: 320px;
}
.clock {
    color: var(--yadarkorange);
    font-size: 6rem;
    font-weight: bold;
    line-height: 1;
    border-radius:  15px;
    display: inline-block;
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