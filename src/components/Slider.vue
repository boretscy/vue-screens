<template>
    <div
        class="advwrap"
        v-if="STATE.ADV_MODE == 'ITEMS_ADV' || STATE.ADV_MODE == 'ADV'">
        <div
            class="advitem"
            v-for="(ITEM, INDX) in STATE.ADV_ITEMS"
            :key="INDX"
            v-if="ITEM.SHOW"
            >
            <div
                class="picture"
                v-if="ITEM.TYPE == 'image'"
                :style="{'background-image': 'url(https://portal.yug-avto.ru'+ITEM.FILE.SRC+')'}"></div>
            <div
                class="video"
                v-if="ITEM.TYPE == 'video'"
                >
                <video-bg :sources="['https://portal.yug-avto.ru'+ITEM.FILE.SRC]"></video-bg>
            </div>
            
        </div>
    </div>
</template>

<script>
import VideoBg from 'vue-videobg'

export default {
    name: 'Slider',
    components: {
        VideoBg
    },
    computed: {
        STATE() { return this.$store.state.ADV }
    },
    mounted: function() {
        
        let MODE = this.$store.state.ADV.ADV_MODE

        switch ( MODE ) {

            case 'ADV':
                this.startADV()
                break;

            case 'ITEMS_ADV':
                this.startITEMSADV()
                break;

            default: break;
        }
    },
    methods: {

        startADV() {
            
            let STATE = this.$store.state.ADV
            let alltimeouts = 0
            for ( let indx in STATE.ADV_ITEMS ) {
                alltimeouts += ( STATE.ADV_ITEMS[indx].TYPE == 'video' && STATE.ADV_ITEMS[indx].PLAY_TO_END ) ? Number(STATE.ADV_ITEMS[indx].LENGTH) : Number(STATE.ADV_ITEMS[indx].DURATION)
            }

            let timeout = 0
            for ( let indx in STATE.ADV_ITEMS ) {
                
                setTimeout(() => {
                    STATE.ADV_ITEMS[indx].SHOW = true
                }, timeout*1000);

                timeout += ( STATE.ADV_ITEMS[indx].TYPE == 'video' && STATE.ADV_ITEMS[indx].PLAY_TO_END ) ? Number(STATE.ADV_ITEMS[indx].LENGTH) : Number(STATE.ADV_ITEMS[indx].DURATION)
                
                setTimeout(() => {
                    STATE.ADV_ITEMS[indx].SHOW = false
                }, timeout*1000);

            }

            setInterval(() => {
                let timeout = 0
                for ( let indx in STATE.ADV_ITEMS ) {

                    setTimeout(() => {
                        STATE.ADV_ITEMS[indx].SHOW = true
                    }, timeout*1000);

                    timeout += ( STATE.ADV_ITEMS[indx].TYPE == 'video' && STATE.ADV_ITEMS[indx].PLAY_TO_END ) ? Number(STATE.ADV_ITEMS[indx].LENGTH) : Number(STATE.ADV_ITEMS[indx].DURATION)
                    
                    setTimeout(() => {
                        STATE.ADV_ITEMS[indx].SHOW = false
                    }, timeout*1000);

                }
            }, alltimeouts*1000);
        },

        startITEMSADV() {
            
            let STATE = this.$store.state.ADV
            let startTimeout = Number(STATE.ADV_TIMEOUT);
            let alltimeouts = 0
            for ( let indx in STATE.ADV_ITEMS ) {
                alltimeouts += ( STATE.ADV_ITEMS[indx].TYPE == 'video' && STATE.ADV_ITEMS[indx].PLAY_TO_END ) ? Number(STATE.ADV_ITEMS[indx].LENGTH) : Number(STATE.ADV_ITEMS[indx].DURATION)
            }

            setTimeout(() => {
                
                let timeout = 0
                for ( let indx in STATE.ADV_ITEMS ) {

                    setTimeout(() => {
                        STATE.ADV_ITEMS[indx].SHOW = true
                    }, timeout*1000);

                    timeout += ( STATE.ADV_ITEMS[indx].TYPE == 'video' && STATE.ADV_ITEMS[indx].PLAY_TO_END ) ? Number(STATE.ADV_ITEMS[indx].LENGTH) : Number(STATE.ADV_ITEMS[indx].DURATION)
                    
                    setTimeout(() => {
                        STATE.ADV_ITEMS[indx].SHOW = false
                    }, timeout*1000);

                }

                setInterval(() => {

                    setTimeout(() => {
                        
                        let timeout = 0
                        for ( let indx in STATE.ADV_ITEMS ) {

                            setTimeout(() => {
                                STATE.ADV_ITEMS[indx].SHOW = true
                            }, timeout*1000);

                            timeout += ( STATE.ADV_ITEMS[indx].TYPE == 'video' && STATE.ADV_ITEMS[indx].PLAY_TO_END ) ? Number(STATE.ADV_ITEMS[indx].LENGTH) : Number(STATE.ADV_ITEMS[indx].DURATION)
                            
                            setTimeout(() => {
                                STATE.ADV_ITEMS[indx].SHOW = false
                            }, timeout*1000);

                        }

                    }, startTimeout);

                }, startTimeout*1000+alltimeouts*1000);
                
            }, startTimeout*1000);
        }
    }

}
</script>

<style scoped>
.advwrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
.advwrap .advitem .picture {
    width: 100vw;
    height: 100vh;
    background-position: center center;
    background-size: cover;
}
.advwrap .advitem .video {
    width: 100vw;
    height: 100vh;
}
</style>