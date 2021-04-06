// empty context arg bc we don't currently need it
// the callaback arg is a way to return the status code
exports.handler = (event, _context, callback) => {
	console.log({ event });
	// 1st arg to the callback is an error, so if nothing goes wrong we want it to be null
	// 2nd is the object w/the status code & the body
	callback(null, {
		statusCode: 200,
		// we'll want to receive JSON back 👇
		body: JSON.stringify({ boop: true }),
	});
};
