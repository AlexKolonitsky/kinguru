'use strict';

const express = require('express');
const PORT = 3010;
const app = express();

app.use('/', express.static(__dirname + '/public' ));

app.listen(PORT, () => console.log(`Server run on port: ${PORT}`));