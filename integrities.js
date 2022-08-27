const crypto = require('crypto');
const fs = require('fs');

const createHash = (path) => {
	const sha384 = new crypto.Hash('sha384');
	sha384.update(fs.readFileSync(path));

	return sha384.digest().toString('base64');
};

module.exports = {
	bootstrapCss: createHash('node_modules/bootstrap/dist/css/bootstrap.min.css'),
	tasklistCss: createHash('public/css/tasklist.css'),
	button: createHash('public/js/button.js'),
	tasklistJs: createHash('public/js/tasklist.js'),
	jquery: createHash('node_modules/jquery/dist/jquery.min.js'),
	popper: createHash('node_modules/@popperjs/core/dist/umd/popper.min.js'),
	bootstrapJs: createHash('node_modules/bootstrap/dist/js/bootstrap.min.js')
};
