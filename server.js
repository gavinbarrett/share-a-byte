const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(5555, () => {
	console.log('Listening on port 5555');
});
