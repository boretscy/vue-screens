<template>
    
    <div class="container-haval bg-yablack c-yawhite">
        <div class="container-fluid p-0">
            <div class="top-line d-flex justify-content-between align-items-center">
                <div class="big-line position-relative bg-yawhite me-2 d-flex align-items-center">
                    <div class="black bg-yablack position-absolute"></div>
                    <div class="green bg-yagreen position-absolute"></div>
                    <span class="f-haval-400 ml-5 c-yablack">Инновации для каждого</span>
                </div>
                <img class="ms-2" :src="require('../assets/images/haval.svg')" />
            </div>
            <div class="row mb-5">
                <div class="col-7 d-flex justify-content-between">
                    <div class="greetings f-haval-500 mr-4">
                        <div v-html="STATE.titleH1"></div>
                        <div v-html="STATE.footer"></div>
                        <Timer />
                    </div>
                    <div class="dc">
                        <div class="title f-haval-400 mb-3">ХАВЕЙЛ<br />{{ companyName }}</div>
                        <div class="address" v-if="STATE.company">{{ STATE.company.PROPERTY_LEGAL_ADDR_LOCALITY_VALUE }} {{ STATE.company.PROPERTY_LEGAL_ADDR_STREET_VALUE }} {{ STATE.company.PROPERTY_LEGAL_ADDR_BUILDING_VALUE }}</div>
                    </div>
                </div>
                <div class="col-5 d-flex justify-content-end">
                    <div 
                        class="manager"
                        v-for="manager in viewManagers"
                        :key="manager.ID"
                        >
                        <div class="img w-100" :style="{'background-image': 'url('+manager.PERSONAL_PHOTO+')'}"></div>
                        <p class="m-0 mt-2">{{ manager.LAST_NAME }} {{ manager.NAME }}</p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <table class="table c-yawhite m-0">
                        <thead class="bb-yawhite">
                            <tr class="f-haval-400">
                                <th style="width: 12%;">Время записи</th>
                                <th style="width: 12%;">Время выдачи</th>
                                <th style="width: 17%;">Гос. номер автомобиля</th>
                                <th style="width: 22%;">Модель автомобиля</th>
                                <th style="width: 23%;">Мастер-<br />консультант</th>
                                <th style="width: 14%;">Статус готовности</th>
                            </tr>
                        </thead>
                        <tbody v-if="STATE.items">
                            <tr
                                v-for="(item, indx) in STATE.items"
                                :key="indx"
                                >
                                <td class="">{{ item.time.in }}</td>
                                <td class="">{{ item.time.out }}</td>
                                <td class="">{{ item.plate }}</td>
                                <td>{{ item.model }}</td>
                                <td>{{ safeGetManager(item.manager).LAST_NAME }} {{ safeGetManager(item.manager).NAME }}</td>
                                <td :class="item.status">
                                    <div class="d-flex justify-content-start align-items-center">
                                        <div class="status-mark mr-3"></div>
                                        <div class="status-text">{{ statuses[item.status] }}</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row my-5" v-if="!STATE.items.length">
                <div class="col py-5 text-center">{{ STATE.empty }}</div>
            </div>

        </div>

    </div>

</template>

<script>

import manager from "../assets/images/default.jpg"
import Timer from "./parts/Timer.haval.vue"

export default {
    name: 'VW',
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
        statuses() {
            return {
                ...this.$store.state.statuses,
                canceled: 'отменен',
                error: 'ошибка',
                success: 'выполнен',
                waiting: 'ждем авто',
                working: 'в работе'
            };
        },
        companyName() {
            return this.$store.state.company && this.$store.state.company.NAME 
                ? this.$store.state.company.NAME 
                : 'Юг-Авто Центр Новороссийск';
        },
        viewManagers() {
            const managers = this.$store.state.managers || {};
            const keys = Object.keys(managers);
            const index = this.$store.state.curMIndx || 0;
            const sliceKeys = keys.slice(index, index + 4);
            const result = [];
            sliceKeys.forEach(key => {
                result.push(this.safeGetManager(key));
            });
            return result;
        }
    },
    mounted: function() {
        this.rotationInterval = setInterval( () => {
            this.$store.commit('INCREMENT_CUR_M_INDX', 4);
        }, 5000);
    },
    beforeDestroy() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
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
@import '../assets/css/fonts/haval.css';

.container-haval {
    --yawhite: #fff;
    --yablack: #000;
    --yagreen: #0DBDB4;
    --yastatusgreen: #44B8B6;
    --yastatusyellow: #F0A21E;
    --yastatuswhite: #fff;
    --yastatusred: #f04124;

    height: 100vh !important;
    overflow: hidden;

    font-family: "TT Wellingtons", Arial, sans-serif; font-weight: normal; font-style: normal;
    font-weight: 500;
    font-style: normal;

    padding: 38px;
}
/* color */
.c-yawhite {color: var(--yawhite) !important;transition: .2s;}
.c-yablack {color: var(--yablack) !important;transition: .2s;}
.c-yagreen {color: var(--yagreen) !important;transition: .2s;}
.c-yastatusgreen {color: var(--yastatusgreen) !important;transition: .2s;}
.c-yastatusyellow {color: var(--yastatusyellow) !important;transition: .2s;}
.c-yastatuswhite {color: var(--yastatuswhite) !important;transition: .2s;}
.c-yastatusred {color: var(--yastatusred) !important;transition: .2s;}

/* background-color */
.bg-yawhite {background-color: var(--yawhite);transition: .2s;}
.bg-yablack {background-color: var(--yablack);transition: .2s;}
.bg-yagreen {background-color: var(--yagreen);transition: .2s;}
.bg-yastatusgreen {background-color: var(--yastatusgreen);transition: .2s;}
.bg-yastatusyellow {background-color: var(--yastatusyellow);transition: .2s;}
.bg-yastatuswhite {background-color: var(--yastatuswhite);transition: .2s;}
.bg-yastatusred {background-color: var(--yastatusred);transition: .2s;}

/* border */
.b-yawhite {border: var(--yawhite) 1px solid;transition: .2s;}
.b-yablack {border: var(--yablack) 1px solid;transition: .2s;}
.b-yagreen {border: var(--yagreen) 1px solid;transition: .2s;}
.b-yastatusgreen {border: var(--yastatusgreen) 1px solid;transition: .2s;}
.b-yastatusyellow {border: var(--yastatusyellow) 1px solid;transition: .2s;}
.b-yastatuswhite {border: var(--yastatuswhite) 1px solid;transition: .2s;}

/* border-top */
.b-t-yawhite {border-top: var(--yawhite) 1px solid;transition: .2s;}
.b-t-yablack {border-top: var(--yablack) 1px solid;transition: .2s;}
.b-t-yagreen {border-top: var(--yagreen) 1px solid;transition: .2s;}
.b-t-yastatusgreen {border-top: var(--yastatusgreen) 1px solid;transition: .2s;}
.b-t-yastatusyellow {border-top: var(--yastatusyellow) 1px solid;transition: .2s;}
.b-t-yastatuswhite {border-top: var(--yastatuswhite) 1px solid;transition: .2s;}

/* border-bottom */
.b-b-yawhite {border-bottom: var(--yawhite) 1px solid;transition: .2s;}
.b-b-yablack {border-bottom: var(--yablack) 1px solid;transition: .2s;}
.b-b-yagreen {border-bottom: var(--yagreen) 1px solid;transition: .2s;}
.b-b-yastatusgreen {border-bottom: var(--yastatusgreen) 1px solid;transition: .2s;}
.b-b-yastatusyellow {border-bottom: var(--yastatusyellow) 1px solid;transition: .2s;}
.b-b-yastatuswhite {border-bottom: var(--yastatuswhite) 1px solid;transition: .2s;}

/* font */
.f-haval-400 {
    font-family: 'Haval';
    font-weight: normal;
    font-style: normal;
}
.f-haval-500 {
    font-family: 'Haval';
    font-weight: 500;
    font-style: normal;
}

.top-line {height: 26px; margin-bottom: 52px; font-size: 12px;}
.top-line .big-line {height: 26px; width: calc(100% - 215px);}
.top-line .big-line .black {width: 16.5px; height: 26px; left: 0; top: 0;}
.top-line .big-line .green {
	width: 20px;
	height: 26px;
	transform: skew(-27deg);
    left: 7px;
    top: 0;
}

.greetings {font-size: 38px; width: 676px; line-height: 1.1;}
.dc {margin-left: 54px;}
.dc .title {font-size: 32px; line-height: 1.1;}
.dc .address {font-size: 24px; line-height: 1.1;}

.manager {
    width: 138px;
    font-size: 20px;
    margin: 0 0 0 54px;
}
.manager .img {
    height: 172px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
}
.fw-bold {font-weight: 700;}

.table {font-size: 30px; border: none !important;}
thead { font-size: 28px; border-top: none !important;}
.table thead th {
    vertical-align: bottom;
    border-bottom:none !important;
    border-top:none !important;
}


table tbody tr:nth-child(n + 8) {
    display: none;
}

.status-mark {width: 29px; height: 47px;}

.waiting .status-mark {background-color: var(--yastatuswhite);}
.waiting .status-text {color: var(--yastatuswhite);}

.working .status-mark {background-color: var(--yastatusyellow);}
.working .status-text {color: var(--yastatusyellow);}

.success .status-mark {background-color: var(--yastatusgreen);}
.success .status-text {color: var(--yastatusgreen);}

.error .status-mark {background-color: var(--yastatusred);}
.error .status-text {color: var(--yastatusred);}

.canceled .status-mark {background-color: var(--yastatusred);}
.canceled .status-text {color: var(--yastatusred);}

</style>