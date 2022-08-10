<template>
  <div class="sedMsg-page">
    <!-- header -->
    <div class="header-box">
      <div class="header-left">
        <img src="@/assets/img/logo.png" alt="" srcset="" />
      </div>
      <div class="header-right">
        <img src="@/assets/img/logo-right.png" alt="" srcset="" />
      </div>
    </div>

    <!-- slogan -->
    <div class="slogen-box">
      <div class="slogen-list">
        <img src="@/assets/img/slogen.png" alt="" srcset="" />
      </div>
    </div>

    <!-- text-title -->
    <div class="text-title-box">
      <div class="content-text">
        <img src="@/assets/img/content-text.png" alt="" srcset="" />
        <textarea name="" id="" cols="30" rows="10" v-model="msg" maxlength="50"></textarea>
        <span class="num-text">{{msg.length}}/50</span>
      </div>
    </div>

    <!-- submit -->
    <div class="submit-box">
      <div class="submit">
        <button  @click="submitChange()" :disabled="disabledShow">
          <img src="@/assets/img/submit.png" alt="" srcset="" />
        </button>
      </div>
    </div>

    <!--slogan-bottom-->
    <div class="slogan-bottom-box">
      <div class="slogan-bottom">
        <img src="@/assets/img/slogan-bottom.png" alt="" srcset="" />
      </div>
    </div>

    <!-- model -->
    <div class="model-box" v-show="modelShow">
      <div class="model-shawdow"></div>
      <div class="content-box">
        <div class="title">{{ modelMsg.title }}</div>
        <div class="content">{{ modelMsg.content }}</div>
        <div class="sure-content">
          <div class="sure-btn-box">
            <div class="del" v-if="modelMsg.del" @click="modelShow = false">
              {{ modelMsg.del }}
            </div>
            <div class="sure-btn" @click="modelShow = false">
              {{ modelMsg.sure }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      msg: "",
      modelMsg: {
        title: "提示",
        content: "发送成功",
        sure: "确定",
      },
      modelShow: false,
      disabledShow:false
    };
  },
  mounted() {
    let that = this;
    let key = "6760NOGC";
    that.initWXlogin(key);
  },
  methods: {
    submitChange() {
      let that = this;
      that.disabledShow = true;
      if (that.msg == "") {
        that.modelMsg.content = "请输入内容";
        that.modelShow = true;
        that.disabledShow = false;
        return;
      } else {
        let promise = {
          meetingname: "test1214",
          message: that.msg,
          isshenhe: false, //后审核
          isguan: true, //筛选
        };
        that.axios.post("danmu/AddMessage", qs.stringify(promise))
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              if (res.data.msg && res.data.msg == "ok") {
                console.log("发送成功");
                that.msg = "";
                that.modelShow = true;
              } else {
                that.modelMsg.content = res.data.msg;
                that.modelShow = true;
                that.msg = ""
                console.log("发送失败");
              }
              that.disabledShow = false;
            } else {
              console.log("服务异常！");
            }
        });
      }
    },
    initWXlogin(key) {
      let that = this;
      that.axios.get("/WXAuthorization/GetUserWXInfo?callkey=" + key).then(function (res) {
        console.log(res);
        if (res.status == 200) {
          if (!res.data.user) {
            window.location.href = "/WXAuthorization/WXlogin?callkey=" + key+'&state='+'https%3A%2F%2Fapi.lehuitech.com.cn%2F21%2Fwj%2Fdanmu1215%2Findex.html%23%2FsedMsg';
          } else {
            that.getKey();
          }
        } else {
          that.$message({
            message: "服务异常请稍后重试！",
            type: "warning",
          });
        }
      });
    },

    getKey() {
      let that = this;
      that.axios.get("/WXAuthorization/jsapi?url=" + window.location.href).then(function (res) {
        console.log(res);
        if (res.status == 200) {
          that.initIMg(res.data);
        } else {
          console.log('服务异常')
        }
      });
    },

    initIMg(result) {
      console.log(result);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "checkJsApi",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getNetworkType",
          "openLocation",
          "getLocation",
        ], // 必填，需要使用的JS接口列表
      });
    },
  },
};
</script>
<style >
.sedMsg-page {
  width: 100%;
  min-height: 100%;
  background: url(../assets/img/h5-bg.png) center no-repeat;
  background-size: 100% 100%;
  padding-bottom: 24vw;
  box-sizing: border-box;
}
/* header */
.header-box {
  width: 100%;
  display: flex;
}
.header-box div {
  flex: 1;
}
.header-box .header-left {
  text-align: left;
}
.header-box .header-left img {
  width: 103px;
  margin-top: 18px;
  margin-left: 21px;
}
.header-box .header-right {
  text-align: right;
}
.header-box .header-right img {
  width: 115px;
  margin-top: 12px;
  margin-right: 28px;
}
/* slogen */
.slogen-box {
  width: 100%;
}
.slogen-box .slogen-list {
  width: 46.2%;
  margin: 0 auto;
  margin-top: 28px;
}
.slogen-box .slogen-list img {
  width: 100%;
  background: transparent;
  object-fit: fill;
}
/* content-text */
.text-title-box {
  width: 100%;
}
.text-title-box .content-text {
  width: 82.3%;
  margin: 0 auto;
  margin-top: 110px;
  position: relative;
}
.text-title-box .content-text textarea {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  border: none;
  border-radius: 20px;
  background: #fff;
  height: 78%;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 2vw;
  outline: none;
  font-size: 30px;
}
.text-title-box .content-text img {
  width: 100%;
}

/* submit */
.submit-box {
  width: 100%;
}
.submit-box .submit {
  width: 30vw;
  margin: 0 auto;
  margin-top: 40px;
}
.submit-box .submit button{
  width: 100%;
  background: none;
  border: none;
  outline: none;
}
.submit-box .submit img {
  width: 100%;
}
/* slogan-bottom-box */
.slogan-bottom-box {
  width: 100%;
  height: 14vw;
  text-align: right;
}
.slogan-bottom-box .slogan-bottom {
  width: 109px;
  margin-right: 4vw;
  margin-top: 14vw;
  float: right;
}
.slogan-bottom-box .slogan-bottom img {
  width: 100%;
}

/* model */
.model-box {
  width: 100%;
  min-height: 100%;
}
.model-box .model-shawdow {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.6;
  z-index: 10;
}
.model-box .content-box {
  width: 80%;
  position: fixed;
  top: 35%;
  left: 10%;
  background: #fff;
  z-index: 100;
  border-radius: 20px;
  padding: 20px 0;
  box-sizing: border-box;
}
.model-box .content-box .title {
  font-size: 30px;
  line-height: 2;
}

.model-box .content-box .content {
  font-size: 30px;
  margin-top: 30px;
}
.model-box .content-box .sure-btn-box {
  width: 100%;
  display: flex;
  margin-top: 30px;
  border-top: 1px solid #efefef;
}
.model-box .content-box .sure-btn-box div {
  flex: 1;
  font-size: 30px;
  line-height: 1.5;
  padding-top: 20px;
  box-sizing: border-box;
}
.model-box .content-box .sure-btn-box .sure-btn {
  color: #117ff1;
}
.num-text{
    position: absolute;
    bottom: 4vw;
    right: 4vw;
    font-size: 28px;
}
</style>