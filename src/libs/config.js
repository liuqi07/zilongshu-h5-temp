import region from './address_cn';

//环境变量
const env = process.env.REACT_APP_ENV; //development test production

//地址配置(默认测试地址)
const urlConfig = {
  baseUrl: 'http://wxtest.zilongshu.com',
};

switch(env) {
  case 'development': 
    urlConfig.baseUrl = ''
    break;
  case 'test': 
    urlConfig.baseUrl = 'http://wxtest.zilongshu.com'
    break;
  case 'production':
    urlConfig.baseUrl = 'http://www.zilongshu.com'
    break;
  default: break;
};

export {
  urlConfig, //地址
  region, //省市信息
}