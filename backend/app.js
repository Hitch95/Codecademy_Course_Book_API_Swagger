const express = require('express');
const logger = require('morgan');
const cors = require("cors");
const readline = require('readline');
const { swaggerUi, swaggerSpec } = require('./swaggerConfig');

const booksRouter = require('./routes/Books');

const app = express();

// Middleware setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/books', booksRouter);

// Setting up the readline interface for port prompt
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readlineInterface.question('Do you want to use port 3000? (yes/no) ', (answer) => {
    let PORT = answer.trim().toLowerCase() === 'yes' ? 3000 : 3001;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        swaggerSpec.servers = [{ url: `http://localhost:${PORT}` }];
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    });

    readlineInterface.close();
});


module.exports = app;