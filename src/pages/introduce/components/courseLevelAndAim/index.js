import React from 'react'
import "swiper/dist/css/swiper.min.css"
import Swiper from "swiper"

import './index.scss'
import bas from  'assets/images/course/img_courseLevelAim__bas.png'
import pri from  'assets/images/course/img_courseLevelAim__pri.png'
import mid from  'assets/images/course/img_courseLevelAim__mid.png'
import hig from  'assets/images/course/img_courseLevelAim__hig.png'

export default class extends React.PureComponent {
  constructor() {
    super()

  }

  state = {
    swiperId:null
  }

  componentDidMount() {
    this.swiper = new Swiper(this.swiperId, {
      slidesPerView: 'auto',
      spaceBetween: 10,
    });
  }

  render() {
    return (
      <div className="course-aim en"  ref={self => this.swiperId = self}>
        <div className=" swiper-wrapper">

          <div className="swiper-slide bas">
            <div className="img"><img src={bas}/></div>
            <div className="info">
              <div className="lead t">口语</div>
              <div className="desc d1">字母、自然拼读、儿歌和经典童话寓言故事，卡通电影短视频</div>
              <div className="lead t">语法</div>
              <div className="desc d2">基本句型/名词/动词/冠词</div>
              <div className="lead t">目标</div>
              <div className="desc d3">掌握日常用语</div>
            </div>
          </div>

          <div className="swiper-slide pri">
            <div className="img"><img src={pri}/></div>
            <div className="info">
              <div className="lead t">口语</div>
              <div className="desc d1">经典童话寓言故事，国家地理kids知识读
                本，《看世界》和《世界新闻》系列，英
                语电影短视频
              </div>
              <div className="lead t">语法</div>
              <div className="desc d2">一般时态/进行时态/完成时态/被动语态</div>
              <div className="lead t">目标</div>
              <div className="desc d3">初步掌握英语的'说'和'听'，达到日常流利
                对话；并掌握几种基本语法，达到KET水
                平</div>
            </div>
          </div>

          <div className="swiper-slide mid">
            <div className="img"><img src={mid}/></div>
            <div className="info">
              <div className="lead t">口语</div>
              <div className="desc d1">《看世界》和《世界新闻》<br/>系列，英文电影短视频</div>
              <div className="lead t">语法</div>
              <div className="desc d2">虚拟语态/从句结构/分词/基本写作</div>
              <div className="lead t">目标</div>
              <div className="desc d3">完全掌握语法知识，达到PET水平</div>
            </div>
          </div>

          <div className="swiper-slide hig">
            <div className="img"><img src={hig}/></div>
            <div className="info">
              <div className="lead t">口语</div>
              <div className="desc d1">《看世界》和《世界新闻》系列，以及
                《SCIENTIFIC AMIRICAN》等材料</div>
              <div className="lead t">语法</div>
              <div className="desc d2">复合时态/写作</div>
              <div className="lead t">目标</div>
              <div className="desc d3">英语能力全面提升，达到FCE水平</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}