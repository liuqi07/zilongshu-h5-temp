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
        const {orderInfo,pay} = this.props;
        const {status,coursePackageName,picUrl,coursePackageNo,unitPrice,discountUnitPrice,orderPrice,allHour,createTime,orderNo,updateTime,refundTime,isDiscount} = orderInfo;
        return (
            <div className="orderItem">
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
                        <p>课时数：{allHour}</p>
                    </div>
                    <div className="right">
                        <strong>￥{unitPrice}</strong><br/><span><Close size={0.16}/>{allHour}</span>
                    </div>
                </div>
                <div className="orderDetail">
                    <div className="orderMoney">
                        {isDiscount>0 && <p className="prefer"><span>优惠金额</span><span>-￥{discountUnitPrice}<Close size={0.16}/><span className="allHour">{allHour}</span></span></p>}
                        <p className="payMoney"><span>实付款</span><strong>￥{orderPrice}</strong></p>
                    </div>
                    <div className="orderInfo">
                        <p><strong>订单信息</strong></p>
                        <p>订单编号：{orderNo}</p>
                        <p>下单时间：{createTime}</p>
                        {updateTime && <p>支付时间：{updateTime}</p>}
                        {refundTime && <p>退款时间：{refundTime}</p>}
                    </div>
                </div>
                {status===1 && <div className="orderBottom" style={{paddingBottom: '5rem'}}>
                    <p><button className="smBtn" onClick={(e)=>{e.preventDefault();pay()}}>去支付</button></p>  
                </div>}
            </div>
        );
    }
}

export default OrderItem;