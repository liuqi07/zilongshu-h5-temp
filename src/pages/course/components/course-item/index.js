import React from 'react'
import './index.scss'
import icon1 from 'assets/images/course/icon1.png'
import icon2 from 'assets/images/course/icon2.png'
import icon3 from 'assets/images/course/icon3.png'
import icon4 from 'assets/images/course/icon4.png'
import * as util from 'libs/utils'

class CourseItem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log(this)
  }

  render() {
    const {
      courseData,
      toDailyChallenges, // 前往每日挑战
      beginClass, // 上课
      lookCourseBack, // 查看课程回放
      lookMaterial, // 查看课件
      uploadHomework,
      canUpload,
    } = this.props
    
    return (
      <div className="course-item-container">
        <div className="title">{courseData[0].dateStr} {courseData[0].weekStr}</div>
        {
          courseData.map((course, index) => {
            const { status, type } = course
            // const btnStr = type ? '已上完' : '上课'
            // const isEnable = type ? 'disable' : ( status ? 'enable' : 'disable' )
            // const canBeginClass = type ? false : ( status ? true : false )
            const btnStr = status ? '上课' : ( type ? '已上完' : '上课')
            const isEnable = status ? 'enable' : 'disable'
            const canBeginClass = status ? true : false
            const hash = util.generateUUID()
            
            return (
              <React.Fragment key={index} >
                <div className="course-detail">
                  <span className="course-time">{course.timeStr}</span>
                  <p className="course-name">
                    <span>{course.courseName}</span>
                    <span>Level{course.courseLevel} - Lesson{course.lessonNo}</span>
                  </p>
                  <div className="teacher-desc">
                    <div className="head">
                      <img src={course.headImage} />
                    </div>
                    <span>{course.teacherName}</span>
                  </div>
                </div>
                <div className="course-btn">
                  <span
                    className={`${isEnable} btn`}
                    onClick={canBeginClass ? beginClass(course.id) : ()=>{}}
                  >{btnStr}</span>
                </div>
                <div className="course-action">
                  <div onClick={lookMaterial(course.id)}>
                    <div className="img"><img className="icon1" src={icon1} /></div>
                    <span>课程资料</span>
                  </div>
                  <div onClick={lookCourseBack(course.id)}>
                    <div className="img"><img className="icon2" src={icon2} /></div>
                    <span>课程回放</span>
                  </div>
                  {course.platform !== 3 && <div onClick={toDailyChallenges(course.id)}>
                    <div className="img"><img className="icon3" src={icon3} /></div>
                    <span>每日挑战</span>
                  </div>}
                  <label htmlFor={`file-input-${hash}`}>
                    <div className="img"><img className="icon4" src={icon4} /></div>
                    <span>上传作业</span>
                    <input
                      style={{ display: 'none' }}
                      id={`file-input-${hash}`}
                      type="file" 
                      disabled={!canUpload}
                      accept="*"
                      onChange={uploadHomework(`file-input-${hash}`, course.id)}
                      // onChange={this.onChange(course.id)}
                      ref={ input => this.fileInputElement = input } 
                    />
                  </label>
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}

export default CourseItem