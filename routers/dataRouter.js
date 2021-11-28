const router = require('express').Router();
const languageRanking = ['english', 'english_5k', 'english_25k', 'english_450k'];
const foreignLanguage = ['spanish', 'french', 'dutch', 'danish', 'irish', 'italian', 'norwegian', 'portuguese', 'turkish', 'welsh'];
const _ = require('underscore');

router.get('/getLanguageData', (req, res) => {
	const { level, amount } = req.query;
	try {
		let lang = (languageRanking.length > level) ? languageRanking[level] : `foreign/${_.sample(foreignLanguage)}`;
		const data = require(`../languageData/${lang}.json`);
		const randWords = [];

		for(let i = 0; i < amount; i++) {
			randWords.push(_.sample(data));
		}

		return res.json({
			randWords
		});
	} catch(err) {
		return res.status(500).json({error: err.code});
	}
});

module.exports = router;