import React from 'react'
import Helmet from 'react-helmet'
import http from 'libs/http'

import './index.scss'
import imgTime from 'assets/images/introduce/img_time.png'
import imgMsg from 'assets/images/introduce/img_msg.png'
import imgPrinter from 'assets/images/introduce/img_printer.png'
import imgCpy from 'assets/images/introduce/img_cpy.png'
import imgLimitDiscount from "../../../assets/images/home/limit-discount.png"
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
      videoUrl:""
    }
  }
  getVideoUrl = () => {
    http.get('/mstudent/common/getPublicByCode?code=ENGLISH_TV')
      .then(res => {
        const videoUrl = res.data.TV_URL
        this.setState({ videoUrl })
      })
  }

  render() {
    const {  videoUrl } = this.state
    return (
      <div className="long-program-container">

        <div className="expand-improve-box">
          <div className="e-l-t">
            <div className="title">拓展和提升逻辑思维能力</div>
            <div className="desc">通过学习编程，拓展和提升逻辑思维能力，培养和锻炼 解决问题的能力，有效促进各学科的同步提高。</div>
            <div className="audioPlayer">
              <img
                src={videoPoster}

                style={{ display: `${videoUrl ? 'none' : 'block'}` }}
              />
              <img src={videoPlay} onClick={this.getVideoUrl} alt="" className="play"/>
              <video
                controlsList='nodownload'
                style={{ display: `${videoUrl ? 'inline-block' : 'none'}` }}
                src={videoUrl}
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
            <div className="item brown">
              <div className="head">
                <div className="name">龙编程初级A教程</div>
                <div className="des">《植物大战》系列</div>
                <div className="last"><span>15课时</span></div>
              </div>
              <div className="key">零基础编程录播课</div>
              <div className="values">
                <div className="l">
                  <div className="price"><span className="small">&yen;</span>108</div>
                  <div className="pre"><span className="small">&yen;</span>288</div>
                </div>
                <div className="r"><a className="buybtn" href="javascript:void(0)">立即购买</a></div>
              </div>
            </div>

            <div className="item blue">
              <div className="head">
                <div className="name">龙编程初级、中级教程</div>
                <div className="des">《植物大战》系列《植物大战》系列《植物大战》系列《植物大战》系列《植物大战》系列《植物大战》系列</div>
                <div className="last"><span>15课时</span></div>
              </div>
              <div className="key">零基础编程录播课</div>
              <div className="values">
                <div className="l">
                  <div className="price"><span className="small">&yen;</span>108</div>
                  <div className="pre"><span className="small">&yen;</span>288</div>
                </div>
                <div className="r"><a className="buybtn" href="javascript:void(0)">立即购买</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className="model">
          <div className="title"><img src={boundary} alt=""/><span>编程录播课演示</span><img src={boundary} className="reverse" alt=""/></div>
          <div className="audioPlayer">
            <img
              src={videoPoster}

              style={{ display: `${videoUrl ? 'none' : 'block'}` }}
            />
            <img src={videoPlay}  onClick={this.getVideoUrl} alt="" className="play"/>
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