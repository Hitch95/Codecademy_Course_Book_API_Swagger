const swaggerJsdoc = require('swagger-jsdoc');

// Swagger definition
const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Books API',
            version: '1.0.0',
            description: 'A simple Express Books API'
        },
        servers: [
            {
                url: 'http://localhost:3000'  // This can be updated dynamically in app.js if needed
            }
        ]
    },
    apis: ['./routes/Books.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi: require('swagger-ui-express'),
    swaggerSpec
};
