<template>
    <page
        actionBarHidden="true"
        :class="{'view-timer': true, 'view-timer-done': countdownFinished}">
        <stack-layout verticalAlignment="center">
            <label class="time-left" :text="timeLeftString"></label>
            <label class="pause-button control-button"  text="||" @tap="onPauseButtonTap"></label>
            <label class="stop-button control-button" text="stop" @tap="onStopButtonTap"></label>
        </stack-layout>
    </page>
</template>

<script>
    import { DateTime, Duration } from 'luxon'

    export default {
        data() {
            return {
                duration: 0,
                times: {
                    startTime: 0,
                    currentTime: 0
                },                
                timerId: null,
                timerRunning: false
            }
        },


        computed: {
            millisecondsLeft() {
                return (this.times.startTime + this.duration - this.times.currentTime)
            },

            timeLeft() {
                if(this.millisecondsLeft <= 0) { //TODO stop counting anything when time is up
                    return {

                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    }
                }

                return Duration.fromMillis(this.millisecondsLeft)
                        .shiftTo('hours', 'minutes', 'seconds')
                        .toObject();
            },

            timeLeftString() {
                let t = {
                    hours: this.formatTimeString(Math.ceil(this.timeLeft.hours)),
                    minutes: this.formatTimeString(Math.ceil(this.timeLeft.minutes)),
                    seconds: this.formatTimeString(Math.ceil(this.timeLeft.seconds))
                }

                return `${t.hours}:${t.minutes}:${t.seconds}`;
            },
            
            countdownFinished() {
                return this.millisecondsLeft <= 0;
            }
        },

        methods: {
            onPauseButtonTap() {
                this.pauseTimer();
            },

            onPlayButtonTap() {
                this.resumeTimer();
            },

            onStopButtonTap() {
                this.stopTimer();                
            },

            startTimer() {
                let start = DateTime.local().valueOf();
                this.times.startTime = start;
                this.times.currentTime = start;
                this.timerId = setInterval(() => {
                    this.updateTimer();
                }, 1000)
                this.timerRunning = true;
                this.updateTimer();
            },

            resumeTimer() {
                this.timerId = setInterval(() => {
                    this.updateTimer();
                }, 1000)
                this.timerRunning = true;
            },

            updateTimer() {
                this.times.currentTime = DateTime.local().valueOf();                
            },

            pauseTimer() {
                clearInterval(this.timerId);
                this.timerRunning = false;
            },

            stopTimer() {
                clearInterval(this.timerId);
                this.timerRunning = false;
            },

            formatTimeString(time){
                if(time < 10){
                    return `0${time}`
                }
                return `${time}`
            }
        },

        mounted() {
            this.duration = Number(this.$route.params.duration);
            setTimeout(() => this.startTimer(), 1500);
        }
    }
</script>

<style lang="scss" scoped>
.control-button{
    color: #000000;
    font-size: 40;
    font-weight: bold;
    margin: 20 0;
    text-align: center;
}
.time-left{
    color: white;
    font-size: 80;
    font-weight: bold;
    text-align: center;
}

.view-timer{
    background-color: rgb(48, 255, 48);

    &.view-timer-done{
        background-color: rgb(255, 0, 0);
    }
}
</style>