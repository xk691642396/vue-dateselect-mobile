<template>
  <article v-cloak>
    <section id="register">
      <div class="user-reg-center">
        <div class="user-reg-middle">
          <div class="reg-box">
            <div class="icon-box">
              <p>物流链云平台</p>
              <p>智慧物流 云端畅享</p>
            </div>
            <div class="input-box">
              <h1>用户注册</h1>
              <input type="text" placeholder="公司名称" :class="(FCompany.trim().length==0&&blurArr[0])?'border-red':''" v-model="FCompany" @blur="notNull(FCompany,'公司名称',0)"/>
              <input type="text" placeholder="姓名" :class="(FNickName.trim().length==0&&blurArr[1])?'border-red':''" v-model="FNickName" @blur="notNull(FNickName,'姓名',1)" />
              <div class="mobile-box">
                <input type="number" min="0" placeholder="手机号" v-model="FMobile" @blur="veryfyMobile" :class="(!FMobileVerify&&blurArr[2])?'border-red':''" />
                <a class="get-code-btn" @click="getCode" :class="(isGet||!FMobileVerify)?'disabled':''">{{verifyCodeTxt}}</a>
              </div>
              <input type="text" placeholder="请输入验证码" v-model="verifyCode" @blur="veryfyVerifyCode" :class="(!verifyCodeYz&&blurArr[3])?'border-red':''" />
              <input type="text" placeholder="邮箱" v-model="FEmail" @blur="veryfyEmial" :class="((!FEmailVerify||FEmailIsExist)&&blurArr[4])?'border-red':''" />
              <datepicker-input @change-value="changeVal" :value="birthDay" :today="false"><input type="text" readonly="readonly" :value="birthDay" class="birthDay" /></datepicker-input>
              <div v-mdatapicker="birthDay2"><input placeholder="请选择生日" type="text" readonly="readonly" :value="birthDay2" class="birthDay" /></div>
              <input type="password" placeholder="密码：6-30位数字和字母组合" v-model="FPassWord" @blur="veryfyPwd" :class="(!FPassWordVerify&&blurArr[5])?'border-red':''" />
              <div class="remind-area">{{remindText}}</div>
              <!--<a class="reg-btn" :class="(FMobileVerify&&FEmailVerify&&FPassWordVerify&&FCompany.trim().length>0&&FNickName.trim().length>0&&verifyCode.trim().length>0)?'':'disabled'">注册</a>-->
              <a class="reg-btn" @click="register">注册</a>
              <div class="user-agree">点击"注册"，表示您已阅读并同意 <a>用户协议 </a></div>
            </div>
            <div class="channel">官方授权代理商：{{FChannelName}}<span class="autho-code">授权码&emsp;{{RegCode}}</span></div>
          </div>
        </div>
      </div>
    </section>
   </article>
</template>
<script>
import {tips} from '@/assets/js/common.js'
export default {
  name: 'demo',
  data(){
    return{
      FChannelName:"厦门东宅有限公司",
      RegCode:"xmdj",
      FRegType:"渠道注册",
      FCompany:"",
      FNickName:"",
      FMobile:"",
      verifyCode:"",
      FEmail:"",
      birthDay:"1994-12-09",
      birthDay2:"",
      FPassWord:"",
      remindText:"",//提醒框输出内容
      verifyCodeTime:120,//再次获取验证码时间
      verifyCodeTxt:"获取验证码",//获取验证码显示内容
      verifyCodeYz:false,//验证码验证是否通过
      isGet:false,//是否正在获取验证码
      FMobileVerify:false,//手机号码正则验证是否通过
      FEmailVerify:false,//邮箱正则验证是否通过
      FEmailIsExist:true,//邮箱是否存在
      FPassWordVerify:false,//密码验证是否通过
      blurArr:[false,false,false,false,false,false],//是否是第一次失去焦点失去焦点
    }
  },
  methods:{
    changeVal(val){
      this.birthDay = val
    },
    updataRemindTxt(val){
      if(!val){
        this.remindText="";
      }else{
        this.remindText="*"+val;
      }
    },
    //获取验证码点击
    getCode:function(){
      var _this=this;
      if(_this.isGet){
        return false;
      }
      if(_this.FMobileVerify){
        _this.updataRemindTxt();
        _this.getCodeAction();
      }else{
        _this.updataRemindTxt("请输入正确的手机号");
      }
    },
    //获取验证码请求
    getCodeAction(){
      var _this=this;
      tips({
        msg:"短信发送成功"
      })
      _this.isGet=true;
      _this.decreaseTime();
    },
    //倒计时
    decreaseTime:function(){
      var _this=this;
      _this.verifyCodeTxt=_this.verifyCodeTime+"s";
      var timmer=setInterval(function(x){
        _this.verifyCodeTime--;
        _this.verifyCodeTxt=_this.verifyCodeTime+"s";
        if(_this.verifyCodeTime==0){
          _this.isGet=false;
          clearInterval(timmer);
          _this.verifyCodeTime=120;
          _this.verifyCodeTxt="获取验证码";
        }
      },1000)
    },
    //非空验证
    notNull(val,msg,index){
      this.blurArr[index]=true;
      if(val.trim().length===0){
        this.updataRemindTxt(msg+"不能为空");
      }else{
        this.updataRemindTxt();
      }
    },
    //验证手机号
    veryfyMobile(){
      var _this=this;
      _this.blurArr[2]=true;
      if(_this.FMobileVerify){
        _this.updataRemindTxt();
        if(_this.FMobileIsExist){
           _this.updataRemindTxt("该手机已注册,请更换");
        }
      }else{
        _this.updataRemindTxt("请输入正确的手机号");
      }
    },
    //验证验证码
    veryfyVerifyCode(){
      var _this=this;
      _this.blurArr[3]=true;
      if(_this.verifyCodeYz){
         _this.updataRemindTxt();
      }else{
        _this.updataRemindTxt("验证码不能为空");
      }
    },
    //验证邮箱
    veryfyEmial(){
      var _this=this;
      _this.blurArr[4]=true;
      if(_this.FEmailVerify){
        _this.updataRemindTxt();
        _this.IsExist(_this.FEmail,"邮箱","FEmailIsExist");
      }else{
        _this.updataRemindTxt("请输入正确的邮箱");
      }
    },
    //验证密码
    veryfyPwd(){
      this.blurArr[5]=true;
      if(this.FPassWordVerify){
        this.updataRemindTxt();
      }else{
        this.updataRemindTxt("请输入正确的密码");
      }
    },
    //登陆按钮点击
    register(){
      var _this=this;
      if(_this.FCompany.trim().length==0){
        _this.updataRemindTxt("请输入公司名称");
      }else if(_this.FNickName.trim().length==0){
         _this.updataRemindTxt("请输入姓名");
      }else if(!_this.FMobileVerify){
        _this.updataRemindTxt("请输入正确的手机号");
      }else if(!_this.verifyCodeYz){
         _this.updataRemindTxt("验证码不能为空");
      }else if(!_this.FEmailVerify){
        _this.updataRemindTxt("请输入正确的邮箱");
      }else if(_this.FEmailIsExist){
        _this.updataRemindTxt("该邮箱已注册,请更换");
      }else if(!_this.FPassWordVerify){
        _this.updataRemindTxt("请输入正确的密码");
      }else{
        tips({msg:"注册成功"})
      }
    }
  },
  watch:{
    FMobile(val){
      if((/^1(3|4|5|7|8)\d{9}$/.test(val))){
        this.FMobileVerify=true;
      }else{
        this.FMobileVerify=false;
      }
    },
    verifyCode(val){
      if(val.trim().length==0){//||md5(val).toLowerCase()!==this.backGetCode
        this.verifyCodeYz=false;
      }else{
        this.verifyCodeYz=true;
      }
    },
    FEmail(val){
      var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(emailReg.test(this.FEmail)){
        this.FEmailVerify=true;
      }else{
        this.FEmailVerify=false;
      }
    },
    FPassWord(val){
      if(this.FPassWord.trim().length<6){
        this.FPassWordVerify=false;
      }else{
        this.FPassWordVerify=true;
      }
    },
    birthDay2(val){
      console.log(val);
    }
  }
}
</script>

<style lang="less">
  @import '../assets/css/param.less';
  #register{
      width:100vw;height: 100vh;position:relative;font-size:14px;
      &::after{
          content: '';width:100%;height: 100%;position:absolute;top:0;left:0;background-image: url(../assets/image/reg_bg_web.jpg);background-size:100% 100%;opacity: 0.2;z-index: -1;
      }
      .border-red{
          border-color:red !important;
      }
      .user-reg-center{
          max-width:500px;height:100%;display: table;margin: 0 auto;
      }
      .user-reg-middle{
          width:100%;height:100%;display: table-cell;vertical-align: middle;
      }
      .reg-box{
          border-radius:8px;background: rgba(255,255,255,0.95);padding: 15px;position: relative;
      }
      .icon-box{
          width:100%;height:50px;background: url(../assets/image/logo.jpg) no-repeat;padding-left: 55px;color: #000;background-size:50px;
          p:first-child{
              font-size: 16px;font-weight:bold ;padding-top: 5px;
          }
      }
      .input-box{
          width:100%;padding: 0 20px;margin-top: 15px;
          h1{
              font-size: 28px;font-weight: 200;color: #000;width: 100%;text-align: center;margin-bottom: 5px;
          }
          &>input,.birthDay{
              width:100%;margin-top: 20px;
          }
          input{
              height: 40px;line-height: 40px;border-radius:20px ;text-indent: 15px;border: solid 1px #dddddd;outline: none;
          }
      }
      .mobile-box{
          margin-top: 20px;width:100%;
          input{
              width:calc(100% - 135px);
          }
          .get-code-btn{
              float:right;width:120px;height: 40px;line-height:40px;border-radius: 20px;border: solid 1px #dddddd;text-align: center;cursor: pointer;background-color:#3899ec;color:#fff;
          }
      }
      .remind-area{
          color:#ff6a6a ;width: 100%;text-align: center;line-height: 40px;height: 40px;position:relative;display:inline-block; vertical-align: middle;
      }
      .reg-btn{
          display: inline-block;width: 100%;height:40px;border-radius: 20px;line-height: 40px;text-align: center;background: #3899ec;color: #fff;cursor: pointer;
          &::active{
              background-color: #459FED;
          }
          &:hover{
              background: #4db4f1;
          }
      }
      .user-agree{
          font-size: 12px;margin-top: 20px;text-align: center;
          a{
              color:#3899ec;cursor: pointer;
          }
      }
      .channel{
          width:auto;white-space:nowrap;text-align: center;position: relative;margin-top:30px;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);
          .autho-code{
              display: inline;padding-left: 10px;
          }
      }
      .disabled{
          background-color: #eee !important;color: #71737b !important;
      }
      .disabled2{
          pointer-events: none !important;
      }
  }
  @media only screen and (max-width: 780px) {
      #register:after {
          background-image: none;
      }
      #register .user-reg-center{
          width:100%;
      }
      #register .input-box{
          padding: 0;
      }
      #register .input-box input,#register .mobile-box .get-code-btn,#register .reg-btn{
          border-radius: 5px;
      }
      #register .channel{
          white-space: normal;
      }
      #register .channel .autho-code{
          padding-left: 0;display: block;
      }
  }
</style>
