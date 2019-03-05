import React from 'react'
import Helmet from 'react-helmet'
import http from 'libs/http'
import Swiper from '../components/swiper/'
import { Link } from 'react-router-dom'
import { CourseItem, TeamOfExperts } from 'components'
import './index.scss'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      courseList: []
    }
  }
  
  componentDidMount(){
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
      this.setState({ courseList })
    })
  }

  render() {
    const { courseList=[] } = this.state
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
        {/* 专家团队 */}
        <div className="team-of-experts">
          <div className="team-of-experts-header">专家团队</div>
          <TeamOfExperts />
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