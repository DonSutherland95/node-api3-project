const express = require('express');
const Users = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!

  if(!req.body.name){
    res.status(400).json({ message: 'name required' })
  }
  Users.insert(req.body)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(error=>{
      res.status(500).json({message: 'error adding user'})
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  
});

router.get('/', (req, res) => {
  // do your magic!
  
  Users.get()
    .then(users=>{
      res.json(users)
      console.log(users)
    })
    .catch(error=>{
      console.log(error.message)
      res.json(error.message) 
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params
  Users.getById(id)
    .then(userId=>{
      if(userId){
        res.status(200).json(userId)
      } else{
        res.status(404).json({message:'The user with this id does not exist'})
      }
    })
    .catch(error=>{
      res.status(500).json({errorMessage: error.message})
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const {id} = req.params
  Users.getUserPosts(id)
    .then(post=>{
        if(post.length > 0){
          res.status(200).json(post)
        } else{
          res.status(404).json({message:'No posts for this user'})
        }
    })
    .catch(error=>{
      console.log(error.message)
      res.status(500).json({message: `Error in retrieving the posts for user ${id} `})
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
