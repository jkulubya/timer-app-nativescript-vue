<template>
    <page actionBarHidden="true">
        <stack-layout verticalAlignment="center">
            <grid-layout
                columns="*,*,*"
                rows="*,2*,*"
                height="240"
                horizontalAlignment="center">
                <label text="+" @tap="addOneUnitToDuration('h')" col="0" row="0"></label>
                <label text="+" @tap="addOneUnitToDuration('m')" col="1" row="0"></label>
                <label text="+" @tap="addOneUnitToDuration('s')" col="2" row="0"></label>
                <label :text="hours | addTimeUnit('h')" col="0" row="1"></label>
                <label :text="minutes | addTimeUnit('m')" col="1" row="1"></label>
                <label :text="seconds | addTimeUnit('s')" col="2" row="1"></label>
                <label text="-" @tap="minusOneUnitFromDuration('h')" col="0" row="2"></label>
                <label text="-" @tap="minusOneUnitFromDuration('m')" col="1" row="2"></label>
                <label text="-" @tap="minusOneUnitFromDuration('s')" col="2" row="2"></label>
            </grid-layout>
            <button text="Start Timer" @tap="onStartTimerTap"></button>
        </stack-layout>
    </page>
</template>

<script>
    import { Duration } from 'luxon'
    import ViewTimer from "./ViewTimer.vue";

    export default {
        data() {
            return {
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        },
        methods: {
            addOneUnitToDuration(unit){
                switch(unit) {
                    case "h":
                        this.hours++;
                        break;
                    case "m":
                        this.minutes++;
                        break;
                    case "s":
                        this.seconds++;
                        break;
                }
            },

            minusOneUnitFromDuration(unit){
                switch(unit) {
                    case "h":
                        if(this.hours >= 1) this.hours--;
                        break;
                    case "m":
                        if(this.minutes >= 1) this.minutes--;
                        break;
                    case "s":
                        if(this.seconds >= 1) this.seconds--;
                        break;
                }
            },

            getTotalDuration() {
                return Duration.fromObject({
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds
                }).shiftTo("milliseconds").milliseconds;
            },

            onStartTimerTap() {
                this.$router.push({ name: 'Timer', params: { duration: this.getTotalDuration() }})
            }
        },
        filters: {
            addTimeUnit(value, unit) {
                let leadingZeroRequired = false;
                if(value < 10) leadingZeroRequired = true;

                value = value.toString();

                if(leadingZeroRequired) {
                    return `0${value} ${unit}`
                }
                return `${value} ${unit}`
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>
