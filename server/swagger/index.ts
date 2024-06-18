import swaggerAutogen from "swagger-autogen";
const doc = {
    info: {
        version: '1.0.0',
        title: 'Book Management API',
        description: ''
    },
    host: 'localhost:5433',
    basePath: '/api/v1',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            LoginDto: {
                email: "",
                password: ""
            },
            CreateStudentDto: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            RegisterBookDto: {
                name: "",
                author: "",
                publisher: "",
                publicationYear: "",
                subject: "",
            }
        }
    }
    ,
    tags: [

        {
            name: 'Student',
            description: 'Student endpoints'
        },
        {
            name: 'Book',
            description: 'Book endpoints'
        },
        {
            name: 'Auth',
            description: 'Auth endpoints'
        },
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    definitions: {}
}

const outputFile = './swagger/doc/swagger.json';
const routes = ['./routes/index.ts'];

swaggerAutogen({ openapi: '3.0.0', autoQuery: false, autoHeaders: false })(outputFile, routes, doc).then(async () => {
    await import('./../server');
});