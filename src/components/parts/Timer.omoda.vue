<template>
    <p class="datetime mt-3">
        {{ STATE.DATE.D }}.{{ STATE.DATE.M }}.{{ STATE.DATE.Y }}
        <br />
        {{ STATE.TIME.H  }}:{{ STATE.TIME.M  }}
    </p>
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