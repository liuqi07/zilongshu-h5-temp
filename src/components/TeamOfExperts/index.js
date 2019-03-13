import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import './index.scss'
import teacher1 from 'assets/images/course/teacher1.png'
import teacher2 from 'assets/images/course/teacher2.png'
import teacher3 from 'assets/images/course/teacher3.png'
import teacher4 from 'assets/images/course/teacher4.png'

export default class extends React.PureComponent {
  state = {
    data: [
      { active: '-active', name: 'ANTHONY ROBIN', country: 'LONDON', desc: '儿童文学专家', img: teacher1, to: '/index/course' },
      { active: '', name: 'DONNA ARIA', country: 'NEW YORK', desc: '20年+小学英语教育', img: teacher2, to: '/index/course' },
      { active: '', name: 'MICHEIL.D', country: 'BOSTON', desc: '20年+ 儿童教育', img: teacher3, to: '/index/course' },
      { active: '', name: 'THERESA. P', country: 'LONDON', desc: '儿童文学作家', img: teacher4, to: '/index/course' },
    ]
  }

  afterChange = index => {
    // const data = this.state.data
    // data.map((item, i) => {
    //   if(index === i) {
    //     item.active = '-active'
    //   }else{
    //     item.active = ''
    //   }
    // })
    // this.setState({
    //   slideIndex: index,
    //   data
    // })
  }

  beforeChange = (from, to) => {
    const data = this.state.data
    data.map((item, i) => {
      item.active = i === to ? '-active' : ''
    })
    this.setState({  data })
  }
  render() {
    const { data } = this.state
    return (
      <div className="team-of-experts-comp">
        <WingBlank>
          <Carousel className="space-carousel"
            frameOverflow="visible"
            cellSpacing={30}
            slideWidth={0.8}
            dots={false}
            autoplay
            infinite
            autoplayInterval={5000}
            swipeSpeed={2}
            beforeChange={this.beforeChange}
            afterChange={this.afterChange}
          >
            {data.map((item, index) => (
              <div className={`item-page`} key={index}>
                <div className="img"><img src={item.img} /></div>
                <p className="name">{item.name}</p>
                <p className="country">{item.country}</p>
                <p className="desc">{item.desc}</p>
              </div>
          ))}
          </Carousel>
        </WingBlank>
      </div>
    );
  }
}