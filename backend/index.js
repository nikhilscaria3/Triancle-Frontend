const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: `./config/.env.${environment}` });
const { testConnection } = require('./Database/Db');
const cors = require("cors")
const app = express();
const session = require('express-session');
const http = require('http');
const setupSocket = require('./utils/InappNotification');
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the HTTP server


app.use(cors());


const { job } = require('./utils/cronJob');

// Start the cron job
job.start();
// job.fireOnTick()

const io = setupSocket(server);


// Set up swagger
const Swagger = require('./swagger/swagger');
const swagger = new Swagger(app);
swagger.start();


app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/v1/assets', express.static(path.join(__dirname, 'views', 'assets')));
app.use(express.static(path.join(__dirname, 'public')));


// Set up session middleware
const usersRouter = require('./routes/UserRoutes');
const AccountRouter = require('./routes/AccountRoutes');
const FIleRouter = require('./routes/FIleRoutes')
const DashboardRouter = require('./routes/DashboardRoutes')
const SearchRouter = require('./routes/searchRoutes')
const CategoryRouter = require('./routes/CategoryRoutes')

// Routes

app.use('/', usersRouter);
app.use('/', FIleRouter);
app.use('/', AccountRouter);
app.use('/', DashboardRouter);
app.use('/', SearchRouter);
app.use('/', CategoryRouter);



// Route handler for '/'
app.get('/', (req, res) => {
  console.log("Request received for '/'");
  res.send("hei");
});

// setupSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server Listening on port " + PORT);
});

// Test database connection
testConnection();