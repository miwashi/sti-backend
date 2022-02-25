const cors = require("cors")
const express = require("express")
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = process.env.PORT || 3001

app.use(function (req, res, next) {
   //res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'");
   next();
});

app.use('/healthcheck', require('./routes/healthcheck.routes'));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());

app.get("/", (request ,response)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body={"status": "available"}
   response.status(200).send(body)
})

app.get("/registerscore", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body={"name": req.query.name, "score":req.query.score}
   
   //Fattas kod för att spara i en dictionary
   res.status(200).send(body)
})

app.post('/echo', (req, res) => {
   console.log(JSON.stringify(req.body))
   res.status(200).send(req.body)
});

app.post('/auth', (req, res) => {
   let user = req.body.user;
   let password = req.body.password;
   console.log(req.body)
   console.log(`User ${user}`)
   console.log(`Password ${password}`)
   if(true){
      console.log("Authorized")
      const token = jwt.sign({
            data: 'foobar'
      }, 'your-secret-key-here', { expiresIn: 60 * 60 }); 
      console.log(token)
      res.status(200).send(token)
  }else{
      console.log("Not authorized")
      res.status(200).send({"STATUS":"FAILURE"})
   }
});

app.get("/higscore", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body=[{"name": "nisse", "score":"1000"}, {"name": "olle", "score":"1001"}, {"name": "pelle", "score":"3000"}]
   //Istället för att hårdkoda, läs ut från dictionary
   
   res.status(200).send(body)
})

app.get("/football", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body=
   [
      {
            "name": "AIK",
            "points": 9,
            "logo":"https://www.allsvenskan.se/lagen/aik/_/image/0c02711d-d44e-4124-a555-0df3d8264551:0fb201f22e823629dada3ee33327a5b70963120b/width-110/AIK.svg"
      }
   ]

   res.set('Content-Type', 'application/json');
   res.status(200).send(body)
})

app.listen(PORT , ()=>{
     console.log(`STARTED LISTENING ON PORT ${PORT}`)
});