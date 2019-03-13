
import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import bnn from 'assets/images/home/img_banner.jpg'
import bnnBtn from 'assets/images/home/icon_button_mfst.png'
import bnn1 from 'assets/images/home/img_banner1.jpg'
import bnnBtn1 from 'assets/images/home/icon_button_mfst1.png'

export default class extends React.PureComponent {
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
    }
  state = {
    data: [
      { img: bnn, btn:bnnBtn, to: '#/index/free-course-list' },
      { img: bnn1,btn:bnnBtn1, to: '#/index/free-course-list' },
    ]
  }
  handleClick(it,e){

      e.stopPropagation();
      location.href=it.to;
  }
  render() {
    return (
      <WingBlank>
        <Carousel

          autoplay={true}
          infinite
          autoplayInterval={5000}
          dotStyle={{ width: '0.36rem', borderRadius:'0.16rem', height: '0.08rem',marginBottom: '0.266rem' }}
          dotActiveStyle={{ width: '0.36rem', backgroundColor:'#297cd5', borderRadius:'0.16rem',height: '0.08rem', marginBottom: '0.266rem' }}
        >
          {this.state.data.map(item => (
            <a
              key={item.img}
            //  href={item.to}
              style={{ display: 'inline-block', width: '100%', height: '4.3rem' }}
            >
              <img
                src={item.img}
                alt=""
                style={{width: '100%', height: '100%'}}
              />
                <img
                src={item.btn}
                onClick={this.handleClick.bind(this,item)}
                className="btn"
                />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}