<template>
    <p class="datetime mt-3">
        <strong>{{ TIME.D }}.{{ TIME.M }}.{{ TIME.Y }}</strong>
        <br />
        {{ TIME.H }}:{{ TIME.Min }}:{{ TIME.S }}
    </p>
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

<style scoped>
.datetime strong {
    font-weight: 500;
}
</style>