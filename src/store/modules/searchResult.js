import {getSearchList, getGoListCount, getGoListData, getTissueDistribution} from 'api/api'
const searchResult = {
  state: {
  },
  mutations: {
  },
  actions: {
    getSearchList ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getSearchList(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res.proteinInfo)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getGoListCount ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getGoListCount(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res.count)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getGoListData ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getGoListData(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res.goInfos)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getTissueDistribution ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getTissueDistribution(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res.dataList)
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  }
}

export default searchResult
