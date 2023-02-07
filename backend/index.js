const express = require('express');

const app = express();
const port = 8090;
const cors = require('cors');
const sectorService = require('./controllers/sector-controller');

app.use(cors());
app.use(express.json());
app.use(sectorService);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
