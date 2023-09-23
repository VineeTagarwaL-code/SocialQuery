
const asyncWrap = require('../middleware/async')
const Query = require("../Models/Query")


const getQueries = asyncWrap( async (req, res) => {
         Query.find().then((response) => {
            return res.status(201).json({ response: response })
        }).catch((e) => {
           return res.status(404).json({ response: "NA" })
        })
    })



const addQuery = asyncWrap( async (req, res) => {
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
          await  newQ.save().then(() => {
            res.status(201).json({ status: "sucessfull", response: "Created" })
            })
          }
        })

module.exports ={
  addQuery,
  getQueries
}
  