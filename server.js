const express = require('express')

const app = express()
const port = 3006

app.use(express.static('static'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
