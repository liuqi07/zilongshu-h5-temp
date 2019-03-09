import React from 'react'
import {Carousel, WingBlank} from 'antd-mobile';
import './index.scss'
import enteacher from "assets/images/course/img_en_teacher.png"
import cnteacher from "assets/images/course/img_cn_teacher.png"

import cnhead from "assets/images/course/effective_teach_cn.png"
import enhead from "assets/images/course/effective_teach_en.png"

export default class extends React.PureComponent {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  state = {}

  handleClick(it, e) {
    console.log(it)
    e.stopPropagation()
  }

  render() {
    return (
      <WingBlank>
        <Carousel
          cellSpacing={30}
          frameOverflow="visible"
          autoplay={false}
          dotStyle={{width: '0.36rem', borderRadius: '0.16rem', height: '0.08rem', marginBottom: '0.48rem'}}
          dotActiveStyle={{
            width: '0.36rem',
            backgroundColor: '#297cd5',
            borderRadius: '0.16rem',
            height: '0.08rem',
            marginBottom: '0.48rem'
          }}
        >
          <div className="item">
            <div className="title">
              <img src={cnhead} alt=""/>
              <div>专属中教在线语法课</div>
            </div>
            <div className="info">
              <h3>龙英语语法课程以剑桥语法为基础</h3>
              <div className="desc">
                借鉴新加坡英语教学模式，结合龙英语教程内容，更适合中
                国小孩，保证学员听说读写能力同步提高。
              </div>
              <h3>资深中国教师固定授课</h3>
              <div className="desc">
                深度解析知识点，语法与写作能力高效提升。
              </div>
              <h3>“一对四”小班教学</h3>
              <div className="desc">
                每节课60分钟，师生深度互动，课后练习巩固知识点。
              </div>
            </div>
            <div className="course">
              <div className="title"><span>课时安排</span></div>
              <div className="tb">
                <div className="tr">
                  <div className="td1">外教课同步语法班</div>
                  <div className="td2">1课时/周</div>
                  <div className="td3">同步外教在线课程</div>
                </div>
                <div className="tr odd">
                  <div className="td1">Ket考前冲刺班</div>
                  <div className="td2">1课时/周</div>
                  <div className="td3">20课时/年</div>
                </div>
                <div className="tr">
                  <div className="td1">Pet考前冲刺班</div>
                  <div className="td2">1课时/周</div>
                  <div className="td3">40课时/年</div>
                </div>
              </div>
            </div>
          </div>
          <div className="item en">
            <div className="title">
              <img src={enhead} alt=""/>
              <div>专属英美外教在线英语课</div>
            </div>
            <div className="info">
              <h3>令人“大开眼界”的精彩教材</h3>
              <div className="desc">经典童话故事、精选国际知名刊物等；</div>
              <h3>专业，热情的专属英美教师授课</h3>
              <div className="desc">避免频繁更换教师降低学习效率。</div>
              <h3>“一对一、一对二”教学</h3>
              <div className="desc">每课时30分钟，降低教育支出，性价比更高。</div>
            </div>
            <div className="course">
              <div className="title"><span>课时安排</span></div>
              <div className="tb">
                <div className="tr odd">
                  <div className="td1">课程计划A</div>
                  <div className="td2">1课时/周</div>
                  <div className="td3">45课时/年</div>
                </div>
                <div className="tr ">
                  <div className="td1">课程计划B</div>
                  <div className="td2">2课时/周</div>
                  <div className="td3">90课时/年</div>
                </div>
                <div className="tr odd">
                  <div className="td1">课程计划C</div>
                  <div className="td2">3课时/周</div>
                  <div className="td3">135课时/年</div>
                </div>
                <div className="tr">
                  <div className="td1">课程计划D</div>
                  <div className="td2">4课时/周</div>
                  <div className="td3">180课时/年</div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </WingBlank>
    );
  }
}