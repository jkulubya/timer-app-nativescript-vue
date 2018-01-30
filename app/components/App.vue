<template>
    <page actionBarHidden="true">
        <stack-layout verticalAlignment="center">
            <grid-layout
                columns="*,*,*"
                rows="*,2*,*"
                height="240"
                horizontalAlignment="center">
                <label text="+" class="button add-button" @tap="addOneUnitToDuration('h')" col="0" row="0"></label>
                <label text="+" class="button add-button" @tap="addOneUnitToDuration('m')" col="1" row="0"></label>
                <label text="+" class="button add-button" @tap="addOneUnitToDuration('s')" col="2" row="0"></label>
                <label :text="hours | addTimeUnit('hours')" class="time-label" verticalAlignment="center" col="0" row="1"></label>
                <label :text="minutes | addTimeUnit('min')" class="time-label" verticalAlignment="center" col="1" row="1"></label>
                <label :text="seconds | addTimeUnit('sec')" class="time-label" verticalAlignment="center" col="2" row="1"></label>
                <label text="-" class="button minus-button" @tap="minusOneUnitFromDuration('h')" col="0" row="2"></label>
                <label text="-" class="button minus-button" @tap="minusOneUnitFromDuration('m')" col="1" row="2"></label>
                <label text="-" class="button minus-button" @tap="minusOneUnitFromDuration('s')" col="2" row="2"></label>
            </grid-layout>
            <button text="Start Timer" class="label start-label" @tap="onStartTimerTap" horizontalAlignment="center"></button>
            <button text="Reset" class="label reset-label" @tap="onResetTap" horizontalAlignment="center"></button>
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

            onResetTap() {
                this.hours = 0;
                this.minutes = 0;
                this.seconds = 0;
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
.button {
    font-size: 60;
    font-weight: bold;
    margin: 0;
    text-align: center;
}

.time-label{
    font-size: 30;
    font-weight: bold;
    margin: 0;
    padding: 0;
    text-align: center;
}

.label{
    &.start-label{
        background-color: red;
        border-radius: 50%;
        color: blue;
        height: 90;
        margin: 10 0;
        width: 90;
    }

    &.reset-label{
        background-color: red;
        border-radius: 50%;
        color: blue;
        height: 65;
        width: 65;
    }
}
page{
    background-color: #f5f5f5;
}
</style>
