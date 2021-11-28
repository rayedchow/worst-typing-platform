const router = require('express').Router();
const languageRanking = ['english', 'english_5k', 'english_25k', 'english_450k'];

router.get('/getLanguageData', (req, res) => {
	const { level } = req.params;
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