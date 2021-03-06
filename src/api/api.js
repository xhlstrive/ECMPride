import fetch from 'utils/fetch'
// export function getSearchList (data) {
//   return fetch({
//     url: '/getProteinInfo',
//     method: 'post',
//     params: data
//   })
// }
export function getSearchList (data) {
  return fetch({
    url: `/getProteinInfo`,
    method: 'post',
    data
  })
}
export function getGoListCount (data) {
  return fetch({
    url: `/getGoListCount`,
    method: 'post',
    data
  })
}
export function getGoListData (data) {
  return fetch({
    url: `/getGoListData`,
    method: 'post',
    data
  })
}
export function getTissueDistribution (data) {
  return fetch({
    url: `/getTissueDistribution`,
    method: 'post',
    data
  })
}
/* browse 接口 */
export function getProteinListCount (data) {
  return fetch({
    url: `/getProteinListCount`,
    method: 'post',
    data
  })
}
export function getProteinListData (data) {
  return fetch({
    url: `/getProteinListData`,
    method: 'post',
    data
  })
}
export function downloadProteinData (data) {
  return fetch({
    url: `/downloadProteinData`,
    method: 'post',
    data
  })
}
