<template>
    <div>
        {{ TIME.H }}:{{ TIME.Min }}
    </div>
</template>

<script>
export default {
    name: 'TimerLada',
    computed: {
        TIME() { 
            return this.$store.state.currentTimeFormatted;
        }
    }
}
</script>