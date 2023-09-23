
const asyncWrap = require('../middleware/async')
const Query = require("../Models/Query")


const getQueries = asyncWrap(async (req, res) => {
  Query.find().then((response) => {
    return res.status(201).json({ response: response })
  }).catch((e) => {
    return res.status(404).json({ response: "NA" })
  })
})



const addQuery = asyncWrap(async (req, res) => {
  const { question, cat, approve, user } = req.body
  const check = await Query.findOne({ Question: question, Category: cat })
  if (check) {
    res.status(200).json({ code: 302, response: "Question Exists" })
  } else {
    const newQ = new Query({
      Question: question,
      CreatedBy: user,
      Category: cat,
      approved: approve,

    })
    await newQ.save().then(() => {
      res.status(201).json({ status: "sucessfull", response: "Created" })
    })
  }
})

const regExQuery = asyncWrap(async (req, res) => {
  const { query } = req.query;
  const searchWord = query;
  const searchRegex = new RegExp(searchWord, 'i');
  Query.find({ Question: searchRegex }).then((response) => {
    res.status(200).json({ response: response })

  }).catch((e) => {
    res.status(404).json({ response: "NA" })
  })
})


const catQuery= asyncWrap(async (req, res) => {
      const { catName } = req.query;
      Query.find({ Category: catName }).then((response) => {
        res. json({ response: response })
      }).catch((e) => {
        res.json({ response: "NA" })
      })

  })


module.exports = {
  addQuery,
  getQueries,
  regExQuery,
  catQuery
}
