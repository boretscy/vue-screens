<template>
    <div id="app">
        <All v-if="DESIGN == 'all'" />
        <Lada v-if="DESIGN == 'lada'" />
        <VW v-if="DESIGN == 'vw'" />
        <Skoda v-if="DESIGN == 'skoda'" />
        <JLR v-if="DESIGN == 'jlr'" />
        <Kia v-if="DESIGN == 'kia'" />
        <Peugeot v-if="DESIGN == 'peugeot'" />
        <Geely v-if="DESIGN == 'geely'" />
        <Tank v-if="DESIGN == 'tank'" />

        <Slider v-if="SLIDER" />
    </div>
</template>

<script>
import Axios from 'axios'

import Slider from './components/Slider.vue'

import All from './components/All.vue'
import Lada from './components/Lada.vue'
import VW from './components/VW.vue'
import Skoda from './components/Skoda.vue'
import JLR from './components/JLR.vue'
import Kia from './components/Kia.vue'
import Peugeot from './components/Peugeot.vue'
import Geely from './components/Geely.vue'
import Tank from './components/Tank.vue'

export default {
    name: 'App',
    components: {
        Slider,
        All,
        Lada,
        VW,
        Skoda,
        JLR,
        Kia,
        Peugeot,
        Geely,
        Tank
    },
    computed: {
        DESIGN() { return this.$store.state.design },
        SLIDER() { return ( this.$store.state.ADV ) ? true : false }
    },
    mounted: function() {

        let STATE = this.$store.state

        if ( STATE.timeout ) {
            setInterval( function() {

                Axios
                    .post(
                        'https://portal.yug-avto.ru/service/screens/api/get/', 
                        STATE._GET, 
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': 'application/json'
                            }
                        }
                    )
                    .then( function(response) { 

                        if (response.data.status == 'success') {
                            STATE.managers = response.data.managers;
                            STATE.items = response.data.items;
                        }
                    });

            }, STATE.timeout*1000);
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
@import './assets/css/app.css';
</style>
