
const handleImage = (req, res, db) => {
	const { id } = req.body;

	db.select('*')
	.from('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(updatedEntries => res.json(updatedEntries[0].entries))
	.catch(err => res.status(400).json('Unable to update entries'))
}

module.exports = {
	handleImage: handleImage
}