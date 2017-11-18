<template>
    <page actionBarHidden="true">
        <stack-layout>
            <grid-layout columns="*" rows="3*,*,*" height="240">
                <label text="02:16:47" col="0" row="0"></label>
                <button text="||" col="0" row="1"></button>
            </grid-layout>
            <button text="Start"></button>
        </stack-layout>
    </page>
</template>

<script>
    export default {
        data() {
            return {
                count: 10
            }
        }
    }
</script>

<style scoped>
</style>