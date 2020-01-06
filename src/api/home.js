import fetch from 'utils/fetch'
// 1级菜单
export function getSearchList (data) {
  return fetch({
    url: '/getProteinInfo',
    method: 'post',
    params: data
  })
}
