import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import http from 'libs/http';
import { SendMessage,BigInput,ImageCode  } from 'components';
import { validatePhone } from 'libs/utils';
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
    // 服务端返回信息
    errmsg:'',
    // 手机号校验通过
    mobilePhoneOK:false,
    // 图形验证码校验通过
    imgCodeOK:false,
    // 短信验证码校验通过
    msgCodeOK:false,
  }
  componentDidMount(){
    http.getNoFb('/role/getRole').then((data)=>{
      console.log(data);
      if (data.code===1) {
        this.props.history.replace('/')
      }
    })
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
    http.get(`/mstudent/getLoginValidCode?id=${+new Date()}`).then((data)=>{
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
      http.post('/mstudent/sendLoginSmsCode',{mobilePhone}).then((data)=>{
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
  // 登录
  login=()=>{
    const {mobilePhone,mobilePhoneCode,imageCode,mobilePhoneOK,imgCodeOK,msgCodeOK} = this.state;
    const params={
      mobileCode:mobilePhoneCode,
      mobilePhone,
      password:'',
      // 登录方式(1-密码,0-手机验证码)
      type:0,
      validCode:imageCode
    }
    if (imgCodeOK && mobilePhoneOK && msgCodeOK) {
      http.post('/mstudent/login',params).then((data)=>{
        // console.log(data);
        this.props.history.push('/index/mine');
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
  render() {
    const { validCodeImg,imgErrorMsg,msgErrorMsg,mobilePhoneErrMsg,isDisabled,errmsg,seconds,mobilePhone,imageCode,mobilePhoneCode } = this.state;
    return (
      <div className="login-container">
        <Helmet title="子龍塾-短信登录"/>
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
          <p className="errmsg bigmsg">{errmsg}</p>
          <p className="text-center"><input className="bigbtn" type="button" value="登录" onClick={this.login} /></p>
          <p className="flex-between">
            <Link to="/resetpwd"></Link>
            <Link to="/pwdlogin">密码登录</Link>
          </p>  
          <p className="text-center">
            还没有账户？<Link to="/registerStep1">立即申请</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
