const express = require('express');

const app = express();
const port = 8090;
const cors = require('cors');
const sectorService = require('./controllers/sector-controller');
const sectorlistService = require('./controllers/sectorlist-controller');

app.use(cors());
app.use(express.json());
app.use(sectorService);
app.use(sectorlistService);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
