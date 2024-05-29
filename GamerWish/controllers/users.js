const User = require('../models/user')
const Game = require('../models/game')
const { trusted } = require('mongoose')
//since its written over and over i make it function (dry ^_^)
const errorsCatch = (err, res) => {
  console.error(err)
  res.status(500).json({ message: 'Error occurred' })
}
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user._id

    if (!userId) {
      return false
    }

    const user = await User.findById(userId)

    if (user && user.userType === 'admin') return true
  } catch (err) {
    console.error(err)
    return false
  }
}

async function edit(req, res) {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.render(`edit`, { user })
  } catch (err) {
    errorsCatch(err, res)
  }
}

async function update(req, res) {
  try {
    console.log('Update...')
    /* 
  
  logic:
  1)pull the id from the paramter
  2)save it  in a variable
  3)pull the name and email from the form
  4)trim both to avoid userErrors
  5)findByIdAndUpdate
  6)render to the users/id page and reflect the changes on the database
  
  */
    const userId = req.params.id
    const updates = req.body //take the infromation from form
    const userName = updates.userName
    const email = updates.email
    userName.trim()
    email.trim()
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true
    })
    if (!user) {
      return res.status(500).json({ message: 'User not found' })
    }

    // Redirect to user profile(with its ID)  after the update
    res.redirect(`/`)
  } catch (err) {
    errorsCatch(err, res)
  }
}

async function show(req, res) {
  try {
    const userId = req.params.id
    const user = await User.findById(userId) //find the user by his/her ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.render(`users`, { user })
  } catch (err) {
    errorsCatch(err, res)
  }
}
//this is what we called "soft/silent remove it will only de-Activate the user and not remove it from the dataBase"
async function deleteUser(req, res) {
  /* logic:
  1)search for the user ID and update some resources(active boolean)
  2)rediracte to the home page
  */
  try {
    const userId = req.params._id

    const user = await User.findByIdAndUpdate(
      userId,
      { active: false },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.redirect('/')
  } catch (err) {
    errorsCatch(err, res)
  }
}

module.exports = {
  edit,
  update,
  show,
  remove: deleteUser,

  isAdmin
}
