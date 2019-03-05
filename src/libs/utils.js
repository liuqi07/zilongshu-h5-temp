//cookie相关操作
const cookie = {
  get: key => {
    let value = null;
    document.cookie.split('; ').forEach((item) => {
      const arr = item.split('=');
      if (arr[0] === key) {
        value = decodeURI(arr[1]);
      }
    });
    return value;
  },
  set: ({ key, value, expires, path }) => {
    document.cookie=`${key}=${value}; expires=${expires}; path=${path}`;
  },
  delete: key => {
    document.cookie=`${key}=; expires=Thu, 01 Jan 2000 00:00:00 GMT`;
  }
};

//文件大小, size单位是B
const fileSize = (size) => {
  if (size < 1024) {
    return `${size}B`;
  } else if (size < 1024 ** 2) {
    return `${(size / 1024).toFixed(0)}KB`;
  } else if (size < 1024 ** 3) {
    return `${(size / 1024 ** 2).toFixed(1)}MB`;
  } else {
    return `${(size / 1024 ** 3).toFixed(2)}GB`;
  }
}

// 获取地址栏参数
const  getQueryString = name => {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null) {
    return  unescape(r[2]);
  }
  return null;
}

// 格式化日期 YYYY-MM-DD hh:mm:ss
const formatDate = (fmt,date) => {
  date = new Date(date)
  var o = {
    // "Y+" : date.getFullYear(),
    "M+" : date.getMonth()+1,                 //月份   
    "D+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds(),            //毫秒   
    "W"  : date.getDay(),                     //星期
  };   
  if(/(Y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 

// 校验手机号
const validatePhone = (phone) => {
  if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(phone)) {
    return '请输入正确的11位手机号';
  } else {
    return true;
  }
}

const tabList = () => {
  return [
    { title: '全部课程', active: 'active', type: 'all' },
    { title: '英语' },
    { title: '数学' },
    { title: '编程' },
  ]
}

const introduceTabList = () => {
  return [
    { title: '英语', active: 'active', path: '/introduce/english',
      intro_title: '看多彩世界？先学英语！', intro_sub_title: 'see the world ? learn english first !', href: '/index/free-course-list' },
    { title: '数学', path: '/introduce/math',
      intro_title: '看多彩世界？先学数学！', intro_sub_title: 'see the world ? learn english first !', href: '/index/free-course-list' },
    { title: '编程', path: '/introduce/program',
      intro_title: '学习编程，在编程中学习！', intro_sub_title: 'Learn to code, code to learn', href: '/index/free-course-list' },
  ] 
}

const fillZero = num => {
  if(Number(num) === NaN) {
    return num
  }
  if(num > 9) {
    return num
  }else {
    return '0' + num
  }
}

const transformMonth = (month, abbr) => {
  month = Number(month)
  if(month === NaN) return month
  if(abbr){
    switch(month) {
      case 1: return 'Jan.'
      case 2: return 'Feb.'
      case 3: return 'Mar.'
      case 4: return 'Apr.'
      case 5: return 'May'
      case 6: return 'Jun.'
      case 7: return 'Jul.'
      case 8: return 'Aug.'
      case 9: return 'Sep.'
      case 10: return 'Oct.'
      case 11: return 'Nov.'
      case 12: return 'Dec.'
    }
  }else {
    switch(month) {
      case 1: return 'January'
      case 2: return 'February'
      case 3: return 'March'
      case 4: return 'April'
      case 5: return 'May'
      case 6: return 'June'
      case 7: return 'July'
      case 8: return 'August'
      case 9: return 'September'
      case 10: return 'October'
      case 11: return 'November'
      case 12: return 'December'
    }
  }
}

const getWeek = date => {
  const week = new Date(date).getDay()
  if(week === 0) return 7
  return week
}

const transformWeek = week => {
  switch(Number(week)) {
    case 1: return '周一'
    case 2: return '周二'
    case 3: return '周三'
    case 4: return '周四'
    case 5: return '周五'
    case 6: return '周六'
    case 7: return '周日'
  }
}

// 获取屏幕高度
const screenHeight = ()=>{
  const screenHeight = window.screen.height;
  const dpr = document.documentElement.getAttribute('data-dpr')||1;
  return `${screenHeight*dpr}px`;
}

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
  };

export { 
  cookie, 
  fileSize, 
  getQueryString, 
  formatDate,
  validatePhone,
  tabList,
  introduceTabList,
  fillZero,
  transformMonth,
  getWeek,
  transformWeek,
  screenHeight,
  generateUUID,
};
