import api from './api'
const pickData = (r) => r.data

export default {
  async index() {
    return api().get('languages').then(pickData)
  }
}
