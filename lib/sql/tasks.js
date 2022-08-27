const sqlite = require('./sqlite');

module.exports = {
	getAll: async () => {
		let tasks;

		await sqlite.run(async db => 
			tasks = await db.all('SELECT * FROM tasks')
		);
		return tasks;
	},

	getById: async (id) => {
		let task;

		await sqlite.run(async db =>
			task = db.get('SELECT * FROM tasks WHERE id = ?', id)
		);
		return task;
	},

	getRandom: async () => {
		let tasks;

		await sqlite.run(async db => {
			tasks = await db.all('SELECT * FROM tasks');
		});
		if (tasks.length === 0) return null;

		const index = Math.floor(Math.random() * tasks.length);
		return tasks[index];
	},

	create: async ({title}) => {
		let id;

		await sqlite.run(async db => {
			await db.run('INSERT INTO tasks(title) VALUES(?)', title);

			const row = await db.get('SELECT last_insert_rowid() as id');
			id = row.id;
		});
		return {id, title};
	},

	complete: (id) =>
		sqlite.run(db => db.run('DELETE FROM tasks WHERE id = ?', id)),
};
