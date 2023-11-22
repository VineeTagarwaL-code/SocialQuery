const asyncWrap = require("../middleware/async")
const Query = require("../Models/Query")

const like = asyncWrap(async (req, res) => {

      const { id, user } = req.body;
      const question = await Query.findOne({ _id: id }); // Use findOne to retrieve a single question by its _id
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      const userExistsInLikedBy = question.likedby.some((likedUser) => likedUser.username === user);
      if(userExistsInLikedBy){
        return res.json({status:2 , message:"Already Liked"})
      }else{
        const result = await Query.updateOne(
          { _id: id },
          { $inc: { like: 1 } },
        );
        // Perform any actions related to 'question' here
        question.likedby.push({username:user})
        question.save()
        if (result.nModified === 0) {
          return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Like processed successfully" });
      }
      
  })


  const addRemark=asyncWrap( async(req, res)=>{

    const { text, createdBy , id } = req.body;
    
    const query = await Query.findById(id)


    if(!query){
        return res.status(404).json({message : 'Query not found'})
    }
    await query.addRemark(text, createdBy);
    res.status(201).json({ message: 'Remark added successfully' });
  })

  module.exports = {
    like,
    addRemark
  }
  