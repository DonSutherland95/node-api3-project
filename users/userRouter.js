const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/',validateUser, (req, res) => {
  

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

router.post('/:id/posts', validatePost, (req, res) => {
  
  const newPost = {...req.body, user_id:req.params.id}
  Posts.insert(newPost)
    .then(post =>{
      // console.log(req.body)
      res.status(201).json(post)
    })
    .catch(error=>{
      res.status(500).json({message:'cannot save'})
    })
});

router.get('/', (req, res) => {
  
  
  Users.get(req.query)
    .then(users=>{
      res.status(200).json(users)
      // console.log(users)
    })
    .catch(error=>{
      // console.log(error.message)
      res.status(500).json(error.message) 
    })
});

router.get('/:id',validateUserId, (req, res) => {
  
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

router.get('/:id/posts',validateUserId, validatePost, (req, res) => {

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
      res.status(500).json({errorMessage: error.message })
    })
});

router.delete('/:id',validateUserId, (req, res) => {
  
  const {id} = req.params
  Users.remove(id)
    .then(user=>{
      if(user > 0){
        res.status(200).json({ message: `user with id ${id} has been removed` });
      } else{
        res.status(404).json({message:'user could not be found'})
      }
    })
    .catch(error=>{
      res.status(500).json({errorMessage: error.message})
    })
});

router.put('/:id',validateUserId, (req, res) => {
  
  const {id} = req.params
  const changes = req.body;

  Users.update(id, changes)
    .then(user=>{
      if(user){
        res.status(200).json(user);
      } else{
        res.status(404).json({message:'user could not be found'})
      }
    })
    .catch(error=>{
      res.status(500).json({errorMessage: error.message})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params
  if(id <= 0){
    res.status(404).json({message:'user with that id not found'})
  } else {
    req.user = id;
    console.log(req.user)
    next()
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body.name){
    res.status(400).json({message: "missing user name"})
  } else{
    next()
  }
  
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message:'please fill out all fields'})
  } else if(!req.body.text) {
    res.status(400).json({message:'missing required text field'})
  } else{
    next();
  }
}

module.exports = router;
