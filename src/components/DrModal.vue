<template>            
    
    <div v-bind:class="modalClass">
        <!--
        <vue-draggable-resizable :resizable="false" :x="x" :y="y" :w="resizableWidth" :h="resizableHeight" v-bind:drag-handle="dragHandler"  @dragging="onDrag" @activated="onActivated" @deactivated="onDeactivated">    
        -->
        <vue-draggable-resizable :prevent-deactivation="true" :resizable="false" :x="x" :y="y"  v-bind:drag-handle="dragHandler"  @dragging="onDrag" @activated="onActivated" @deactivated="onDeactivated">    
            <div  class="mu-dialog" v-bind:style="{width:calcDailogWidth,height:calcDialogHeight}" style="left:0px;top:0px;">                                
                <div v-bind:class="[handlerStyleClass , handlerControlClass]">
                    <h4 class="mu-title">{{title}}</h4>
                    <div class="mu-dialog-head-btn">
                        <button type="button" v-show="minimizedButton" @click="onClickMinimized" class="mu-btn mu-btn-icon mu-btn-icon-only mu-btn-bg-non"><i class="mu-icon-img min"></i></button>                        
                        <button type="button" @click="onClickClose" class="mu-btn mu-btn-icon mu-btn-icon-only mu-btn-bg-non"><i class="mu-icon-img cancel"></i></button>
                    </div>
                </div>
                <div class="mu-dialog-body">
                    <slot></slot>
                </div>
                <slot name="foot"></slot>
            </div>        
        </vue-draggable-resizable>   
    
    </div>            
    
</template>

<script>

const generateRandomString = (stringLength) => {
        let randomString = '';
        let randomAscii;
        for(let i = 0; i < stringLength; i++) {
            randomAscii = Math.floor((Math.random() * 25) + 97);
            randomString += String.fromCharCode(randomAscii)
        }
        return randomString
    }


export default {
    name:'dr-modal',        

    props:{                
        blockMode:{                 //blcoking 여부
            type:Boolean,
            default:true
        },minimizedButton:{         //최소화 버튼 여부
            type:Boolean,
            default:false
        },title:{
            type:String
        }        
    },
    data() {
        return {
            x:0,
            y:0,
            dialogWidth:'1024px',
            dialogHeight:'768px',            
            handlerStyleClass:'mu-dialog-head',
            handlerControlClass:'',
        }
    },
    computed: {
        
        dragHandler(){                        
            //return ".mu-dialog-head";            
            return `.${this.handlerControlClass}`;
        }
        ,calcDailogWidth(){                        
            
            if (this.dialogHeight == "auto"){
                return this.dialogWidth;
            }else{
                return this.getCalcSize("W",this.dialogWidth) + "px";
            }            
        },
        calcDialogHeight(){                        
            
            if (this.dialogHeight == "auto"){
                return this.dialogHeight;
            }else{
                return this.getCalcSize("H",this.dialogHeight) + "px";
            }
            
        },
        resizableWidth(){            
            return this.getCalcSize("W",this.dialogWidth);
        },          
        resizableHeight(){            
            return this.getCalcSize("H",this.dialogHeight);
        },
        modalClass(){
            let blockClass;
            if (this.blockMode){
                blockClass = "modal-mask";
            }else{
                blockClass = "";
            }
            return blockClass;
        }
    },
    created() {
        this.handlerControlClass = "handler_" + generateRandomString(5);
    },        
    beforeMount() {
        //한번 아래 값을 줘야지 그이후 mounted에서 적용됨 나중에 확인해보자
        this.dialogWidth = this.$attrs.width;
        this.dialogHeight = this.$attrs.height;

        this.x= (window.innerWidth / 2) 
        this.y= (window.innerHeight/ 2) 
  
    },  
    mounted() {
        
        this.dialogWidth = this.$attrs.width;
        this.dialogHeight = this.$attrs.height;

        let dialogWidth;
        let dialogHeight;

        if (this.dialogHeight == "auto"){
            dialogHeight = this.$el.children[0].children[0].offsetHeight
        }else{
            dialogHeight = this.getCalcSize("H",this.dialogHeight);
        }

        if (this.dialogWidth == "auto"){
            dialogWidth = this.$el.children[0].children[0].offsetWidth;
        }else{
            dialogWidth = this.getCalcSize("W",this.dialogWidth);
        }
        
        this.x= (window.innerWidth / 2) - (dialogWidth / 2);
        this.y= (window.innerHeight/ 2) - (dialogHeight / 2);     

    },  
    methods: {
        onClickClose(){
            this.$emit('close');            
        },
        onClickMinimized(){
            this.$emit('minimized');            
        },
        onDrag(x, y) {            
            //this.x = x;
            //this.y = y;                        
        },
        onActivated(){
            
        },
        onDeactivated(){
            
        },
        getCalcSize(type,size){
            
            let calcSize = null;
            let windowSize = 0;
            if (type == "H"){
                windowSize = window.innerHeight;
            }else{
                windowSize = window.innerWidth;
            }

            if (size.indexOf("%") >=0){
                calcSize =  windowSize  *  (Number(size.replace(/[^0-9]/g,'')) /100);
            }else if (size.indexOf("px") >=0){
                calcSize =  Number(size.replace(/[^0-9]/g,''));
            }else{

            }

            return calcSize;
        }
    },

}
</script>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity 5.3s ease;
}
</style>
