const express = require('express');

const app = express();

const PORT = 5000;

app.use(express.static('public'));

/* Listen on either assigned port or port 5000 */
app.listen(process.env.PORT || PORT, () => {
	console.log("Listening...");
});
