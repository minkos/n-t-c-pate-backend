
const handleSignIn = (req, res) => (db, bcrypt) => {
	const { email, password } = req.body;
	
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => bcrypt.compareSync(password, data[0].hash))
		.then(decision => {
			if (decision) {
				db.select('*')
				.from('users')
				.where('email', '=', email)
				.then(correctUser => res.json(correctUser[0]))
				.catch(err => res.status(400).json('Unable to get user'))
			} else {
				res.status(400).json('Wrong Password');
			}
		}).catch(err => res.status(400).json('Incorrect email'))

}

module.exports = {
	handleSignIn: handleSignIn
}