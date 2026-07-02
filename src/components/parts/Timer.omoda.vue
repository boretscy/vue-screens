<template>
    <p class="datetime mt-3">
        {{ TIME.D }}.{{ TIME.M }}.{{ TIME.Y }}
        <br />
        {{ TIME.H }}:{{ TIME.Min }}
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