<template>
    <div class="datetime mt-3 d-flex justify-content-start align-items-center">
        <div class="time f-haval-400 mr-4">{{ STATE.TIME.H  }}:{{ STATE.TIME.M  }}</div>
        <div class="date f-haval-500">{{ STATE.WEEKDAY }}<br />{{ STATE.DATE.D }}.{{ STATE.DATE.M }}.{{ STATE.DATE.Y }}</div>
    </div>
</template>

<script>
export default {
    name: 'Timer',
    computed: {
        STATE() { 
            
            let STATE = this.$store.state
            
            STATE.DATE = {}
            STATE.DATE.D = (STATE.currentDATE.D < 10) ? '0'+String(STATE.currentDATE.D) : String(STATE.currentDATE.D)
            STATE.DATE.M = (STATE.currentDATE.M < 10) ? '0'+String(STATE.currentDATE.M) : String(STATE.currentDATE.M)
            STATE.DATE.Y = String(STATE.currentDATE.Y)

            STATE.TIME = {}
            STATE.TIME.H = (STATE.currentTIME.H < 10) ? '0'+String(STATE.currentTIME.H) : String(STATE.currentTIME.H)
            STATE.TIME.M = (STATE.currentTIME.M < 10) ? '0'+String(STATE.currentTIME.M) : String(STATE.currentTIME.M)
            STATE.TIME.S = (STATE.currentTIME.S < 10) ? '0'+String(STATE.currentTIME.S) : String(STATE.currentTIME.S)

            let days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
            let date = new Date()

            STATE.WEEKDAY = days[date.getDay()]

            return STATE
        },

    },
    mounted: function() {

        let STATE = this.$store.state

        setInterval( ()=>{

            STATE.currentTIME.S++;
            if ( STATE.currentTIME.S==60 ) {
                STATE.currentTIME.S=0;
                STATE.currentTIME.M++;
                if (STATE.currentTIME.M==60) {
                    STATE.currentTIME.M=0;
                    STATE.currentTIME.H++;
                }
            }

        }, 1000);
    }
}
</script>
<style>
.datetime .time {font-size: 90px;}
.datetime .date {font-size: 28px;}

</style>