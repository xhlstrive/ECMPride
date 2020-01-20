import {getFuzzyQueryOfUniprotId, getFuzzyQueryOfGeneName, destroyFilterFile} from 'api/home'
const home = {
  state: {
    listData: [],
    searchType: ''
  },
  mutations: {
    SETLISTDATA (state, res) {
      state.listData = res
    },
    SETSEARCHTYPE (state, res) {
      state.searchType = res
    }
  },
  actions: {
    getFuzzyQueryOfUniprotId ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getFuzzyQueryOfUniprotId(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res.result)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getFuzzyQueryOfGeneName ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getFuzzyQueryOfGeneName(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res.result)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    destroyFilterFile ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        destroyFilterFile(data).then((res) => {
          // commit('SET_SEARCHLIST', res.proteinInfo)
          resolve(res)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    setListData ({commit}, data) {
      commit('SETLISTDATA', data)
    },
    setSearchType ({commit}, data) {
      commit('SETSEARCHTYPE', data)
    }
  }
}

export default home
