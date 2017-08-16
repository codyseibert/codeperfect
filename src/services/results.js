
const results = [
  {"snippitId":0,"time":2,"cpm":300,"accuracy":100,"incorrect": 3, "correct":10,"typed":10,"total":10}
]

export default {
  findBySnippitId(id) {
    return results[id]
  },

  addResult (r) {
    const snippitId = r.snippitId;
    results[snippitId] = (results[snippitId] || []).concat(r);
  },

  async find(query) {
    return results.filter(s => {
      for (let [key, value] of Object.entries(query)) {
        if (s[key] === undefined || s[key] !== value) {
          return false;
        }
      }
      return true;
    })
  },

  async findBySnippitId(snippitId) {
    const results = await this.find({snippitId: snippitId});
    return results;
  }

}
