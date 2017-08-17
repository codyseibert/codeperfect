import api from './api'
const pickData = (r) => r.data

export default {
  async index(params) {
    return api().get('snippits', {params: params}).then(pickData)
  },

  async show(id) {
    return api().get(`snippits/${id}`).then(pickData)
  }
}
