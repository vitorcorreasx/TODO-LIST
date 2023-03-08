const express = require('express');
const routes = require('./routes')
const cors = require('cors');

const app = express()

app.use(cors())

require('./database/index')
app.use(express.json())
app.use(routes);

app.use((error, req, res, next) =>{
  res.status(error.status || 500)
  res.json({error: error.mensage})
})

app.listen(3003);