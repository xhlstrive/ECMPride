import fetch from 'utils/fetch'
// 1级菜单
export function getOrganism (data) {
  return fetch({
    url: '/odas/experiment/meta/organism',
    method: 'get',
    params: data
  })
}
