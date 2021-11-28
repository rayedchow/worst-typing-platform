const router = require('express').Router();
const languageRanking = ['english', 'english_5k', 'english_25k', 'english_450k'];

router.post('/getLanguageData', (req, res) => {
	const { level } = req.body;
	try {
		const data = require(`../languageData/${languageRanking[level]}.json`);
		return res.json({
			level,
			data
		});
	} catch(err) {
		return res.status(500).json({error: err.code});
	}
});

module.exports = router;