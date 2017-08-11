
const snippits = [
  {
    id: 0,
    languageId: 0,
    code: 'var i = 1;',
    title: 'Declare some Variables'
  },
  {
    id: 4,
    languageId: 0,
    code: 'var x = 1 2 3 4 5 5 7;',
    title: 'Some other stuff'
  },
  {
    id: 1,
    languageId: 1,
    code: 'for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}',
    title: 'Lots of For Loops'
  },
  {
    id: 2,
    languageId: 1,
    code: 'for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}for (let i = 0; i < 10; i++){ \n  console.log(i);\n}}',
    title: 'Lots of For Loops'
  },
  {
    id: 3,
    languageId: 1,
    code: 'var i = 1;',
    title: 'Lots of For Loops'
  }
]

export default {
  async find({languageId}) {
    return snippits.filter(s => s.languageId === languageId)
  }
}
