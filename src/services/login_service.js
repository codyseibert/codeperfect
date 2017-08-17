import api from './api'
const pickData = (r) => r.data
export default {
  async post(info) {
    return api().post('login', info).then(pickData)
  }
}
