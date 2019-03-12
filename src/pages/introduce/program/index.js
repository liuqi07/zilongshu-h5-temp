import React from 'react'
import Helmet from 'react-helmet'
import http from 'libs/http'

import './index.scss'
import imgTime from 'assets/images/introduce/img_time.png'
import imgMsg from 'assets/images/introduce/img_msg.png'
import imgPrinter from 'assets/images/introduce/img_printer.png'
import imgCpy from 'assets/images/introduce/img_cpy.png'
import imgLimitDiscount from "assets/images/home/limit-discount.png"
import boundary from 'assets/images/introduce/ico-boundary.png'
import masker from 'assets/images/introduce/img_man_mask.png'
import richors from 'assets/images/introduce/img_man_richor.png'
import videoPlay from "assets/images/introduce/video-play.png"
import videoPoster from "assets/images/introduce/video-poster.png"

import CourseLevelAndAim from '../components/sysCourseLevelAndAim'


export default class extends React.Component {
  constructor(){
    super();
    this.state = {
      videoUrl:"", // 录播课视频
      expandVideoUrl:'',  //提升视频
      coursePackageList:[]
    }
  }
  //获取视频地址
  getVideoUrl = (type) => {
    let code = type === 'expandVideo' ? 'BIAN_CHENG_TV1':'BIAN_CHENG_TV';
    http.get('/mstudent/common/getPublicByCode?code='+code)
      .then(res => {
        const videoUrl = res.data.TV_URL;
        if(type === 'expandVideo'){
          this.setState({ expandVideoUrl:videoUrl })
        }else{
          this.setState({ videoUrl })
        }
      })
  }
  componentDidMount() {
    this.getCoursePackageList()
  }
  //购买显示优惠
  buyDiscountCourse(i) {
    if(this.state.coursePackageList[i].buying){
      return ;
    }
    this.state.coursePackageList[i].buying = true;
    http.post('/mstudent/business/createOrder',{packageId:this.state.coursePackageList[i].packageId}).then(res=>{
      if(res.code === 1){
        window.localStorage.setItem("orderId",res.data);
        window.location.href="/wechat/static/#/mine/orderDetail";
        return ;
      }
      this.state.coursePackageList[i].buying = false;
    }).catch(e=>{
      this.state.coursePackageList[i].buying = false;
    })
  }

  // 获取限时优惠数据
  getCoursePackageList() {
    http.get('/mstudent/business/getCoursePackageList').then(res => {
      if (res.code === 1) {
        let coursePackageList = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].courseName === "编程") {
            coursePackageList = res.data[i].packages.slice(0, 2);
          }
        }
        this.setState({
          coursePackageList
        })
      }
    })
  }

  render() {
    const {  videoUrl,expandVideoUrl } = this.state
    return (
      <div className="long-program-container">

        <div className="expand-improve-box">
          <div className="e-l-t">
            <div className="title">拓展和提升逻辑思维能力</div>
            <div className="desc">通过学习编程，拓展和提升逻辑思维能力，培养和锻炼 解决问题的能力，有效促进各学科的同步提高。</div>
            <div className="audioPlayer">
              <img
                src={videoPoster}
                style={{ display: `${expandVideoUrl ? 'none' : 'block'}` }}
              />
              <img src={videoPlay} style={{'display':expandVideoUrl?'none':'block'}} onClick={this.getVideoUrl.bind(this,'expandVideo')} alt="" className="play"/>
              <video
                controlsList='nodownload'
                style={{ display: `${expandVideoUrl ? 'inline-block' : 'none'}` }}
                src={expandVideoUrl}
                controls
                autoPlay
              />
            </div>
            <div className="sub-txt">Scratch 编程语言由MIT 媒体实验室开发，至今已有上亿儿童 学习。美国超过50%的小学生学习Scratch。</div>
          </div>

        </div>

        <div className="courseLevel-teachAim">
          <div className="title">课程分级和教学目标</div>
          <CourseLevelAndAim />
        </div>

        <div className="teachSys">
          <div className="title">教学系统</div>
          <div className="sys-box">
            <div className="item">
              <div className="img"><img src={imgTime} alt=""/></div>
              <div className="big">录播+直播</div>
              <div className="big">固定学习时间</div>
            </div>
            <div className="item">
              <div className="img"><img src={imgPrinter} alt=""/></div>
              <div className="big">线下实践任务提交</div>
              <div className="big"></div>
            </div>
            <div className="item">
              <div className="img"><img src={imgMsg} alt=""/></div>
              <div className="big">教师在线答疑点评</div>
              <div className="big"></div>
            </div>
            <div className="item">
              <div className="img"><img src={imgCpy} alt=""/></div>
              <div className="big">优秀作品在线展示</div>
              <div className="big"></div>
            </div>
          </div>
        </div>

        <div className="limit-discount">
          <div className="title"><img src={imgLimitDiscount} alt=""/></div>
          <div className="content">
            {
              this.state.coursePackageList.map((v, i) => {
                return (
                  <div className='item' key={i}>
                    <div className="head" style={{'backgroundImage':'url('+v.coursePackageImageUrl+' )'}}>
                    {/*  <div className="name">{v.courseName}</div>
                      <div className="des">{v.courseDesc}</div>*/}
                      <div className="last"><span>{v.hours}课时</span></div>
                    </div>
                    <div className="key">{v.courseName}</div>
                    <div className="values">
                      <div className="l">
                        <div className="price"><span className="small">&yen;</span>{v.realAmt}</div>
                        <div className="pre"><span className="small">&yen;</span>{v.amt}</div>
                      </div>
                      <div className="r"><a className="buybtn" onClick={this.buyDiscountCourse.bind(this, i)}
                                            href="javascript:void(0)">立即购买</a></div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="model">
          <div className="title"><img src={boundary} alt=""/><span>编程录播课演示</span><img src={boundary} className="reverse" alt=""/></div>
          <div className="audioPlayer">
            <img
              src={videoPoster}

              style={{ display: `${videoUrl ? 'none' : 'block'}` }}
            />
            <img src={videoPlay} style={{'display':videoUrl ? 'none':'block'}}  onClick={this.getVideoUrl.bind(this,'video')} alt="" className="play"/>
            <video
              controlsList='nodownload'
              style={{ display: `${videoUrl ? 'inline-block' : 'none'}` }}
              src={videoUrl}
              controls
              autoPlay
            />
          </div>
        </div>
        <div className="model">
          <div className="title"><img src={boundary} alt=""/><span>他们从小学编程</span><img src={boundary} className="reverse" alt=""/></div>
          <div className="imgs">
            <div><img src={masker} alt=""/></div><div><img src={richors} alt=""/></div>
          </div>
        </div>
      </div>
    )
  }
}