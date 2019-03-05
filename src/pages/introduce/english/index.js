import React from 'react'
import Helmet from 'react-helmet'
import TitleComp from '../components/title'
import { TeamOfExperts, CourseItem } from 'components'
import http from 'libs/http'
import descImg1 from '../../../assets/images/introduce/descImg1.png'
import descImg2 from '../../../assets/images/introduce/descImg2.png'
import defaultAudioImg from '../../../assets/images/introduce/defaultAudioImg.png'
import './index.scss'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      descData: [
        {
          showLen: 1,
          img: descImg1,
          list: [{
            title: '令人“大开眼界”的精彩教材',
            cont: '经典童话故事；《看世界》系列教程，精选国际知名刊物，《科学》、《Discovery》等，配以新闻短视频，学“现在的”英语。'
          }, {
            title: '专业、热情的英美教师固定授课',
            cont: '避免频繁更换教师降低学习效率。'
          }, {
            title: '“一对一、一对二”教学',
            cont: '每课时30分钟，降低教育支出，性价比更高。'
          }]
        }, {
          showLen: 1,
          img: descImg2,
          list: [{
            title: '龙英语语法课程以剑桥语法为基础',
            cont: '借鉴新加坡英语教学模式，结合龙英语教程内容，更适合中国小孩，保证学员听说读写能力同步提高。'
          }, {
            title: '资深中国英语教师授课',
            cont: '深度解析知识点，语法与写作能力高效提升。'
          }, {
            title: '“一对四”小班教学，每课时40分钟',
            cont: '师生深度互动，课后练习巩固知识点。'
          }]
        }
      ],
      levelData: [
        {
          color: '#4AA4D9',
          level: 'ABC/L0/L1',
          list: [{
            title: '口语',
            desc: '字母、自然拼读、儿歌和经典童话寓言故事，卡通电影短视频。'
          }, {
            title: '语法',
            desc: '基本句型/名词/动词/冠词'
          }, {
            title: '目标',
            desc: '掌握日常用语'
          }]
        },{
          color: '#FFAA3B',
          level: 'ABC/L2/L3/L4',
          list: [{
            title: '口语',
            desc: '经典童话寓言故事，国家地理kids知识读本，《看世界》和《世界新闻》系列，英语电影短视频。'
          }, {
            title: '语法',
            desc: '一般时态/进行时态/完成时态/被动语态'
          }, {
            title: '目标',
            desc: '初步掌握英语的\'说\'和\'听\'，达到日常流利对话；并掌握几种基本语法，达到KET水平'
          }]
        },{
          color: '#F57EA2',
          level: 'ABC/L5~L8',
          list: [{
            title: '口语',
            desc: '《看世界》和《世界新闻》系列，英文电影短视频。'
          }, {
            title: '语法',
            desc: '虚拟语态/从句结构/分词/基本写作'
          }, {
            title: '目标',
            desc: '完全掌握语法知识，达到PET水平'
          }]
        },{
          color: '#8E91E0',
          level: 'ABC/L9~L12',
          list: [{
            title: '口语',
            desc: '《看世界》和《世界新闻》系列，以及《SCIENTIFIC AMIRICAN》等材料。'
          }, {
            title: '语法',
            desc: '复合时态/写作'
          }, {
            title: '目标',
            desc: '英语能力全面提升，达到FCE水平'
          }]
        }
      ],
      currLevelIndex: 0,
      courseList: [],
      videoUrl: '',
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
      this.setState({ courseList })
    })
  }

  showMore = (descData, index) => () => {
    const showLen = descData[index].showLen
    descData[index].showLen = showLen === 1 ? descData[index].list.length : 1
    this.setState({ descData })
  }

  renderDesc = () => {
    const { descData } = this.state
    return descData.map((item, index) => (
      <div className="desc-item" key={index}>
        <img src={item.img} />
        <ul>
          {
            item.list.map((li, i) => {
              if(i >= item.showLen) return
              return (
                <li key={i}>
                  <p>{li.title}</p>
                  <span>{li.cont}</span>
                </li>
              )
            })
          }
        </ul>
        <div className="arrow" onClick={this.showMore(descData, index)}>
          <span className={`iconfont-zilongshu ${item.showLen ===1 ? 'icon-zilong-xiangxiazhanhang' : 'icon-zilong-xiangshangzhanhang'}`}></span>
        </div>
      </div>
    ))
  }

  renderTable = () => {
    return (
      <table className="l-eng-table">
        <tbody>
          <tr><td>课程计划A</td><td>每周1课时</td><td>48课时/年</td></tr>
          <tr><td>课程计划B</td><td>每周2课时</td><td>96课时/年</td></tr>
          <tr><td>课程计划C</td><td>每周3课时</td><td>144课时/年</td></tr>
          <tr><td>课程计划D</td><td>每周4课时</td><td>192课时/年</td></tr>
        </tbody>
      </table>
    )
  }

  handleTagClick = (e) => {
    const tagIndex = e.target.dataset.tagIndex
    if(isNaN(tagIndex)) { return }
    this.setState({ currLevelIndex: tagIndex })
  }

  renderLevel = () => {
    const { levelData, currLevelIndex } = this.state
    const currentLevelData = levelData[currLevelIndex]
    return (
      <React.Fragment>
        <div className="level-tags" onClick={this.handleTagClick}>
          <span data-tag-index={0} >
            入门级<em className={`${currLevelIndex==0 ? 'active' : ''}`} style={{borderColor: `${currentLevelData.color} transparent transparent transparent`}} ></em>
          </span>
          <span data-tag-index={1} >
            初级<em className={`${currLevelIndex==1 ? 'active' : ''}`} style={{borderColor: `${currentLevelData.color} transparent transparent transparent`}} ></em>
          </span>
          <span data-tag-index={2} >
            中级<em className={`${currLevelIndex==2 ? 'active' : ''}`} style={{borderColor: `${currentLevelData.color} transparent transparent transparent`}} ></em>
          </span>
          <span data-tag-index={3} >
            提高级<em className={`${currLevelIndex==3 ? 'active' : ''}`} style={{borderColor: `${currentLevelData.color} transparent transparent transparent`}} ></em>
          </span>
        </div>
        <div className="level-cont">
          <div className="level-bar">
            <p><span style={{width: `${(parseInt(currLevelIndex)+1) * 25}%`, background: currentLevelData.color}}></span></p>
            <p>{currentLevelData.level}</p>
          </div>
          <ul className="level-desc">
            {
              currentLevelData.list.map((li, i) => 
                <li key={i} style={{ color: currentLevelData.color }}>
                  <span>{li.title}</span><span>{li.desc}</span>
                </li>
              )
            }
          </ul>
        </div>
      </React.Fragment>
    )
  }

  getVideoUrl = () => {
    http.get('/mstudent/common/getPublicByCode?code=ENGLISH_TV')
    .then(res => {
      const videoUrl = res.data.TV_URL
      this.setState({ videoUrl })
    })
  }

  render() {
    const { courseList, videoUrl } = this.state
    return (
      <div className="long-english-container">
        <Helmet title="龙英语" />
        <div className="l-eng-cont">
          <TitleComp title="龙英语的教学理念" />
          <div className="l-eng-linian">
            <p>高效学习，少走弯路</p>
            <span>英美外教在线英语课 + 中教在线语法课</span>
            <span>英语能力全面提高</span>
            <div className="audioPlayer">
              <img
                src={defaultAudioImg}
                onClick={this.getVideoUrl}
                style={{ display: `${videoUrl ? 'none' : 'block'}` }}
              />
              <video
                style={{ display: `${videoUrl ? 'inline-block' : 'none'}` }}
                src={videoUrl}
                controls
                autoPlay
              />
            </div>
          </div>
          <TitleComp title="课程介绍" />
          <div className="l-eng-desc">
            {this.renderDesc()}
            <div className="l-eng-arrange">
              <p><span>课时安排</span><span className="through-line"></span></p>
              {this.renderTable()}
            </div>
          </div>
          <TitleComp title="教程分级与教学目标" />
          <div className="l-eng-level">
            {this.renderLevel()}
          </div>
          <TitleComp title="教学系统" />
          <div className="l-eng-system">
            <div className="sys-item">
              <p className="p1">教</p><span>语法、句型，知识点总结；短视频、“问与答” 帮助阅读</span>
            </div>
            <div className="sys-item">
              <p className="p2">学</p><span>卡通电影、趣味故事，30分钟积极互动</span>
            </div>
            <div className="sys-item">
              <p className="p3">练</p><span>每日课后英语挑战，来吧</span>
            </div>
            <div className="sys-item">
              <p className="p4">习</p><span>课前5分钟复习、单元阶段性复习，更高效</span>
            </div>
          </div>
          <TitleComp title="专家团队" />
          <div className="l-eng-experts">
            <TeamOfExperts />
          </div>
          <TitleComp title="免费试听课" />
          <div className="l-eng-class">
            {
              courseList.map(course => 
                <CourseItem
                  key={course.id}
                  title={course.name}
                  courseName={course.name}
                  status={course.subscribeStatus}
                  courseId={course.id}
                  kind={course.abbreviation}//'english'
                  content={course.courseDesc}
                  img={course.courseFile}
                  // handleClick={course.subscribeStatus===1 ? this.handleClickCourseItem(course.id) : ''}
                />
              )
            }
          </div>
        </div>
      </div>
    )
  }
}