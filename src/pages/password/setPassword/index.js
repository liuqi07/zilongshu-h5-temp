import React from 'react';
import Helmet from 'react-helmet';
import md5 from 'md5';
import http from 'libs/http';
import { BigInput  } from 'components';
import '../index.scss';

class Login extends React.Component {
  state={
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
    // 服务端返回错误信息
    errormsg:''
  }
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
  setPassword=()=>{
    const {password,passwordOK,passwordAgainOK} =this.state;
    const params = {
      password:md5(password)
    }
    if (passwordOK && passwordAgainOK) {
      http.post('/mstudent/resetPassword',params).then((data)=>{
        this.props.history.push('/index/mine');
      }).catch(error=>{
        this.setState({
          errmsg:error.msg
        })
      })
    } else {
      if (!passwordOK) {
        this.validatePassword();
      }
      if (!passwordAgainOK) {
        this.validatePasswordAgain();
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
    const {passwordErrMsg,passwordAgainErrMsg,errormsg,password,passwordAgain} = this.state;
    return (
      <div className="pwd-container">
        <Helmet title="子龍塾-设置密码"/>
        <div className="form">
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
          <p className="errmsg bigmsg">{errormsg}</p>
          <p className="text-center"><input className="bigbtn" onClick={this.setPassword} type="button" value="提交"/></p>
        </div>
      </div>
    );
  }
}

export default Login;
