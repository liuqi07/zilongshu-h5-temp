import React, { Component } from 'react';
import { Close } from 'components';
import './index.scss'
const codeStatus=(status)=>{
    let returnObj={};
    // 状态(1, 未支付), (2, 已支付/未分配顾问), (3, 已支付/已分配顾问/未排课),(4, 上课中), (5, 退款中), (6, 退款完毕), (7, 已完结),(8, 退款人工处理)
    switch (status) {
        case 1:
            returnObj={
                class:'daifu',
                text:'待付款'
            }
            break;
        case 2:case 3:case 4:case 5:
            returnObj={
                class:'yifu',
                text:'已付款'
            }
            break;
        case 6:case 7:case 8:
            returnObj={
                class:'yitui',
                text:'已退款'
            }
            break;
        default:
            returnObj={
                class:'yitui',
                text:'已退款'
            }
            break;
    }
    return  returnObj;
}
class OrderItem extends Component {
    render() {
        const {clickCb,orderInfo,pay} = this.props;
        const {status,coursePackageName,picUrl,coursePackageNo,unitPrice,realUnitPrice,orderPrice,allHour,isDiscount} = orderInfo;
        console.log(status,'statusstatus');
        return (
            <div className="orderItem" onClick={clickCb}>
                <p className="orderTop">
                    <span className="orderName">{coursePackageName}</span>
                    <span className={`orderStatus ${codeStatus(status).class}`}>{codeStatus(status).text}</span>
                </p>
                <div className="orderMain">
                    <div className="left">
                        <div>
                            <div className="img" style={{backgroundImage:'url('+picUrl+')'}}></div>
                            <div className="classInfo">
                                课程编码: <br/>{coursePackageNo}   
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <strong className="midline">￥{unitPrice}</strong><strong className="normal">￥{realUnitPrice}</strong><br/><span><Close size={0.16}/>{allHour}</span>
                    </div>
                </div>
                <div className="orderBottom">
                    <div>
                        <p>合计：<strong>￥{orderPrice}</strong></p>
                        {status===1&&<p><button className="smBtn" onClick={(e)=>{e.stopPropagation();pay()}}>去支付</button></p>}    
                    </div> 
                </div>
            </div>
        );
    }
}

export default OrderItem;