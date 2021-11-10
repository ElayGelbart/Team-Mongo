/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()
const Person = require(`${__dirname}/../Models/Person`)
router.get('/', async (req, res) => {
  const phonebook = await Person.find({})
  res.send(phonebook)
})

router.get('/:id', async (req, res, next) => {
  try {
    const selectedPerson = await Person.find({ _id: req.params.id })
    res.send(selectedPerson[0])
  } catch (err) {
    next({ status: 404, msg: 'Person not found' })
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const phonebook = await Person.find({})
    const response = await Person.findByIdAndRemove(req.params.id)
    res.send('selected person has been deleted')
  } catch (err) {
    next({ status: 404, msg: 'Person not found' })
  }
})

router.post('/', async (req, res, next) => {
  const userName = req.body.name
  const userNumber = req.body.number
  if (!userName || !userNumber) { // Check Falsy
    next({ status: 403, msg: 'must be number and name' })
    return
  }
  const phonebook = await Person.find({})
  for (let phoneObj of phonebook) {
    if (phoneObj.name === userName) {
      next({ status: 403, msg: 'name must be unique' })
      return
    }
  }
  const userPhoneObj = {
    name: userName,
    phoneNumber: userNumber
  }
  const person = new Person(userPhoneObj)
  await person.save()
  console.log('person saved')
  res.send('added to phone book')
})

module.exports = router