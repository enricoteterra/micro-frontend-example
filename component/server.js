const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(cors({origin: "http://localhost:3000"}))
app.use(morgan('dev'))
app.use(express.static('dist'))
app.listen(process.env.PORT || 3001)