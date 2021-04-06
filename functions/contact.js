require('dotenv').config(); // the config method here actually causes it to load the .env file

// empty context arg bc we don't currently need it
// the callaback arg is a way to return the status code
exports.handler = (event, _context, callback) => {
	const mailgun = require('mailgun-js'); // get the mailgun sdk
	const mg = mailgun({
		// initialise mailgun by calling it with our api key & domain
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
		// host: 'api.eu.mailgun.net', // TODO: fix by upgrading mailgun acc to allow eu zone spec
	});

	console.log(event.body, event);

	const data = JSON.parse(event.body); // this'll give us the state
	const email = {
		from: 'Niamh McCooey <niamhmccooey@gmail.com>',
		to: `${data.name} <${data.email}>`,
		subject: data.subject,
		text: data.body,
	};

	mg.messages().send(email, (error, response) => {
		callback(error, {
			statusCode: 200,
			body: JSON.stringify(response),
		});
	});
};
