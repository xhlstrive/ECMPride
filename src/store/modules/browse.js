import {getProteinListCount, getProteinListData} from 'api/api'
const home = {
  state: {
  },
  mutations: {
  },
  actions: {
    getProteinListCount ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getProteinListCount(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res.count)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getProteinListData ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getProteinListData(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res.list)
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  }
}

export default home
