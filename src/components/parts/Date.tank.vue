<template>
    <div class="c-yawhite">
        {{ d }}
        <div class="week">{{ w }}</div>
    </div>
</template>

<script>
export default {
    name: 'DateTank',
    data: function () {
        return {
            d: '',
            w: ''
        }
    },
    computed: {
    },
    mounted: function() {

        this.newDate();
        setInterval( ()=>{

            this.newDate();

        }, 1000);
    },

	methods: {

        newDate() {
            let month = [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря',
            ];

            let week = [
                'воскресенье',
                'понедельник',
                'вторник',
                'среда',
                'четверг',
                'пятница',
                'суббота',
            ];

            let now = new Date();

            this.d = now.getDate() + ' ' + month[now.getMonth()];
            this.w = week[now.getDay()];
        }
	}
}
</script>
<style scoped>
.week {font-weight: 700;}
</style>