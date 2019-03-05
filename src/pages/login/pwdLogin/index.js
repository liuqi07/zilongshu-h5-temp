import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import http from 'libs/http';
import { BigInput,ImageCode  } from 'components';
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
    // 密码
    password:'',
    // 密码错误提示
    passwordErrorMsg:'',
    // 服务端返回信息
    errmsg:'',
    // 手机号校验通过
    mobilePhoneOK:false,
    // 图形验证码校验通过
    imgCodeOK:false,
    // 密码校验通过
    passwordOK:false,
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
  //校验手机号
  validateMobilePhone=()=>{
    const {mobilePhone,mobilePhoneErrMsg}=this.state;
    const result = validatePhone(mobilePhone);
    if (result===true) {
      mobilePhoneErrMsg === '' && http.get('/mstudent/common/validMobile',{mobile:mobilePhone}).then((data)=>{
        if (data.data === true) {
          this.setState({
            mobilePhoneOK:true,
          })
        } else {
          this.setState({
            mobilePhoneErrMsg:'此手机号还没有注册',
          })
        }
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
      // console.log(data);
    //   this.setState({
    //     validCodeImg:data
    //   })
    // })
  }
  // 校验密码
  validatePassword=()=>{
    const {password}=this.state;
    if (password.trim().length!==0) {
      this.setState({
        passwordOK:true
      });
    } else {
      this.setState({
        passwordErrorMsg:'请输入密码',
      });
    }
  }
  // 登录
  login=()=>{
    const {mobilePhone,password,imageCode,mobilePhoneOK,imgCodeOK,passwordOK} = this.state;
    const params={
      mobileCode:'',
      mobilePhone,
      password:md5(password),
      // 登录方式(1-密码,0-手机验证码)
      type:1,
      validCode:imageCode
    }
    if (imgCodeOK && mobilePhoneOK && passwordOK) {
      http.post('/mstudent/login',params).then((data)=>{
        // console.log(data);
        if(this.props.location.search.includes('redirct')){
          this.props.history.push(this.props.location.search.split('redirct=')[1]);
        }else{
          this.props.history.push('/index/mine');
        }
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
      if (!passwordOK) {
        this.validatePassword();
      }
      // console.log(mobilePhoneOK,imgCodeOK,passwordOK);
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
    const { mobilePhoneErrMsg,validCodeImg,imgErrorMsg,passwordErrorMsg,errmsg,mobilePhone,imageCode,password} = this.state;
    return (
      <div className="login-container">
        <Helmet title="子龍塾-密码登录"/>
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
            transVal={imageCode}
            imgSrc={validCodeImg}
            changeCb={this.handleChange('imageCode','imgErrorMsg')}
            clickCb={this.getImgCode}
            blurCb={this.validateImgCode}
          />
          <BigInput
            placeholder="请输入密码"
            type="password"
            maxlength={30}
            errormsg={passwordErrorMsg}
            transVal={password}
            changeCb={this.handleChange('password','passwordErrorMsg')}
            blurCb={this.validatePassword}
          />
          <p className="errmsg bigmsg">{errmsg}</p>
          <p className="text-center"><input className="bigbtn" type="button" onClick={this.login} value="登录"/></p>
          <p className="flex-between">
            <Link to="/resetpwd" className="forgetpwd">忘记密码</Link>
            <Link to="/smslogin">短信登录</Link>
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
