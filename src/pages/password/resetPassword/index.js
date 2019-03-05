import React from 'react';
import Helmet from 'react-helmet';
import md5 from 'md5';
import http from 'libs/http';
import { validatePhone } from 'libs/utils';
import { SendMessage,BigInput,SuccessNotice,ImageCode  } from 'components';
import '../index.scss';

class Login extends React.Component {
  state={
    // 手机号
    mobilePhone:'',
    // 手机号错误提示
    mobilePhoneErrMsg:'',
    // 验证码图片
    validCodeImg:null,
    // 图片验证码
    imageCode:'',
    // 图片验证码错误提示
    imgErrorMsg:'',
    // 短信验证码
    mobilePhoneCode:'',
    // 倒计时
    seconds:'发送验证码',
    // 短信验证码错误提示
    msgErrorMsg:'',
    // 发送短信按钮不可点击
    isDisabled:false,
    // 密码
    password:'',
    // 密码错误提示
    passwordErrMsg:'',
    // 密码校验通过
    passwordOK:false,
    // 再次密码
    passwordAgain:'',
    // 再次密码错误提示
    passwordAgainErrMsg:'',
    // 再次密码校验通过
    passwordAgainOK:false,
    // 服务端返回信息
    errmsg:'',
    // 手机号校验通过
    mobilePhoneOK:false,
    // 图形验证码校验通过
    imgCodeOK:false,
    // 短信验证码校验通过
    msgCodeOK:false,
    // 是否重置成功
    isSuccess:false,
  }
  componentDidMount(){
    this.getImgCode();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  //校验手机号
  validateMobilePhone=()=>{
    const {mobilePhone}=this.state;
    const result = validatePhone(mobilePhone);
    if (result===true) {
      http.get('/mstudent/common/validMobile',{mobile:mobilePhone}).then((data)=>{
        if (data.data === true) {
          this.setState({
            mobilePhoneOK:true,
          })
        } else {
          this.setState({
            mobilePhoneErrMsg:'此手机号还没有注册',
          })
        }
        // this.setState({
        //   mobilePhoneErrMsg:'此手机号还没有注册',
        // })
      }).catch((err)=>{
        // this.setState({
        //   mobilePhoneOK:true,
        // })
      })
    } else {
      this.setState({
        mobilePhoneErrMsg:result
      })
    }
  }
  // 获取图形验证码
  getImgCode=()=>{
    http.get(`/mstudent/getForgetValidCode?id=${+new Date()}`).then((data)=>{
      // console.log(data);
      this.setState({
        validCodeImg:data.data
      })
    })
  }
  // 校验图形验证码
  validateImgCode=()=>{
    const {imageCode}=this.state;
    if (imageCode.trim().length!==4) {
      this.setState({
        imgErrorMsg:'验证码错误'
      });
    } else {
      this.setState({
        imgCodeOK:true
      });
    }
    // http.get(`/mstudent/getRegisterValidCode?id=${+new Date()}`).then((data)=>{
    //   // console.log(data);
    //   this.setState({
    //     validCodeImg:data
    //   })
    // })
  }
  // 发送短信验证码
  sendMsgCode=()=>{
    const {mobilePhone,mobilePhoneOK,imgCodeOK}=this.state;
    if (mobilePhoneOK&&imgCodeOK) {
      http.post('/mstudent/sendForgetPasswordSmsCode',{mobilePhone}).then((data)=>{
        this.setState({
          seconds: 120,
          hasSendMsg:true,
          isDisabled:true,
        }, () => {
          this.timer = setInterval(() => {
            if (this.state.seconds === 0) {
              this.setState({
                seconds: '重新获取',
                isDisabled:false,
              });
              clearInterval(this.timer);
              this.timer = null;
              return;
            }
            this.setState(prevState => ({ seconds: prevState.seconds - 1 }));
          }, 1000);
        });
      }).catch(error=>{
        this.setState({
          msgErrorMsg:error.msg
        })
      })
    } else {
      if (!mobilePhoneOK) {
        this.validateMobilePhone()
      }
      if (!imgCodeOK) {
        this.validateImgCode();
      }
    }
  }
  // 校验短信验证码
  validateMsgCode=()=>{
    const {mobilePhoneCode}=this.state;
    if (/\d{6}/.test(mobilePhoneCode)) {
      this.setState({
        msgCodeOK:true
      })
    } else {
      this.setState({
        msgErrorMsg:'验证码错误',
        msgCodeOK:false,
      })
    }
  }
  // 校验新密码
  validatePassword=()=>{
    const {password} =this.state;
    if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,30}$/.test(password)) {
      this.setState({
        passwordOK:true
      })
    } else {
      this.setState({
        passwordErrMsg:'密码应为6-30位数字字母组合'
      })
    }
  }
  // 校验再次新密码
  validatePasswordAgain=()=>{
    const {password,passwordAgain} =this.state;
    if (password===passwordAgain) {
      if (passwordAgain.trim().length===0) {
        this.setState({
          passwordAgainErrMsg:'请先输入密码'
        })
      }else{
        this.setState({
          passwordAgainOK:true
        })
      }
    } else {
      this.setState({
        passwordAgainErrMsg:'两次输入密码不一致'
      })
    }
  }
  handleChange = (key,msg) => (e) => {
    e.preventDefault(); 
    this.setState({
      [key]: e.target.value,
      [msg]:'',
      errmsg:'',
    });
  }
  resetPassword=()=>{
    const {mobilePhone,mobilePhoneCode,imageCode,password,mobilePhoneOK,imgCodeOK,msgCodeOK,passwordOK,passwordAgainOK} = this.state;
    const params={
      smsCode:mobilePhoneCode,
      mobilePhone,
      password:md5(password),
      validCode:imageCode
    }
    if (mobilePhoneOK && imgCodeOK && msgCodeOK && passwordOK && passwordAgainOK) {
      http.post('/mstudent/saveNewPassword',params).then((data)=>{
        this.setState({
          isSuccess:true
        })
        // this.props.history.push('/index/mine');
      }).catch(error=>{
        this.setState({
          errmsg:error.msg
        },()=>{
          if (error.msg.includes('图')) {
            this.getImgCode();
          }
        })
      })
    }else{
      if (!imgCodeOK) {
        this.validateImgCode();
      } 
      if (!mobilePhoneOK) {
        this.validateMobilePhone();
      } 
      if (!msgCodeOK) {
        this.validateMsgCode();
      }
      if (!passwordOK) {
        this.validatePassword();
      }
      if (!passwordAgainOK) {
        this.validatePasswordAgain();
      }
    }
  }
  render() {
    const { validCodeImg,imgErrorMsg,msgErrorMsg,mobilePhoneErrMsg,isDisabled,passwordErrMsg,passwordAgainErrMsg,errmsg,seconds,isSuccess,mobilePhone,imageCode,mobilePhoneCode,password,passwordAgain } = this.state;
    return (
      <div className="pwd-container">
        <Helmet title="子龍塾-重置密码"/>
        <SuccessNotice
          show={isSuccess}
          text="密码重置成功"
          btnTest="我知道啦"
          link="/index/mine"
        />
        <div className="form">
          <BigInput
            placeholder="请输入手机号"
            type="tel"
            maxlength={11}
            errormsg={mobilePhoneErrMsg}
            transVal={mobilePhone}
            changeCb={this.handleChange('mobilePhone','mobilePhoneErrMsg')}
            blurCb={this.validateMobilePhone}
          />
          <ImageCode
            placeholder="请输入图形验证码"
            errmsg={imgErrorMsg}
            imgSrc={validCodeImg}
            transVal={imageCode}
            changeCb={this.handleChange('imageCode','imgErrorMsg')}
            clickCb={this.getImgCode}
            blurCb={this.validateImgCode}
          />
          <SendMessage
            placeholder="请输入短信验证码"
            seconds={seconds}
            errmsg={msgErrorMsg}
            isDisabled={isDisabled}
            transVal={mobilePhoneCode}
            changeCb={this.handleChange('mobilePhoneCode','msgErrorMsg')}
            blurCb={this.validateMsgCode}
            clickCb={this.sendMsgCode}
          />
          <BigInput
            placeholder="请输入登录密码"
            type="password"
            maxlength={30}
            errormsg={passwordErrMsg}
            transVal={password}
            changeCb={this.handleChange('password','passwordErrMsg')}
            blurCb={this.validatePassword}
          />
          <BigInput
            placeholder="请再次输入登录密码"
            type="password"
            maxlength={30}
            errormsg={passwordAgainErrMsg}
            transVal={passwordAgain}
            changeCb={this.handleChange('passwordAgain','passwordAgainErrMsg')}
            blurCb={this.validatePasswordAgain}
          />
          <p className="errmsg bigmsg">{errmsg}</p>
          <p className="text-center"><input className="bigbtn" type="button" value="提交" onClick={this.resetPassword}/></p>
        </div>
      </div>
    );
  }
}

export default Login;
