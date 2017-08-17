import api from './api'
const pickData = (r) => r.data

export default {
  async index(params) {
    return api().get('reports', {params: params}).then(pickData)
  },

  async post(report) {
    return api().post(`reports`, report).then(pickData)
  }
}
