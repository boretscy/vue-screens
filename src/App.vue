<template>
    <div id="app">
        <All v-if="DESIGN == 'all'" />



        <Slider v-if="SLIDER" />
    </div>
</template>

<script>
import Axios from 'axios'

import Slider from './components/Slider.vue'

import All from './components/All.vue'

export default {
    name: 'App',
    components: {
        Slider,

        All
    },
    computed: {
        DESIGN() { return this.$store.state.design },
        SLIDER() { return ( this.$store.state.ADV ) ? true : false }
    },
    mounted: function() {

        let STATE = this.$store.state
        console.log( STATE )

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
