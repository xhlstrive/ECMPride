
import { loginByuserName, getUserInfo, LogOut } from 'api/login'
import {getToken, removeUserInCache} from 'utils/cache'

const users = {
  state: {
    sliderBarState: true,
    diagramData: [],
    vennData: {},
    tableData: [],
    allNum: '',
    user: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  },
  mutations: {
    TOGGLE_SLIDERBARSTATE (state) {
      state.sliderBarState = !state.sliderBarState
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    }
  },
  actions: {
    toggleSliderBarState ({commit}) {
      commit('TOGGLE_SLIDERBARSTATE')
    },
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      console.log(userInfo)
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByuserName(username, userInfo.password).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject(new Error('error'))
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        LogOut(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeUserInCache()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeUserInCache()
        resolve()
      })
    }
  }
}
export default users
