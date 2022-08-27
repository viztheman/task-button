const {SQLITE} = process.env;

const sqlite3 = require('sqlite3');

function createDatabase() {
	const db = new sqlite3.Database(SQLITE);
	const _all = db.all.bind(db);
	const _get = db.get.bind(db);
	const _run = db.run.bind(db);

	db.all = function(query, ...params) {
		return new Promise((res, rej) => {
			_all(query, params, (err, rows) => {
				return err ? rej(err) : res(rows);
			});
		});
	}.bind(db);

	db.get = function(query, ...params) {
		return new Promise((res, rej) => {
			_get(query, params, (err, row) => {
				return err ? rej(err) : res(row);
			});
		});
	}.bind(db);

	db.run = function(query, ...params) {
		return new Promise((res, rej) => {
			_run(query, params, (err) => {
				return err ? rej(err) : res();
			});
		});
	}.bind(db);

	db.scalar = async function(query, ...params) {
		const rows = await this.all(query, params);
		if (!rows || rows.length === 0) return null;

		const values = Object.values(rows);
		return values.length === 0 ? null : values[0]['1'];
	}.bind(db);

	db.serialize();
	return db;
}

module.exports = {
	run: (cb) => cb(createDatabase())
};
