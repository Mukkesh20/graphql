const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/assetDataSchema');
const app = express();
var cors = require("cors");
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["/test.py"]);



mongoose.connect('mongodb+srv://deepblue:BulXRcFCUVx5th0Y@cluster0.sjt4u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.once('open', ()=>{
    console.log('Connection Successful')
    const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./pypy.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
    console.log('Connection Successful2')

})

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));

app.get('/:code', (req, res) => {


  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./test.py', req.params.code ]);

  pyProg.stdout.on('data', function(data) {

    s = data.toString().replace(/\\n/g, "\\n")  
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f")
    .replaceAll("'", '"')
    .replaceAll("None", '"None"')
    .replaceAll("False", '"False"');
// remove non-printable and other non-valid JSON chars
    s1 = s.replace(/[\u0000-\u0019]+/g,""); 
    res.json({data: JSON.parse(s1)});
      //res.end('end');
  });
})

 
app.listen(3000, ()=>{
    console.log('server running at 3000')
})

