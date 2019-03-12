import React from 'react'
import Helmet from 'react-helmet'
import http from 'libs/http'
import Swiper from '../components/swiper/'
import {Link} from 'react-router-dom'
import {CourseItem, TeamOfExperts2} from 'components'
import './index.scss'

import imgLimitDiscount from "assets/images/home/limit-discount.png"

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      courseList: [],
      coursePackageList: []
    }
  }

  componentDidMount() {
    this.getAuditionsCourseList()
    this.getCoursePackageList()
  }

  // 获取试听课列表
  getAuditionsCourseList() {
    http.get('/mstudent/business/getAuditionsCourseListH5').then(res => {
      const data = res.data;
      const courseList = [];
      data.map(item => {
        courseList.push(...item.courses)
      })
      this.setState({courseList})
    })
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
    const {courseList = []} = this.state
    return (
      <div className="home-container">
        <Helmet title="子龍塾-首页"/>
        <div className="swiper-container">
          <Swiper />
        </div>
        <div className="icon-nav">
          <Link to="/introduce/english"><span className="icon-english">龙英语</span></Link>
          <Link to="/introduce/math"><span className="icon-math">龙数学</span></Link>
          <Link to="/introduce/program"><span className="icon-program">龙编程</span></Link>
          <Link to="/"><span className="icon-guide">上课指南</span></Link>
        </div>
        <div className="free-course">
          <div className="free-course-header">
            <h1>免费试听课</h1>
            <Link to="/index/free-course-list"><span className="more">更多</span></Link>
          </div>
          <div className="free-course-content">
            {
              courseList.map(course =>
                <CourseItem
                  key={course.id}
                  title={course.name}
                  courseName={course.name}
                  status={course.subscribeStatus}
                  courseId={course.id}
                  kind={course.abbreviation}
                  content={course.courseDesc}
                  img={course.courseFile}
                />
              )
            }
          </div>
        </div>
        {/* 限时优惠 */}
        <div className="limit-discount">
          <div className="title"><img src={imgLimitDiscount} alt=""/></div>
          <div className="content">
            {
              this.state.coursePackageList.map((v, i) => {
                return (
                  <div className='item' key={i}>
                    <div className="head" style={{'backgroundImage':'url('+v.coursePackageImageUrl+' )'}}>
                     {/* <div className="name">{v.courseName}</div>
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
        {/* 专家团队 */}
        <div className="team-of-experts">
          <div className="team-of-experts-header">专家团队</div>
          <TeamOfExperts2 />
        </div>
        <div className="home-footer">
          <p>Copyright@2018 Zilongshu.com All Rights Reserved</p>
          <p>版权所有·子龙塾 京ICP备18024169号</p>
        </div>
      </div>
    )
  }
}

export default Home