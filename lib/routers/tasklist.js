const {Router, json} = require('express');
const ejs = require('ejs');
const Tasks = require('../sql/tasks');
const fs = require('fs');
const Path = require('path');

const path = Path.join(__dirname, '../../views/partials/_task.ejs');
const RowTemplate = fs.readFileSync(path, 'utf8');

const router = Router();

router.get('/', async (req, res) => {
	const tasks = await Tasks.getAll();

	res.render('tasklist', {tasks});
});

router.post('/', json(), async (req, res) => {
	const {title} = req.body;
	if (!title) return res.status(400).end();

	const task = await Tasks.create({title});
	const html = ejs.render(RowTemplate, {task});
	res.send(html);
});

/*
 * HACK: Something's going on with Express routers and DELETE.
 *       We need to expose and hook our code independent
 *       of the router itself.
 */
router.del = async (req, res) => {
	await Tasks.complete(req.params.id);
	res.json({success: true});
};

module.exports = router;
