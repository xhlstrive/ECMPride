import {paramToObj} from 'utils/index'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    status: '10000'
  },
  member: {
    roles: ['member'],
    token: 'member',
    introduction: '我是普通会员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal member',
    status: '10000'
  }
}

export default {
  loginByMockUserName: config => {
    return {
      status: '10000'
    }
  },
  getMockUserInfo: config => {
    const {token} = paramToObj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => {
    return {
      status: '10000'
    }
  }
}
