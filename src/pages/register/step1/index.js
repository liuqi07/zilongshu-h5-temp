import React from 'react'
import Helmet from 'react-helmet';
import { RegisterBanner } from 'components';
import { validatePhone } from 'libs/utils';
import { Link } from 'react-router-dom';
import http from 'libs/http';
import './index.scss'
class Register extends React.Component {
  state={
    // 手机号
    mobile:'',
    // mobile:'18612997104',
    // 手机号校验结果
    validateResult:false,
    // 错误信息
    errmsg:' '
  }
  // 发送图形验证码
  validMobile=async()=>{
    const {mobile} = this.state;
    // 校验手机号
    const result = validatePhone(mobile);
    if (result===true) {
      await http.get('/mstudent/common/validMobile',{mobile}).then((data)=>{
        if (data.data === true) {
          this.setState({
            errmsg:'此手机号已注册，直接去登录吧！',
            validateResult:false,
          })
        } else {
          this.setState({
            validateResult:true,
          })
        }
      }).catch((err)=>{
        // this.setState({
        //   errmsg:'此手机号已注册，直接去登录吧！',
        //   validateResult:false,
        // })
      })
    } else {
      this.setState({
        errmsg:result
      })
    }
  }
  // 点击立即注册进入下一步
  goNext=()=>{
    const {mobile,validateResult} = this.state;
    // 校验手机号
    const result = validatePhone(mobile);
    if (result===true) {
      http.get('/mstudent/common/validMobile',{mobile}).then((data)=>{
        if (data.data===true) {
          this.setState({
            errmsg:'此手机号已注册，直接去登录吧！',
            validateResult:false,
          })
        } else {
          this.setState({
            validateResult:true,
          },()=>{
            const path = {
              pathname:'/registerStep2',
              state:{mobile},
            }
            window.localStorage.setItem('registerphone',mobile);
            this.props.history.push(path);
          })
        }
      }).catch((err)=>{
        this.setState({
          errmsg:err.msg,
          validateResult:false,
        })
      })
    } else {
      this.setState({
        errmsg:result
      })
    }
  }
  phoneChange=(e)=>{
    this.setState({
      mobile:e.target.value,
      errmsg:'',
    })
  }
  componentDidMount(){
    window.localStorage.removeItem('registerphone')
    window.localStorage.removeItem('registerForm');
    // 用户已登录直接去首页
    http.getNoFb('/role/getRole').then((data)=>{
      console.log(data);
      if (data.code===1) {
        this.props.history.replace('/')
      }
    })
  }
  render() {
    const {mobile,errmsg} = this.state;
    return (
      <div className="register-step1">
        <Helmet title="子龍塾-注册"/>
        <RegisterBanner/>
        <div className="form">
            <input className="phoneNum" value={mobile} type="tel" maxLength="11" onBlur={this.validMobile} onChange={this.phoneChange} placeholder="请输入您的手机号"/>
            <p className="errmsg">{errmsg}</p>
            <input className="bigbtn" type="button" value="立即注册" onClick={this.goNext}/>
            {/* <input className="bigbtn disabled" disabled type="button" value="立即注册"/> */}
            <p className="notice">已有账号？请<Link to="/pwdlogin">登录</Link></p>
        </div>
      </div>
    )
  }
}

export default Register