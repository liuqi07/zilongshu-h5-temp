import React, {Component} from 'react';
import './index.scss'
import {Toast} from 'antd-mobile'
import http from 'libs/http'
import ico_english from "assets/images/home/icon_label_EN.png"
import ico_math from "assets/images/home/icon_label_math.png"
import ico_program from "assets/images/home/icon_label_programme.png"

const statusText = {
  1: '立即预约',
  2: '预约中',
  3: '不可预约',
  4: '预约成功',
}
const statusClass = {
  1: 'pre',
  2: 'ing',
  3: 'unable',
  4: 'end',
}
const kindText = {
  'english': '英语',
  'math': '数学',
  'program': '编程',
}
const colorList = [
  {background: '#dceefd', color: '#297CD5'},
  {background: '#ffe2e2', color: '#E84342'},
  {background: '#fdebd9', color: '#FF8A02'},
]

class CourseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appointing:false
    }
  }

  makeAppointment() {
    if(this.state.appointing|| this.props.status>1){
      return ;
    }
    this.setState({appointing:true})
    http.post('/mstudent/business/appointment',{courseId:this.props.courseId+"sdsdsds"}).then(res=>{
      if(res.code===1){
        //  Toast.info('预约成功');
        this.props.MakeAppointment({courseId:this.props.courseId,status:2})
        return
      }
      this.setState({appointing:false})
      Toast.fail('预约失败');
    }).catch(e=>{
      this.props.MakeAppointment({courseId:this.props.courseId,status:2})
      this.setState({appointing:false})
    });
  }

  componentDidMount() {

  }

  render() {
    const {title, courseName, status, content, img, kind, courseId} = this.props;
    console.log(status)
    // const href = decodeURI(`/index/subscribe?courseId=${courseId}&courseName=${courseName}`)
    const href = `#/index/subscribe/${courseId}/${courseName}`
    let _kind = ''
    let icoImg = ''
    switch (kind) {
      case '英语':
        _kind = 'english'
        icoImg = ico_english
        break;
      case '数学':
        _kind = 'math'
        icoImg = ico_math
        break;
      case '编程':
        _kind = 'program'
        icoImg = ico_program
        break;
      default:
        _kind = 'english'
    }
    return (
      <div className="course-item">
        <div className="img"><img src={img} alt=""/><img className="tip" src={icoImg} alt=""/></div>
        <div className="discript">
          <p className="title">
            <strong>{title}</strong>
          </p>
          <div className="content">{content}</div>
          <p className="status">
            <a
              //  href={status===1 ? href : 'javascript:void(0);'}
              onClick={this.makeAppointment.bind(this)}
              className={statusClass[status]}>
              {statusText[status]}
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default CourseItem;