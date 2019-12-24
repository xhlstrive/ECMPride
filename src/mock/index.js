import Mock from 'mockjs'
import loginAPI from './login'
// import remoteSearchAPI from './remoteSearch'
// import transactionAPI from './transaction'

// 登录
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByMockUserName)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getMockUserInfo)

/* // 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser) */

/* // 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList) */

export default Mock
