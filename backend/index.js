const connectToMongo = require('./db');
const express = require('express')
const app = express()
connectToMongo();

// If we want to use req.body, then we have to use middleware and to use the middleware we 
// have to use the app.use(express.json())
app.use(express.json())
const port = 5000

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})