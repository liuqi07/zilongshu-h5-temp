import React from 'react'

import "swiper/dist/css/swiper.min.css"
import Swiper from "swiper"
import "./index.scss"

import DONNAARIA from 'assets/images/course/DONNAARIA.png'
import MICHEILD from 'assets/images/course/MICHEIL.D.png'
import THERESA from 'assets/images/course/THERESA.P.png'


export default class extends React.PureComponent {
  state = {
    swiper: null,
    swiperId: null,
    data: [
      {  name: 'MICHEIL.D', country: 'BOSTON', desc: '20年儿童教育经验', img: MICHEILD, to: '/index/course' },
      {  name: 'DONNA ARIA', country: 'NEW YORK', desc: '20年小学英语教育', img: DONNAARIA, to: '/index/course' },
      {  name: 'THERESA. P', country: 'LONDON', desc: '儿童文学作家', img: THERESA, to: '/index/course' },
    ]
  }

  componentDidMount() {
    this.swiper = new Swiper(this.swiperId, {
      slidesPerView: 'auto',
      spaceBetween: 10,
    });
  }

  render() {
    return (
      <div className="team-of-experts-comp2" ref={self => this.swiperId = self}>
        <div className=" swiper-wrapper">
          {
            this.state.data.map((item, i) => (
              <div className="swiper-slide" key={i}>
                <div className="img"><img src={item.img}/></div>
                <p className="name">{item.name}</p>
                <p className="country">{item.country}</p>
                <div className="desc">{item.desc}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}