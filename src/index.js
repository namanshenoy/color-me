const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const moment = require('moment')


const {  
  Stitch, 
  UserPasswordCredential,
} = require('mongodb-stitch-server-sdk')

const APP_ID = 'test1-sspul'
const StitchApp = Stitch.initializeDefaultAppClient(APP_ID)

const PORT = process.env.PORT || 8081

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.post('/', (req, res) => {
  try {
    console.log(req.body)
    // consol
    axios.post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/test1-sspul/service/mood_rest/incoming_webhook/add_mood', {
      owner_id: req.body.owner_id,
      date: moment().format('YYYY-MM-DD'),
      mood_hex: req.body.mood_hex
    }).then(x => {
      res.send({ status: 'success' })
    })
    .catch(e => res.status(404).send({ status: 'error', error: e }))
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: e })
  }
})


app.post('/login', (req, res) => {
  try {
    const body = req.body
    if (!body.username || !body.password) {
      res.status(400).send({ status: 'error', message: 'Please send username and password!' })   
    } else {
      const credential = new UserPasswordCredential(body.username, body.password);
      StitchApp.auth.loginWithCredential(credential)
        .then(authedUser => {
          // console.log(`Logged in with user! ${JSON.stringify(Object.keys(authedUser.profile))}`)
          res.send({
            status: 'success',
            data: {
              owner_id: authedUser.id,
              owner_email: authedUser.profile.data.email
            }
          })
        })
        .catch(e => {
          res.status(401).send({status: 'error', message: e.message})
        })
      }
    } catch (e) {
      console.error(e)
      res.status(500).send({ status: 'error', message: e })
    }
})

app.get('/emotions', (req, res) => {
  try {
    const body = req.query
    if (!body.id) {
      res.status(400).send({ status: 'error', message: 'Error: Please try logging in again!' })   
    } else {
      axios.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/test1-sspul/service/mood_rest/incoming_webhook/get_moods?owner_id=' + body.id)
      .then(r => {
        res.send(r.data)
      })
    }
  } catch (e) {
    res.status(500).send({ status: 'error', message: e })
  }
})

app.listen(PORT, () => {
  console.log('Listening on: ' + PORT)
})