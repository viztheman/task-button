const {Router, json} = require('express');
const Tasks = require('../sql/tasks');

const router = Router();

router.get('/', (req, res) => res.render('button'));

router.get('/task', async (req, res) => {
	const task = await Tasks.getRandom();

	res.json({task});
});

router.post('/complete/:id', async (req, res) => {
	const id = req.params.id;
	if (!id) return res.status(404).end();

	try {
		await Tasks.complete(id);
		res.json({success: true});
	}
	catch(e) {
		console.error(e);
		res.json({success: false});
	}
});

module.exports = router;
