require('dotenv').config(); // this is important!
module.exports = {
	'development': {
		'username': process.env.DB_USERNAME,
		'password': process.env.DB_PASSWORD,
		'database': process.env.DB_DATABASE,
		'host': process.env.DB_HOST,
		'dialect': 'mysql',
	},
	'test': {
		'username': 'root',
		'password': null,
		'database': 'database_test',
		'host': '127.0.0.1',
		'dialect': 'mysql',
	},
	'production': {
		'username': process.env.DB_USER,
		'password': process.env.DB_PASS,
		'database': process.env.DB_TABLE,
		'host': process.env.DB_HOST,
		'dialect': 'mysql',
	},
};