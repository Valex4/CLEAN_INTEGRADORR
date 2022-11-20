var mysql=require("mysql");
var conexion=mysql.createConnection(
   {
      host:"127.0.0.1",
      port:3307,
      user:"root",
      password:"",
      database:"Clean"
   }
);
conexion.connect(
    (error)=>{
     if(!error){
        console.log("Conexion exitosa");
     }else{
        console.log("Error de conexion");
     }
    }
);

module.exports=conexion;