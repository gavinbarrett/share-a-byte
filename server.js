const express = require('express');

const app = express();

app.use(express.static('public'));

/* Listen on either assigned port or port 5000 */
app.listen(process.env.PORT || 5000);
