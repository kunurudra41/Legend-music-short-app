const express = require('express');
const app = express();
const port = 3001;
const path = require('path');

//server static files 
app.use(express.static('public'));

//serve the app 
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(port,()=>{
    console.log(`Music app running at 
        http://localhost:${port}`);
});
