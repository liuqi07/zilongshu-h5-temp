import React, { Component } from 'react';
import './index.scss'
const statusText={
    1:'立即预约 >>',
    2:'预约中',
    4:'预约成功',
}
const statusClass={
    1:'pre',
    2:'ing',
    4:'end',
}
const kindText={
    'english':'英语',
    'math':'数学',
    'program':'编程',
}
const colorList = [
    { background: '#dceefd', color: '#297CD5' },
    { background: '#ffe2e2', color: '#E84342' },
    { background: '#fdebd9', color: '#FF8A02' },
]

class CourseItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {

    }
    render() {
        const { title, courseName, status, content, img, kind, courseId } = this.props;
        console.log(status)
        // const href = decodeURI(`/index/subscribe?courseId=${courseId}&courseName=${courseName}`)
        const href = `#/index/subscribe/${courseId}/${courseName}`
        let _kind = ''
        switch(kind) {
            case '英语':
                _kind = 'english'
                break;
            case '数学':
                _kind = 'math'
                break;
            case '编程':
                _kind = 'program'
                break;
            default:
                _kind = 'english'
        }
        return (
            <div className="course-item">
               <div className="img"><img src={img} alt=""/></div>
               <div className="discript">
                    <p className="title">
                        <strong>{title}</strong>
                        <em className={_kind}>{kindText[_kind]}</em>
                    </p>
                    <div className="content">{content}</div>
                    <p className="status">
                        <a
                            href={status===1 ? href : 'javascript:void(0);'}
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