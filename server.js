const express = require('express');

const app = express();

// serve static files
app.use(express.static('public'));

//app.get('/*', greet);

app.listen(5555, () => {
	console.log('Listening on port 5555');
});
