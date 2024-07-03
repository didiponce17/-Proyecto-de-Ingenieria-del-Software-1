let express = require("express");
let path = require("path");
let bodyParser = require( "body-parser" );
let multer = require( "multer" );

let currentDirectory=__dirname;
let rootFolder="webroot";
let staticDirectory=path.join(currentDirectory,rootFolder);


let app=express();
app.use(express.static(staticDirectory));

app.use( express.json() );
app.use( express.urlencoded() );
app.use(multer({ dest: `${rootFolder}/uploads/` }).any());

const EmailController = require('./controller/EmailController');
app.post('/api/sendEmail', EmailController.sendEmail);


let ipserver="0.0.0.0";
let port=3000;

let server=app.listen(port,ipserver,function(){
    console.log("The server is up and running in http://localhost:" + port + "/" );
});

require("./controller/clientesController")(app);
require("./controller/vendedorController")(app);
require("./controller/ProductosController")(app);
require("./controller/TarjetaController")(app);
