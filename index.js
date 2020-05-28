const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const {dbUrl} = require('./key');
const authRouter = require('./router/authRouter');
const requireToken = require('./middleware/requireToken');


const app = express();
const PORT = 3000 || evn.proccess.PORT;

// Using Middleware 
app.use(bodyParser.json())


mongoose.connect( dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('connected', () => console.log('Database connected.'));
db.on('err', (err) => console.log('Error while connecting to DB..... !'));



// Routers //
app.post('/', (req, res) =>{
  res.send("Hello !");
});

app.get('/', (req, res) => {
 res.send('Hello , Welcome...........') ;
})

app.get('/', requireToken, (req, res) => {
  res.send(`Your Email is : ${req.user.email}`)
;})


// authentication router
app.use('/user', authRouter);


app.listen(PORT, console.log('Server running on ',PORT,'.......' ))
