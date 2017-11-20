<template>
    <page actionBarHidden="true" ref="page">
        <stack-layout>
            <grid-layout columns="*" rows="3*,*,*" height="240">
                <label :text="timeLeftxv" col="0" row="0"></label>
                <button text="||" col="0" row="1"></button>
            </grid-layout>
            <button text="Stop" @tap="onStopButtonTap"></button>
            <label v-if="countdownFinished">Time's up</label>
        </stack-layout>
    </page>
</template>

<script>
    import { DateTime, Duration } from 'luxon'

    export default {
        data() {
            return {
                duration: null,
                startTime: 0,
                currentTime: 0,
                timerId: null,
                timerRunning: false
            }
        },
        computed: {
            millisecondsLeft() {
                return (this.startTime + this.duration - this.currentTime)
            },

            timeLeft() {
                if(this.millisecondsLeft <= 0) {
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

            timeLeftxv() {
                return `${Math.floor(this.timeLeft.hours)} : ${Math.floor(this.timeLeft.minutes)} : ${Math.floor(this.timeLeft.seconds)}`;
            },
            
            countdownFinished() {
                return this.millisecondsLeft <= 0;
                //return `${Math.floor(Duration.fromMillis(timeLeft).shiftTo("hours").hours)} : ${Math.floor(Duration.fromMillis(timeLeft).shiftTo("minutes").minutes)} : ${Math.floor(Duration.fromMillis(timeLeft).shiftTo("seconds").seconds)}`;
            }
        },
        methods: {
            onPauseButtonTap() {
                this.pauseTimer();
            },
            onStopButtonTap() {
                this.stopTimer();                
            },
            startTimer() {
                // set start time now
                this.startTime = DateTime.local().valueOf();

                // start setinterval timer
                this.timerId = setInterval(() => {
                    this.updateTimer();
                }, 1000)

                // set timer running to true
                this.timerRunning = true;
            },

            resumeTimer() {
                // start setinterval timer
                this.timerId = setInterval(() => {
                    this.updateTimer();
                }, 1000)

                // set timer running to true
                this.timerRunning = true;
            },

            updateTimer() {
                this.currentTime = DateTime.local().valueOf();                
            },

            pauseTimer() {
                // stop setinterval timer
                clearInterval(this.timerId);
                // set timer running to false
                this.timerRunning = false;
            },
            stopTimer() {
                clearInterval(this.timerId);
                this.timerRunning = false;
                // navigate back
            }
        },
        created() {
            this.duration = Number(this.$route.params.duration);
            this.startTimer();
        }
    }
</script>

<style scoped>
</style>