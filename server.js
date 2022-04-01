const express = require('express');
//const cors = require('cors'); // required by heroku
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
// const Clarifai = require('clarifai');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const imageurl = require('./controllers/imageurl');

const db = knex({
	client: 'pg',
	connection: {
		// host: '127.0.0.1',
		// port: 5432,
		// user: 'postgres',
		// password: 'cheeyuiming8128',
		// database: 'ai_robots'

		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnAuthorized: false
		}
	}
})

const app = express();
app.use(express.json());
//app.use(cors());

// const app_ai = new Clarifai.App({
// 	apiKey: '89069a13f71c4c8ba62da60be99d785d' 
// })


app.get('/', (req, res) => {
	//res.send('This is working');
	res.json('This is working!!'); //in order to see the in the console
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;

	db.select('*').from('users').where({id})
	.then(response => {

		if (response.length) {
			res.json(response[0]);
		} else {
			res.status(400).json('No Such User');
		}

	}).catch(err => res.status(400).json('Error getting user'))
})


//dependencies injection
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.post('/signin', (req, res) => {signin.handleSignIn(req, res)(db, bcrypt)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {imageurl.handleImageurl(req, res)})

app.listen(process.env.PORT || 3001, () => console.log(`Listening to port ${process.env.PORT}`));

// app.listen(3001, () => console.log('Listening to port 3001'));

//endpoints:
//signin ---> POST
//Register ---> POST
//profile/:userId ---> GET (user profile)
//image ---> PUT (update on user profile, by sending over id to assist in DB search, thereafter returns a value)
