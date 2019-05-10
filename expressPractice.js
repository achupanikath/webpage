const express=require('express');
const app=express();

 app.get('/hello:', function(req, res){
     res.send('Hello');
 });

const port=process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}...`));