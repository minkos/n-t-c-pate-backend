const Clarifai = require('clarifai');

const app_ai = new Clarifai.App({
	apiKey: process.env.CLARIFAI_API
})

const handleImageurl = (req, res) => {
	const { url } = req.body;

	app_ai.models.predict(Clarifai.GENERAL_MODEL, url)
	.then(response => response.outputs[0].data.concepts)
	.then(output => res.json(output))
	.catch(err => res.status(400).json('Unable to work with API'))
}

module.exports = {
	handleImageurl: handleImageurl
}