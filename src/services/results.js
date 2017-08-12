
const results = {
  "0": [{"snippitId":0,"time":2,"cpm":300,"accuracy":100,"correct":10,"typed":10,"total":10}]

}

export default {
  findBySnippitId(id) {
    return results[id]
  },

  addResult (r) {
    console.log(JSON.stringify(r));
    const snippitId = r.snippitId;
    results[snippitId] = (results[snippitId] || []).concat(r);
  }
}
