require("express-async-errors");
require("dotenv/config")

const cookieParser = require('cookie-parser');

const uploadConfig = require('./configs/upload');

const cors = require('cors');

const AppError = require('./utils/AppError');

const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: [
    'https://yourfavoritemovies.netlify.app'
  ],
  credentials: true,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
}));

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = process.env.PORT || 3333;


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));