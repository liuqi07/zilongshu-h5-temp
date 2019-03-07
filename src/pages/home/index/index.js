import React from 'react'
import Helmet from 'react-helmet'
import http from 'libs/http'
import Swiper from '../components/swiper/'
import {Link} from 'react-router-dom'
import {CourseItem, TeamOfExperts} from 'components'
import './index.scss'

import imgLimitDiscount from "../../../assets/images/home/limit-discount.png"

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      courseList: []
    }
  }

  componentDidMount() {
    this.getAuditionsCourseList()
  }

  // 获取试听课列表
  getAuditionsCourseList() {
    http.get('/mstudent/business/getAuditionsCourseListH5').then(res => {
      const data = res.data
      const courseList = []
      data.map(item => {
        courseList.push(...item.courses)
      })
      this.setState({courseList})
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
            <div className="item brown">
              <div className="head">
                <div className="name">龙编程初级A教程</div>
                <div className="des">《植物大战》系列</div>
                <div className="last"><span>15课时</span></div>
              </div>
              <div className="key">零基础编程录播课</div>
              <div className="values">
                <div className="l">108</div>
                <div className="r">立即购买</div>
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
                <div className="r"><a href="javascript:void(0)">立即购买</a></div>
              </div>
            </div>
          </div>
        </div>
        {/* 专家团队 */}
        <div className="team-of-experts">
          <div className="team-of-experts-header">专家团队</div>
          {/*  <TeamOfExperts />  */}
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