require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

//Database connection
let mongoose = require('mongoose');
mongoose.connect(process.env['MONGODB_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

let urlSchema = new mongoose.Schema({
  original: {type: String, required: true},
  short : Number
});

let Url = mongoose.model('URL', urlSchema);

let bodyParser = require('body-parser');
let responseObject = {};
app.post('/api/shorturl', bodyParser.urlencoded({ extended: false }), function(req,res){

  let inputURL = req.body['url'];
  responseObject['original_url'] = inputURL;

  let urlRegex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
  
  if(!inputURL.match(urlRegex)){
    res.json({error: 'Invalid URL'})
    return
  }
  
  let inputShort = 1;
  Url.findOne({})
     .sort({short: 'desc'})
     .exec(function(error, result){
       if(!error && result!=undefined){
         inputShort = result.short + 1;
       }
       if(!error){
         Url.findOneAndUpdate(
           {original: inputURL},
           {original: inputURL, short: inputShort},
           {new: true, upsert: true},
           function(error, savedUrl){
             if(!error){
               responseObject['short_url'] = savedUrl.short;
               res.json(responseObject);
             }
           }
         )
       }
     })
  
});

app.get('/api/shorturl/:input', function(req, res){
  let input = req.params.input;

  Url.findOne({short: input}, function(error,data){
    if(!error && data!=undefined){
         res.redirect(data.original);
      }
    else{
      res.json({error : 'URL does not exist'});
    }
  })
})