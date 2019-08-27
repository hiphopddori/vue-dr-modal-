<template>
    <div>
        <button style="color:#000;" @click="onClickPop">Modal</button>
        <dr-modal v-if="isPop" v-on:close="isPop=false" :title="'TestModal'" width="'200px'" height="'350px'">
            <span>hello world</span>
        </dr-modal>

    </div>
</template>

<script>

import DrModal from "./DrModal"

export default {
    data(){
        return{
            isPop:false,
        }
    },
    components:{
        DrModal
    },
    methods:{
        onClickPop(){
            this.isPop = true;
        }
    }
}
</script>

<style>

</style>
