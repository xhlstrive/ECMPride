import { Message } from 'element-ui'

export default function handleError (res) {
  if (res.status === 'error') {
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    })
  }
  return new Promise(() => {})
}
