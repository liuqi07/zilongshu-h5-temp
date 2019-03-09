import React from 'react'

import "swiper/dist/css/swiper.min.css"
import Swiper from "swiper"
import "./index.scss"
import teacher1 from 'assets/images/course/teacher.png'
import teacher2 from 'assets/images/course/teacher2.png'
import teacher3 from 'assets/images/course/teacher3.png'
import teacher4 from 'assets/images/course/teacher4.png'


export default class extends React.PureComponent {
  state = {
    swiper: null,
    swiperId: null,
    data: [
      { active: '-active', name: 'Anthony I.K', country: 'UK.LONDON', desc: '儿童文学专家', img: teacher1, to: '/index/course' },
      { active: '', name: 'DONNA ARIA', country: 'NEW YORK', desc: '20年+小学英语教育', img: teacher2, to: '/index/course' },
      { active: '', name: 'MICHEIL.D', country: 'BOSTON', desc: '20年+ 儿童教育', img: teacher3, to: '/index/course' },
      { active: '', name: 'THERESA. P', country: 'LONDON', desc: '儿童文学作家', img: teacher4, to: '/index/course' },
    ]
  }

  componentDidMount() {
    this.swiper = new Swiper(this.swiperId, {
      slidesPerView: 'auto',
      spaceBetween: 30,
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