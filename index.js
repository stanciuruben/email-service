const express = require('express');
const cors = require('cors');
const config = require('config');

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
app.post('/', (req, res) => {
	res.send('works');
});

// Listen ------------------------------------------
const PORT = 3421;
app.listen(PORT, function () {
	console.log('\x1b[36m', `Listening at http://localhost:${PORT}`);
	console.log('\x1b[0m', '');
});
