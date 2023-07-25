const express = require('express');
const cors = require('cors');
const config = require('config');
const transporter = require('./lib/transporter');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Cors ------------------------------------------
const whitelist = config.get('whitelist');
const corsOptions = {
	origin: (origin, callback) => {
		if (origin === undefined || whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true
};
app.use(cors(corsOptions));

// Routes ------------------------------------------
app.post('/', async (req, res) => {
	const status = await transporter.sendMail({
		from: config.get('mailAddress'),
		to: config.get('mailReceiver'),
		subject: `Website contact from ${req.body.name} <${req.body.email}>`,
		text: req.body.message
	});

	if (status.accepted.includes(config.get('mailReceiver'))) {
		return res.send(true);
	}
	return res.json(false);
});

// Listen ------------------------------------------
const PORT = 3421;
app.listen(PORT, function () {
	console.log('\x1b[36m', `Listening at http://localhost:${PORT}`);
	console.log('\x1b[0m', '');
});
