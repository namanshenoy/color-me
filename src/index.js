const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')


const {  
  Stitch, 
  UserPasswordCredential,
} = require('mongodb-stitch-server-sdk');

const APP_ID = 'test1-sspul'
const StitchApp = Stitch.initializeDefaultAppClient(APP_ID)

const PORT = process.env.PORT || 8081

const app = express();

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
    res.send({ status: 'done' })
  } catch (e) {
    res.status(500).send({ error: e })
  }
})


app.post('/login', (req, res) => {
  try {
    const body = req.body
    if (!body.username || !body.password) {
      res.status(400).send({ error: 'Please send username and password!' })   
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
        .catch(e => console.error(e))
    }
  } catch (e) {
    res.status(500).send({ error: e })
  }
})
app.listen(PORT, () => {
  console.log('Listening on: ' + PORT)
})