import React from "react"
import Helmet from "react-helmet"
import { Tabs } from "components"
import Calendar from "../components/calendar"
import CourseItem from "../components/course-item"
import Dialog from '../components/dialog'
import MediaPlayer from '../components/media-player'
import { NoData } from "components"
import * as util from "libs/utils"
import http from "libs/http"
import { Toast, Modal } from 'antd-mobile'
import "./index.scss"

const mockData = [
  {
    classificationName: "编程",
    courseTables: [
      {
        id: 17,
        status: false,
        type: false,
        teacherName: "Ke_Wei",
        courseName: "C一对一",
        classBeginTimeH5Str: "2019-02-05 08:00:00",
        lessonNo: 1,
      },
      {
        id: 18,
        status: false,
        type: true,
        teacherName: "Ke_Wei",
        courseName: "Java一对一",
        classBeginTimeH5Str: "2019-02-06 09:00:00",
        lessonNo: 1,
        week: 6,
        weekStr: "周六",
        dateStr: "02-09"
      },
      {
        id: 19,
        status: false,
        type: true,
        teacherName: "Ke_Wei",
        courseName: "Java一对一",
        classBeginTimeH5Str: "2019-02-06 10:00:00",
        lessonNo: 1,
      },
      {
        id: 20,
        status: false,
        type: true,
        teacherName: "Ke_Wei",
        courseName: "Java一对一",
        classBeginTimeH5Str: "2019-02-09 09:00:00",
        lessonNo: 1,
      }
    ]
  },
  {
    classificationName: "数学",
    courseTables: [
      {
        id: 21,
        status: false,
        type: false,
        teacherName: "Ke_Wei",
        courseName: "方程式一对一",
        classBeginTimeH5Str: "2019-02-09 08:30:00",
        lessonNo: 1,
        week: 6,
        weekStr: "周六",
        dateStr: "02-09"
      }
    ]
  }
]

class Course extends React.Component {
  constructor() {
    super()
    this.state = {
      tabs: util.tabList(),
      courseList: [],
      calendarList: [],
      currMonth: null,
      isShow: false,
      tabIndex: 0,
      dialogCont: '',
      mediaPlayIsShow: false,
      canUpload: true,
    }
  }

  componentDidMount() {
    this.getCourseList()
    // http.post('/mstudent/logOut')
  }

  // 切换tab
  changeTab = e => {
    const { tabs, tabIndex } = this.state
    const _tabIndex = e.target.dataset.tabIndex
    if (tabIndex == _tabIndex) {
      return
    }
    tabs.map((tab, index) => {
      tab.active = _tabIndex == index ? "active" : ""
    })
    this.setState(
      { tabs, courseList: [], tabIndex: _tabIndex },
      this.getCourseList
    )
  }

  // 获取完整的当前周
  genCalendarList = courseList => {
    if(courseList.length === 0) return {}
    let calendarList = [
      { week: 1, weekStr: "一", date: 2, hasCourse: false },
      { week: 2, weekStr: "二", date: 3, hasCourse: false },
      { week: 3, weekStr: "三", date: 4, hasCourse: false },
      { week: 4, weekStr: "四", date: 5, hasCourse: false },
      { week: 5, weekStr: "五", date: 6, hasCourse: false },
      { week: 6, weekStr: "六", date: 7, hasCourse: false, weekend: true },
      { week: 7, weekStr: "日", date: 8, hasCourse: false, weekend: true }
    ]

    const time = courseList[0].classBeginTimeH5Str
    const ww = util.getWeek(time)
    const currMonth = new Date(time).getMonth() + 1
    calendarList.map((item, i) => {
      item.date = util.fillZero(new Date(new Date(time).getTime() + (i + 1 - ww) * 1000 * 60 * 60 * 24).getDate())
    })
    const nowDay = util.getWeek(new Date())
    calendarList[nowDay-1].currentDay = true
    courseList.map(course => {
      const classBeginTimeH5Str = course.classBeginTimeH5Str
      const week = util.getWeek(classBeginTimeH5Str)
      course.week = week
      course.timeStr = util.formatDate('hh:mm', classBeginTimeH5Str)
      course.weekStr = util.transformWeek(week)
      course.dateStr = util.formatDate('MM-DD', classBeginTimeH5Str)
      calendarList[week - 1].hasCourse = true
    })
    return { calendarList, currMonth }
  }

  getCourseList = () => {
    const { tabIndex } = this.state
    http.get("/mstudent/business/getCourseTables").then(res => {
      const courseList = []
      const data = res.data
      // const data = mockData
      data.map((item, index) => {
        if(tabIndex == 0) {
          courseList.push(...item.courseTables)
        }else if(tabIndex == 1&& item.classificationName === '英语') {
          courseList.push(...item.courseTables)
        }else if(tabIndex == 2 && item.classificationName === '数学') {
          courseList.push(...item.courseTables)
        }else if(tabIndex == 3 && item.classificationName === '编程') {
          courseList.push(...item.courseTables)
        }
      })
      const { calendarList, currMonth } = this.genCalendarList(courseList)
      const courseListData = this.formatCourseItem([...courseList])

      this.setState({
        courseList,
        calendarList,
        currMonth,
        engMonth: util.transformMonth(currMonth),
        courseListData,
      })
    })
  }

  closeDialog = () => {
    this.setState({ isShow: false })
  }

  formatCourseItem = (courseList) => {
    courseList.sort((a, b) => (a['week'] - b['week']))
    const _courseList = {}
    courseList.map(course => {
      const temp = _courseList[course.week]
      _courseList[course.week] = temp && [..._courseList[course.week], course] || [course]
    })
    return _courseList
  }

  // 上课
  beginClass = tableId => () => {
    http.post('/mstudent/business/classBegin', { tableId })
    .then(res => {
      const data = res.data || {}
      // zoom
      if(data.platform === 2){
        Modal.alert('提示', '是否进入课堂？', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确定', onPress: () =>{ window.open(data.url) } }
        ])
      }
      // 百家云 已废弃
      else if(data.platform === 1){
        const token = res.data.token || ''
        const url = 'http://www.zilongshu.com/baijiayun/index.html?token='+token
        token && window.open(url) || message.error('token生成失败，请刷新重试！')
      }
      // 录播课
      else if(data.platform === 3){
        this.setState({ videoUrl: data.tvUrl, mediaPlayIsShow: true, videoTitle: data.courseName })
      }
    })
    .catch(err => {
      console.log('上课 ==> error', err)
      this.setState({ isShow: true, dialogCont: err.msg })
      Toast.hide()
    })
  }

  // 前往每日挑战
  toDailyChallenges = tableId => () => {
    http.post('/mstudent/business/createExam', { tableId })
    .then(res => {
      const { examId, questionSize } = res.data
      this.props.history.push(`/index/daily-challenges/${examId}/${questionSize}`)
    })
    .catch(err => {
      console.log('前往每日挑战 ==> error', err)
      this.setState({ isShow: true, dialogCont: err.msg })
      Toast.hide()
    })
  }

  // 查看课程回放
  lookCourseBack = tableId => () => {
    http.get('/mstudent/business/lookCourseBack', { tableId })
    .then(res => {
      console.log('/mstudent/business/lookCourseBack', res)
      // const courseBackUrl = 'http://zilong-bucket.oss-cn-beijing.aliyuncs.com/zilong/pic/PUBLIC_INFO_ENGLISH_TV2019-01-13/1547349126703.mp4?Expires=1549946507&OSSAccessKeyId=LTAILu6zWD5eG2SO&Signature=xGvH%2BEhU%2FRZim2k9tCfqK6fmUYI%3D'
      const courseBackUrl = res.data.courseBackUrl
      this.setState({ courseBackUrl, mediaPlayIsShow: true })
    })
    .catch(err => {
      console.log('查看课程回放 ==> error', err)
      this.setState({ isShow: true, dialogCont: err.msg })
      Toast.hide()
    })
  }

  // 查看课件
  lookMaterial = tableId => () => {
    http.get('/mstudent/business/lookMaterial', { tableId })
    .then(res => {
      window.open(res.data)
    })
    .catch(err => {
      // let winRef = window.open("", "_blank")
      // setTimeout(() => {
      //   winRef.location = 'http://static.liulehe.com/p.pdf'//res.data
      // }, 1800);
      this.setState({ isShow: true, dialogCont: err.msg })
      Toast.hide()
    })
  }

  // 上传作业
  uploadHomework = (fileInputId, tableId) => () => {
    // FormData 对象
    let form = new FormData();
    const fileInput = document.getElementById(fileInputId)
    // 流数据
    form.append('file', fileInput.files[0]);
    http.upload(`/mstudent/business/uploadCourseTask?tableId=${tableId}`, 
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then(res => {
      this.setState({ canUpload:true })
      Toast.success('上传成功！', 3)
    })
  }

  closeMediaPlayer = () => {
    this.setState({ mediaPlayIsShow: false, courseBackUrl: '' })
  }

  render() {
    const {
      tabs, courseList, courseListData, calendarList, currMonth, engMonth,
      isShow, dialogCont, courseBackUrl, mediaPlayIsShow, canUpload } = this.state

    return (
      <div className="course-container">
        <Helmet title="子龍塾-上课" />
        <Dialog
          isShow={isShow}
          cont={dialogCont}
          closeDialog={()=>{this.setState({ isShow: false })}}
        />
        <MediaPlayer
          videoUrl={courseBackUrl}
          show={mediaPlayIsShow}
          title="课程回放"
          onClose={this.closeMediaPlayer}
        />
        <Tabs tabs={tabs} changeTab={this.changeTab} />
        {courseList.length === 0 ? (
          <NoData tip="还没有课程哦" />
        ) : (
          <React.Fragment>
            <div className="calendar">
              <Calendar
                calendarList={calendarList}
                currMonth={currMonth}
                engMonth={engMonth}
              />
            </div>
            <div className="course-wrap">
              {
                Object.keys(courseListData).map(key => 
                  <div className="course-detail-item" key={key}>
                    <CourseItem
                      courseData={courseListData[key]}
                      toDailyChallenges={this.toDailyChallenges}
                      beginClass={this.beginClass}
                      createExam={this.createExam}
                      lookCourseBack={this.lookCourseBack}
                      lookMaterial={this.lookMaterial}
                      uploadHomework={this.uploadHomework}
                      fileInputElement={el => this.fileInputElement = el}
                      canUpload={canUpload}
                    />
                  </div>
                )
              }
              {/* <div className="course-detail-item">
                <CourseItem courseList={courseList} toDailyChallenges={()=>{history.push('/index/daily-challenges')}} />
              </div> */}
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default Course
