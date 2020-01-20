import {getProteinListCount, getProteinListData, downloadProteinData} from 'api/api'
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
    },
    downloadProteinData ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        downloadProteinData(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res)
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  }
}

export default home
