const router = require('express').Router();
const languageRanking = ['english', 'english_5k', 'english_25k', 'english_450k'];
const foreignLanguage = ['spanish', 'french', 'dutch', 'irish', 'italian', 'norwegian', 'portuguese', 'turkish', 'welsh'];
const _ = require('underscore');

router.get('/getLanguageData', (req, res) => {
	const { level } = req.params;
	try {
		let lang = (languageRanking.length > level) ? languageRanking[level] : _.sample(foreignLanguage);
		const data = require(`../languageData/${lang}.json`);
		return res.json({
			level,
			data
		});
	} catch(err) {
		return res.status(500).json({error: err.code});
	}
});

module.exports = router;