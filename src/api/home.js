import fetch from 'utils/fetch'
// 1级菜单
export function getFuzzyQueryOfUniprotId (data) {
  return fetch({
    url: `/getFuzzyQueryOfUniprotId`,
    method: 'post',
    data
  })
}
export function getFuzzyQueryOfGeneName (data) {
  return fetch({
    url: `/getFuzzyQueryOfGeneName`,
    method: 'post',
    data
  })
}
