const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const messages = require('./db/messages');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
  }));

 
var x = function respond(req, res){
    res.json({
        message: "Full Stack Message Board 1 "
    })

}

app.get('/',x);
app.get('/a',(req, res) =>{
    res.json({
        message: "Full Stack Message Board"
    })
} );

app.post('/messages',(req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) =>{
        res.json(message);
    }).catch( (error)=> {
        res.status(500);
        res.json(error);
    });
});


app.get('/messages',(req, res) => {
    messages.getAll().then( (messages) => {
        res.json(messages);
    })
});

const port = process.env.PORT || 1234;

app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
})
