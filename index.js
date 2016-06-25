'use strict';
const PORT = 1338;

const cors = require('cors');
const Datastore = require('nedb');
const express = require('express');
const bodyParser = require('body-parser');

const api = require('./api');
const commentsSrv = require('./core/services/comments.js');

// TODO: Usar 'datastore/workshop.db' para levantar la base de datos.
const db = new Datastore({
  filename: 'datastore/workshop.db',
  autoload: true,
  timestampData: true
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/bands', api.bandsRoutes(db, commentsSrv));
app.use('/albums', api.albumsRoutes(db, commentsSrv));
app.use('/comments', api.commentsRoutes(commentsSrv));

app.listen(PORT, () => console.log(`App started and listening on port ${PORT}`));
