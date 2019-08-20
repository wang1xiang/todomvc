import axios from 'axios'

async function fetch (url, data) {
  let res = await axios.post(url, data)
  return res
  // todo: 统一业务处理
}

export default fetch
