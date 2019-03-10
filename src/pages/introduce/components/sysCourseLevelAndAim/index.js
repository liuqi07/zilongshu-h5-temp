import React from 'react'
import "swiper/dist/css/swiper.min.css"
import Swiper from "swiper"

import './index.scss'

import coursePrimary from 'assets/images/introduce/img_primary.png'
import courseIntermediate from 'assets/images/introduce/img_intermediate.png'
import courseUpgrade from 'assets/images/introduce/img_upg.png'
import courseHigh from 'assets/images/introduce/img_high.png'

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
      spaceBetween: 30,
    });
  }

  render() {
    return (
      <div className="course-aim sys"  ref={self => this.swiperId = self}>
        <div className=" swiper-wrapper">

          <div className="swiper-slide pri">
            <div className="img"><img src={coursePrimary}/></div>
            <div className="info">
              <div className="lead t">算法部分</div>
              <div className="desc d1">高斯数列\角谷猜想\猴子吃桃</div>
              <div className="lead t">教学目标</div>
              <div className="desc d2">掌握基本的运动、画图、计算、克隆、变
                量、列表、动画、简单循环与判断，流程、
                图的基本知识，制作简单游戏，和基本计
                算，学习解决问题的思路和逻辑方法。</div>
            </div>
          </div>

          <div className="swiper-slide imt">
            <div className="img"><img src={courseIntermediate}/></div>
            <div className="info">
              <div className="lead t">算法部分</div>
              <div className="desc d1">斐波那契序列\立体图形\鸡兔同笼奥数题 \最大公约数\最小公倍数</div>
              <div className="lead t">教学目标</div>
              <div className="desc d2">掌握基本的运动、画图、计算、克隆、变
                量、列表、动画、简单循环与判断，流程、
                图的基本知识，制作简单游戏，和基本计
                算，学习解决问题的思路和逻辑方法。</div>
            </div>
          </div>

          <div className="swiper-slide upg">
            <div className="img"><img src={courseUpgrade}/></div>
            <div className="info">
              <div className="lead t">算法部分</div>
              <div className="desc d1">二进制和十进制的互相转换\列表排序\递 归和阶乘的运算</div>
              <div className="lead t">教学目标</div>
              <div className="desc d2">掌握字符串、逻辑运算、复杂循环、多重 判断、流程图，达到完全掌握Scratch， 并可制作一般的程序，参加竞赛</div>
            </div>
          </div>
          <div className="swiper-slide hig">
            <div className="img"><img src={courseHigh}/></div>
            <div className="info">
              <div className="lead t">算法部分</div>
              <div className="desc d1">欧姆定律\直线方程\牛顿定律自由落体\黎 曼猜想\图灵机密码\分子运动</div>
              <div className="lead t">教学目标</div>
              <div className="desc d2">在编程中更多了解多学科知识，开阔视 野，拓宽思路。</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}