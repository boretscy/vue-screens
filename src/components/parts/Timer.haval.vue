<template>
    <div class="datetime mt-3 d-flex justify-content-start align-items-center">
        <div class="time f-haval-400 mr-4">{{ TIME.H }}:{{ TIME.Min }}</div>
        <div class="date f-haval-500">{{ TIME.Weekday }}<br />{{ TIME.D }}.{{ TIME.M }}.{{ TIME.Y }}</div>
    </div>
</template>

<script>
export default {
    name: 'Timer',
    computed: {
        TIME() { 
            return this.$store.state.currentTimeFormatted;
        }
    }
}
</script>
<style>
.datetime .time {font-size: 90px;}
.datetime .date {font-size: 28px;}

</style>