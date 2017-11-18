<template>
    <page actionBarHidden="true">
        <stack-layout>
            <grid-layout columns="*,*,*" rows="*,2*,*" height="240">
                <label text="+" col="0" row="0"></label>
                <label text="+" col="1" row="0"></label>
                <label text="+" col="2" row="0"></label>
                <label text="2hrs" col="0" row="1"></label>
                <label text="10min" col="1" row="1"></label>
                <label text="7s" col="2" row="1"></label>
                <label text="-" col="0" row="2"></label>
                <label text="-" col="1" row="2"></label>
                <label text="-" col="2" row="2"></label>
            </grid-layout>
            <button text="Start" @tap="onTap"></button>
        </stack-layout>
    </page>
</template>

<script>
    import ViewTimer from "./ViewTimer.vue";
    export default {
        data() {
            return {
                count: 10
            }
        },
        methods: {
            onTap() {
                this.$navigateTo(ViewTimer)
            }
        }
    }
</script>

<style scoped>
</style>