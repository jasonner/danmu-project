<template>
    <div class="index-page" ref="imageWrapper" >
        <div class="img-box" v-show="!imgShow">
            <div class="vue-baberrage" @enter=stopEvenChange()>
                <vue-baberrage
                    :isShow= "barrageIsShow"
                    :barrageList = "barrageList"
                    :loop = "barrageLoop"
                    :throttleGap="10000"
                    :boxHeight="680"  
                    :messageHeight="60"
                    :maxWordCount="50"
                    @barrage-list-empty="sayHi"
                    style="margin-top:5%;height:85%;margin-left:-30%"
                >
                </vue-baberrage>
            </div>
            <div class="eq-code-box">
                <img src="@/assets/img/EQ-code.jpg" alt="" srcset="">
            </div>
        </div>
        <img :src="getImg" class="stopImg" alt="" v-show="imgShow">
    </div>
</template>
<script>
import qs from 'qs'
import Vue from 'vue'
import { vueBaberrage } from 'vue-baberrage'
import html2canvas from "html2canvas"
Vue.use(vueBaberrage)
export default {
    data(){
        return{
            barrageIsShow: true, 
            barrageLoop: false,
            ticket:'0',
            barrageList:[],
            time:15,
            timer1:null,
            imgShow:false,
            getImg:'',
            arrFloag:false,
            t:0
        }
    },
    mounted(){
        this.addToList(this.ticket);
    },
    created: function() {
        var _this = this;
        document.onkeydown = function(e){
            console.log(window.cancelAnimationFrame)
            window.cancelAnimationFrame = true;
            let key = window.event.keyCode;
            //clearInterval('timers');
            // if (key == 13) {
            //     if(_this.getImg == '' && !_this.arrFloag){
            //          html2canvas(_this.$refs.imageWrapper,{useCORS: true,allowTaint: false}).then(canvas => {
            //             let dataURL = canvas.toDataURL("image/png");
            //             _this.getImg = dataURL;
            //             _this.imgShow = true;
            //         });
            //     }
            // }else if(key == 32){
            //     if(_this.getImg != ''){
            //          _this.getImg = '';
            //         _this.imgShow = false;
            //         _this.addToList(_this.ticket);
            //     }   
            // }
        };
    },
    methods:{
        addToList (ticket){
            let that  = this;
            let promise = {
                meetingname:'test1214',
                ticket:ticket,
                top:'9',//条数
            }
            //GetMessageList(循环) GetMessageListOnlyONE(不循环)
            that.axios.post('danmu/GetMessageListOnlyONE', qs.stringify(promise))
            .then(function (res) {
                if(res.status == 200 ){
                    if(res.data.data.list && res.data.data.list.length>0){
                        that.ticket = res.data.data.ticket;
                        var arr= []
                        res.data.data.list.forEach(element => {
                            let obj = {
                                id:element.Id,
                                avatar:element.headimgurl,
                                msg:element.message,
                                time:parseInt(Math.random()*(25-22+1)+22,10),
                                type: ''
                            }
                            arr.push(obj);
                        });
                        that.barrageList = arr;
                    }else{
                        that.barrageList = [];
                    }
                    if(that.timer1){
                        clearTimeout(that.timer1);
                    };
                    that.timer1 = setTimeout(() => {
                        that.barrageList = [];
                        that.addToList(that.ticket);
                    }, 3000);
                }else{
                    that.$message({
                    message: '服务异常请稍后重试！',
                    type: 'warning'
                    });
                }
            });
        },

        sayHi(){
            this.t++;
            if(this.t>=3){
                this.arrFloag = true;
            }
        },
        stopEvenChange(){
           
        }    
    },
    destroyed(){
        if(this.timer1){
            clearTimeout(this.timer1);
        }
    }

}
</script>
<style>
    .index-page{
        height: 100%;
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        color: #fff;
        background: url(../assets/img/bg.jpg) center no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }
    .index-page .stopImg{
        width: 100%;
        height: 100%;
    }
    .img-box{
        width: 100%;
        height: 100%;
    }
    .vue-baberrage{
        height: 100%;
        width: 130%;
        box-sizing: border-box;
    }
    .baberrage-msg{
        font-size: 1.2vw;
    }
    .baberrage-avatar{
        width: 5vw;
        height: 5vw;
        border-radius: 100%;
        z-index: 1000;
        z-index: 100;
    }
     .baberrage-avatar img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
        z-index: 1000;
    }
    .baberrage-item{
        z-index: 1000;
    }
    .vue-baberrage .baberrage-item .normal{
        padding:0px;
        padding: 2px;
        padding-right: 10px;
        box-sizing: border-box;
        z-index: 100;
    }
</style>
<style scoped>
.eq-code-box{
    width: 10vw;
    height: auto;
    position: fixed;
    left: 4vw;
    bottom: 4vh;
}
.eq-code-box img{
    width: 100%;
}
</style>
