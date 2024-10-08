const handleRegister = (req, res, db, bcrypt) => {

	const { name, email, password } = req.body;
	const hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
				name: name,
				email: loginEmail[0].email, // returns an array of object
				joined: new Date()
			}) 
			.then(user => {
				res.json(user[0]);
			}) //returns an array of object, index[0] to get object
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))	
}

module.exports = {
	handleRegister: handleRegister
}