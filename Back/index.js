let express = require('express');
let cors = require('cors');
require('dotenv').config();
let faculty = require('./routes/faculty')

const PORT = process.env.PORT || 5000
var app = express();
app.use(express.json());
app.use(cors());
app.use(faculty);

app.listen(PORT, () => {
    console.log("API Started on PORT : " + PORT);
})