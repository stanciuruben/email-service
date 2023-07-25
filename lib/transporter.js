const nodemailer = require('nodemailer');
const config = require('config');

module.exports = nodemailer.createTransport({
	host: config.get('mailHost'),
	port: config.get('mailPort'),
	secure: config.get('mailSecure'),
	auth: {
		user: config.get('mailUser'),
		pass: config.get('mailPass')
	}
});
