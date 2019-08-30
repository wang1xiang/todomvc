let host = ''

// 内网mock
// host = 'http://192.168.2.30:8080/app/mock/18'
// 外网mock
host = 'http://14.29.70.194:8080/app/mock/35'
const tag = '/todomvc/'
let urls = {
  getAll: 'getAll',
  addUnComplete: 'addUnComplete',
  changeChecked: 'changeChecked'
}
addHost(urls, tag)
function addHost(urls, tag) {
  Object.keys(urls).forEach(key => {
    let value = urls[key]
    if (typeof value === 'string') {
      urls[key] = host + tag + value
    }
  })
}
export default urls
