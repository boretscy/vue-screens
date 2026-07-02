<template>
    
    <div class="container-tenet bg-yabeige c-yadark">
        <div class="container p-0">
            <div class="row mb-5">
                <div class="col-12 text-right">
                    <img class="logo" src="./../assets/images/yug-avto-letters.svg" />
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-7">
                    <h1 class="text-uppercase fw-bold lineheight-1 pm-0 mb-0">{{ STATE.titleH1 }}</h1>
                </div>
                <div class="col pt-4">
                    <div 
                        class="row h-100"
                        v-if="Object.keys(STATE.managers).length"
                        >
                        <div class="col-12 d-flex justify-content-start align-content-center">
                            <img 
                                    class="manager-img mr-4 b-radius-yaradius" 
                                    :src="STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].PERSONAL_PHOTO" />
                            <div class="d-flex flex-column justify-content-center align-content-start">
                                <div class="manager-name fw-bold">{{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].LAST_NAME }} {{ STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].NAME }}</div>
                                <div class="manager-pos">Мастер-консультант</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table class="table table-borderless m-0 fw-bold text-center text-uppercase" v-if="STATE.items">
                        <thead class="bg-yadark c-yawhite">
                            <tr>
                                <th style="width: 15%;" class="pl-5">Время</th>
                                <th style="width: 45%;">Клиент</th>
                                <th style="width: 15%;">Гос. номер</th>
                                <th style="width: 25%;">Автомобиль</th>
                            </tr>
                        </thead>
                        <tbody class="bg-yalight">
                            <tr 
                                class="b-b-yadark"
                                v-for="item in STATE.managers[Object.keys(STATE.managers)[STATE.curMIndx]].items"
                                :key="item.ID">
                                <td >{{ item.time.in }}</td>
                                <td>{{ item.client}}</td>
                                <td>{{ item.plate }}</td>
                                <td>{{ item.model }}</td>
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

export default {
    name: 'Tenet',
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
@import '../assets/css/fonts/tenet.css';

.container-tenet {
    --yawhite: #fff;
    --yabeige: #CDBAAC;
    --yadark: #3D3736;
    --yalight: #dbd2ca;
    --yaradius: 20px;

    height: 100vh !important;
    overflow: hidden;

    font-family: "TENET Sans", Arial, sans-serif; font-weight: normal; font-style: normal;
    font-weight: 500;
    font-style: normal;
}

.container {
    max-width: calc(100vw - 10%);
    margin: 5% auto;
    height: calc(100vh - 10%) !important;
    overflow: hidden;
}
/* color */
.c-yawhite {color: var(--yawhite) !important;transition: .2s;}
.c-yabeige {color: var(--yabeige) !important;transition: .2s;}
.c-yadark {color: var(--yadark) !important;transition: .2s;}
.c-yalight {color: var(--yalight) !important;transition: .2s;}

/* background-color */
.bg-yawhite {background-color: var(--yawhite);transition: .2s;}
.bg-yabeige {background-color: var(--yabeige);transition: .2s;}
.bg-yadark {background-color: var(--yadark);transition: .2s;}
.bg-yalight {background-color: var(--yalight);transition: .2s;}

/* border */
.b-yawhite {border: var(--yawhite) 1px solid;transition: .2s;}
.b-yabeige {border: var(--yabeige) 1px solid;transition: .2s;}
.b-yadark {border: var(--yadark) 1px solid;transition: .2s;}
.b-yalight {border: var(--yalight) 1px solid;transition: .2s;}

/* border-top */
.b-t-yawhite {border-top: var(--yawhite) 1px solid;transition: .2s;}
.b-t-yabeige {border-top: var(--yabeige) 1px solid;transition: .2s;}
.b-t-yadark {border-top: var(--yadark) 1px solid;transition: .2s;}
.b-t-yalight {border-top: var(--yalight) 1px solid;transition: .2s;}

/* border-right */
.b-r-yawhite {border-right: var(--yawhite) 1px solid;transition: .2s;}
.b-r-yabeige {border-right: var(--yabeige) 1px solid;transition: .2s;}
.b-r-yadark {border-right: var(--yadark) 1px solid;transition: .2s;}
.b-r-yalight {border-right: var(--yalight) 1px solid;transition: .2s;}

/* border-bottom */
.b-b-yawhite {border-bottom: var(--yawhite) 1px solid;transition: .2s;}
.b-b-yabeige {border-bottom: var(--yabeige) 1px solid;transition: .2s;}
.b-b-yadark {border-bottom: var(--yadark) 1px solid;transition: .2s;}
.b-b-yalight {border-bottom: var(--yalight) 1px solid;transition: .2s;}

/* border-left */
.b-l-yawhite {border-left: var(--yawhite) 1px solid;transition: .2s;}
.b-l-yabeige {border-left: var(--yabeige) 1px solid;transition: .2s;}
.b-l-yadark {border-left: var(--yadark) 1px solid;transition: .2s;}
.b-l-yalight {border-left: var(--yalight) 1px solid;transition: .2s;}

/* border-radius */
.b-radius-yaradius {border-radius: var(--yaradius);}

.lineheight-1 {line-height: 1;}

h1 {font-size: 140px;}
.logo {width: 350px; height: auto;}

.manager-img {width: 200px; height: 200px;}
.manager-name {font-size: 60px;}
.manager-pos {font-size: 35px;}

.fw-bold {font-weight: 700;}

table {font-size: 25px;}
table thead {
    border-radius: var(--yaradius) var(--yaradius) 0 0;
    overflow: hidden;
}


table tbody tr:nth-child(n + 8) {
    display: none;
}

</style>