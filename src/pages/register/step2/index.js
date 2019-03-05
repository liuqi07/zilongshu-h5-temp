import React from 'react'
import Helmet from 'react-helmet';
import { RegisterBanner,CheckBox,SuccessNotice,SendMessage,BigInput,ImageCode } from 'components';
import { validatePhone } from 'libs/utils';
import { Link } from 'react-router-dom';
import http from 'libs/http';
import './index.scss'
class Register extends React.Component {
  state={
    // 手机号
    mobilePhone:this.props.location.state ? this.props.location.state.mobile:window.localStorage.getItem('registerphone')||null,
    // 推荐人手机号
    recommendPhone:'',
    // 推荐人手机号
    recommendErrMsg:'',
    // 验证码图片
    validCodeImg:null,
    // 短信是否发送
    hasSendMsg:false,
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
    // 是否注册成功
    isSuccess:false,
    // 服务器端错误信息
    errmsg:'',
    // 是否同意条款
    agreeTerms:false,
    imgCodeOK:false,
    msgCodeOK:false,
    recommendOK:true,
  }
  // 获取图形验证码
  getImgCode=()=>{
    http.get(`/mstudent/getRegisterValidCode?id=${+new Date()}`).then((data)=>{
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
    const {imageCode,mobilePhone}=this.state;
    if (imageCode.trim().length!==4) {
      this.setState({
        imgErrorMsg:'验证码错误'
      })
    } else {
      http.post('/mstudent/sendSmsCode',{mobilePhone}).then((data)=>{
        this.setState({
          seconds: 120,
          hasSendMsg:true,
          isDisabled:true,
          mobilePhoneValidCodeFlag: true,
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
  //校验推荐人
  validateRecommend=()=>{
    const {recommendPhone}=this.state;
    if (recommendPhone.trim().length!==0) {
      const result = validatePhone(recommendPhone);
      if(result===true){
        this.setState({
          recommendOK:true
        })
      }else{
        this.setState({
          recommendErrMsg:result,
          recommendOK:false,
        })
      }
    } else {
      
    }
  }
  // 注册
  register=()=>{
    const {mobilePhone,imageCode,mobilePhoneCode,recommendPhone,agreeTerms,imgCodeOK,msgCodeOK,recommendOK,} = this.state;
    const params={
      imageCode,
      mobilePhone,
      mobilePhoneCode,
      recommendPhone,
    }
    if (agreeTerms && imgCodeOK && msgCodeOK && recommendOK) {
      http.post('/mstudent/register',params).then((data)=>{
        this.setState({
          isSuccess:true,
        })
        window.localStorage.removeItem('registerForm');
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
      if (!msgCodeOK) {
        this.validateMsgCode();
      } 
      if (!recommendOK) {
        this.validateRecommend();
      }
      if (!agreeTerms) {
        this.setState({
          errmsg:'请先阅读《在线课程条款》！',
        })
      }
    }
  }
  CheckboxChange=(ischecked)=>{
    this.setState({
      agreeTerms:ischecked,
    })
  }
  handleChange = (key,msg) => (e) => {
    e.preventDefault(); 
    this.setState({
      [key]: e.target.value,
      [msg]:'',
      errmsg:''
    });
  }
  saveForm=()=>{
    const {recommendPhone,imageCode,mobilePhoneCode,agreeTerms,} =this.state;
    window.localStorage.setItem('registerForm',JSON.stringify({
      recommendPhone,
      imageCode,
      mobilePhoneCode,
      agreeTerms,
    }))
  }
  componentDidMount(){
    if (this.state.mobilePhone===null) {
      this.props.history.replace('/registerStep1');
    } else {
      this.getImgCode();
      let registerForm = window.localStorage.getItem('registerForm');
      if (registerForm) {
        registerForm = JSON.parse(registerForm);
        const {recommendPhone,imageCode,mobilePhoneCode,agreeTerms,} = registerForm;
        this.setState({
          recommendPhone,
          imageCode,
          mobilePhoneCode,
          agreeTerms,
        },()=>{
          console.log(this.state)
        })
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  render() {
    const { mobilePhone,validCodeImg,imgErrorMsg,msgErrorMsg,hasSendMsg,isDisabled,imageCode,mobilePhoneCode,recommendPhone,isSuccess,recommendErrMsg,seconds,errmsg,agreeTerms } = this.state;
    return (
      <div className="register-step2">
        <Helmet title="子龍塾-注册"/>
        <SuccessNotice
          show={isSuccess}
          text="注册成功"
          btnTest="设置密码"
          link="/setpwd"
        />
        <RegisterBanner/>
        <div className="form">
          {hasSendMsg && <p className="register-msg">验证短信已发送到{mobilePhone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}</p>}
          <ImageCode
            placeholder="请输入图形验证码"
            errmsg={imgErrorMsg}
            transVal={imageCode}
            imgSrc={validCodeImg}
            changeCb={this.handleChange('imageCode','imgErrorMsg')}
            clickCb={this.getImgCode}
            blurCb={this.validateImgCode}
          />
          <SendMessage
             placeholder="请输入短信验证码"
             seconds={seconds}
             errmsg={msgErrorMsg}
             transVal={mobilePhoneCode}
             isDisabled={isDisabled}
             changeCb={this.handleChange('mobilePhoneCode','msgErrorMsg')}
            blurCb={this.validateMsgCode}
            clickCb={this.sendMsgCode}
          />
          <BigInput
            placeholder="请输入推荐人手机号（选填）"
            type="tel"
            transVal={recommendPhone}
            maxlength={11}
            errormsg={recommendErrMsg}
            changeCb={this.handleChange('recommendPhone','recommendErrMsg')}
            blurCb={this.validateRecommend}
          />
          <p className="notice">
              <CheckBox
                  label={ <React.Fragment>我已阅读并同意<Link onClick={this.saveForm} to="/registerAgreement">《用户服务协议》</Link></React.Fragment>}
                  ischecked={agreeTerms}
                  changeCb={this.CheckboxChange}
              />    
          </p>
          <p className="errmsg bigmsg">{errmsg}</p>
          <input className="bigbtn" type="button" onClick={this.register} value="提交"/>
        </div>
      </div>
    )
  }
}

export default Register