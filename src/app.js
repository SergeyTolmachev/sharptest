const Express = require('express');
const bodyParser = require('body-parser');

const app = Express();

const { appPort } = require('./config/config');

const errorHandler = require('./middlewares/errorHandler');

const user = require('./controllers/user');
const transaction = require('./controllers/transaction');

const auth = require('./rpc/auth');
const me = require('./rpc/me');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/transaction', transaction);
app.use('/api/user', user);
app.use('/api/rpc/auth', auth);
app.use('/api/rpc/me', me);

app.use(errorHandler);
app.listen(appPort, () => {
  console.log(`App started on ${appPort}`);
});
