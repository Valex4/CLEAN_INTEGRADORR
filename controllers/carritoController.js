var conexion = require("../config/conexion");
let carrito = require("../model/carrito");
const ids = require("../public/javascripts/id");
const { cremas } = require("./productController");

module.exports = {
  index: function (req, res) {
    let id_comprador = require("../public/javascripts/id");
    console.log("id_comprador en cremas");
    console.log(id_comprador[id_comprador.length - 1]);
    let id_c = id_comprador[id_comprador.length - 1];

    carrito.obtener(conexion, (err, datos) => {
      res.render("carritos/index", {
        title: "CleanSkin",
        productos: datos,
        comprador: id_c,
      });
    });
  },
  cremas: function (req, res) {
    let id_comprador = require("../public/javascripts/id");
    console.log("id_comprador en cremas");
    console.log(id_comprador[id_comprador.length - 1]);
    let id_c = id_comprador[id_comprador.length - 1];
    carrito.categoriaCrema(conexion, (err, datos) => {
      res.render("carritos/cremas", {
        title: "CleanSkin",
        products: datos,
        comprador: id_c,
      });
    });
  },
  jabones: function (req, res) {
    let id_comprador = require("../public/javascripts/id");
    console.log("id_comprador en jabones");
    console.log(id_comprador[id_comprador.length - 1]);
    let id_c = id_comprador[id_comprador.length - 1];
    carrito.categoriaJabon(conexion, (err, datos) => {
      res.render("carritos/jabones", {
        title: "CleanSkin",
        products: datos,
        comprador: id_c,
      });
    });
  },
  serums: function (req, res) {
    let id_comprador = require("../public/javascripts/id");
    console.log("id_comprador en serums");
    console.log(id_comprador[id_comprador.length - 1]);
    let id_c = id_comprador[id_comprador.length - 1];
    carrito.categoriaSerum(conexion, (err, datos) => {
      res.render("carritos/serums", { products: datos, comprador: id_c });
    });
  },
  cart: function (req, res) {
    let id_comprador = require("../public/javascripts/id");
    console.log("id_comprador en serums");
    console.log(id_comprador[id_comprador.length - 1]);
    let id_c = id_comprador[id_comprador.length - 1];
    carrito.obtenerCarrito(conexion, id_c, (err, productosC) => {
      let copia = [];
      copia = productosC;
      console.log("El comprador tiene: " + copia.length + " productos");
      let suma = 0;
      for (let i = 0; i < copia.length; i++) {
        copia[i].precioProducto *= copia[i].cantidad;
        suma += copia[i].precioProducto;
      }
      console.log("Monto total: " + suma);

      res.render("carritos/cart", { products: productosC, total: suma });
    });
    //res.render('carritos/cart');
  },
  insertProductos: function (req, res) {
    console.log("Datos para guardar en la BD de carrito");
    console.log(req.body);
    console.log(req.body.id_producto);
    carrito.ObtenerIdProducto(
      conexion,
      req.body.id_producto,
      req.body.id_comprador,
      (err, existe) => {
        console.log("validando si existe o no");
        if (existe.length == 1) {
          console.log("se sumara la cantidad de los productos al actual");
          console.log(existe);
          console.log("tratando de sumar las dos cantidades");
          let sumatoria =
            parseInt(req.body.cantidad) + parseInt(existe[0].cantidad);
          console.log("La suma de las cantidades es: " + sumatoria);
          carrito.actualizarCantidadProducto(
            conexion,
            sumatoria,
            req.body.id_producto,
            req.body.id_comprador,
            (err) => {
              carrito.obtener(conexion, (err, datos) => {
                console.log(datos);

                res.render("carritos/index", {
                  title: "CleanSkin",
                  productos: datos,
                  comprador: req.body.id_comprador,
                });
              });
            }
          );
        } else {
          console.log("Se agrega el producto al carrito");
          carrito.insertarCarrito(conexion, req.body, (err, datos) => {
            console.log("datos guardados exitosamente en la BD de carrito");
            carrito.obtener(conexion, (err, datos) => {
              console.log(datos);

              res.render("carritos/index", {
                title: "CleanSkin",
                productos: datos,
                comprador: req.body.id_comprador,
              });
            });
          });
        }
      }
    );
  },
  insertProductos2: function (req, res) {
    console.log("Datos para guardar desde cremas");
    console.log(req.body);
    carrito.ObtenerIdProducto(
      conexion,
      req.body.id_producto,
      req.body.id_comprador,
      (err, existe) => {
        console.log("validando si existe o no");
        if (existe.length == 1) {
          console.log("se sumara la cantidad de los productos al actual");
          console.log(existe);
          console.log("tratando de sumar las dos cantidades");
          let sumatoria =
            parseInt(req.body.cantidad) + parseInt(existe[0].cantidad);
          console.log("La suma de las cantidades es: " + sumatoria);
          carrito.actualizarCantidadProducto(
            conexion,
            sumatoria,
            req.body.id_producto,
            req.body.id_comprador,
            (err) => {
              carrito.categoriaCrema(conexion, (err, datos) => {
                console.log(datos);

                res.render("carritos/cremas", {
                  title: "CleanSkin",
                  products: datos,
                  comprador: req.body.id_comprador,
                });
              });
            }
          );
        } else {
          carrito.insertarCarrito(conexion, req.body, (err, datos) => {
            console.log("datos guardados exitosamente en la BD de carrito");
            carrito.categoriaCrema(conexion, (err, datos) => {
              console.log(datos);

              res.render("carritos/cremas", {
                title: "CleanSkin",
                products: datos,
                comprador: req.body.id_comprador,
              });
            });
          });
        }
      }
    );
  },
  insertProductos3: function (req, res) {
    console.log("Datos para guardar desde jabones");
    console.log(req.body);
    carrito.ObtenerIdProducto(
      conexion,
      req.body.id_producto,
      req.body.id_comprador,
      (err, existe) => {
        console.log("validando si existe o no");
        if (existe.length == 1) {
          console.log("se sumara la cantidad de los productos al actual");
          console.log(existe);
          console.log("tratando de sumar las dos cantidades");
          let sumatoria =
            parseInt(req.body.cantidad) + parseInt(existe[0].cantidad);
          console.log("La suma de las cantidades es: " + sumatoria);
          carrito.actualizarCantidadProducto(
            conexion,
            sumatoria,
            req.body.id_producto,
            req.body.id_comprador,
            (err) => {
              carrito.categoriaJabon(conexion, (err, datos) => {
                console.log(datos);

                res.render("carritos/jabones", {
                  title: "CleanSkin",
                  products: datos,
                  comprador: req.body.id_comprador,
                });
              });
            }
          );
        } else {
          carrito.insertarCarrito(conexion, req.body, (err, datos) => {
            console.log("datos guardados exitosamente en la BD de carrito");
            carrito.categoriaJabon(conexion, (err, datos) => {
              console.log(datos);

              res.render("carritos/jabones", {
                products: datos,
                comprador: req.body.id_comprador,
              });
            });
          });
        }
      }
    );
  },
  insertProductos4: function (req, res) {
    console.log("Datos para guardar desde serums");
    console.log(req.body);
    carrito.ObtenerIdProducto(
      conexion,
      req.body.id_producto,
      req.body.id_comprador,
      (err, existe) => {
        console.log("validando si existe o no");
        if (existe.length == 1) {
          console.log("se sumara la cantidad de los productos al actual");
          console.log(existe);
          console.log("tratando de sumar las dos cantidades");
          let sumatoria =
            parseInt(req.body.cantidad) + parseInt(existe[0].cantidad);
          console.log("La suma de las cantidades es: " + sumatoria);
          carrito.actualizarCantidadProducto(
            conexion,
            sumatoria,
            req.body.id_producto,
            req.body.id_comprador,
            (err) => {
              carrito.categoriaSerum(conexion, (err, datos) => {
                console.log(datos);

                res.render("carritos/serums", {
                  title: "CleanSkin",
                  products: datos,
                  comprador: req.body.id_comprador,
                });
              });
            }
          );
        } else {
          carrito.insertarCarrito(conexion, req.body, (err, datos) => {
            console.log("datos guardados exitosamente en la BD de carrito");
            carrito.categoriaSerum(conexion, (err, datos) => {
              console.log(datos);

              res.render("carritos/serums", {
                products: datos,
                comprador: req.body.id_comprador,
              });
            });
          });
        }
      }
    );
  },
  eliminarPcarrito: function (req, res) {
    console.log("ya estas en en eliminar un p de carrito");
    console.log(req.params.id_carrito);
    carrito.eliminarCarrito(conexion, req.params.id_carrito, function (err) {
      let id_comprador = require("../public/javascripts/id");
      console.log("id_comprador en eliminar carrito");
      console.log(id_comprador[id_comprador.length - 1]);
      let id_c = id_comprador[id_comprador.length - 1];
      carrito.obtenerCarrito(conexion, id_c, (err, productosC) => {
        console.log("El comprador tiene: " + productosC.length + " productos");
        let suma = 0;
        for (let i = 0; i < productosC.length; i++) {
          productosC[i].precioProducto *= productosC[i].cantidad;
          suma += productosC[i].precioProducto;
        }
        console.log("Monto total: " + suma);

        res.render("carritos/cart", { products: productosC, total: suma });
      });
    });
  },
  seguimientoComprador: function (req, res) {
    let id_comprador = require("../public/javascripts/id");
    console.log("id_comprador en serums");
    console.log(id_comprador[id_comprador.length - 1]);
    let id_c = id_comprador[id_comprador.length - 1];
    carrito.obtenerCarrito(conexion, id_c, (err, productosC) => {
      let copia = [];
      copia = productosC;
      console.log("El comprador tiene: " + copia.length + " productos");
      let suma = 0;
      for (let i = 0; i < copia.length; i++) {
        copia[i].precioProducto *= copia[i].cantidad;
        suma += copia[i].precioProducto;
      }
      console.log("Monto total: " + suma);
      console.log(productosC);

      carrito.obtenerDatosComprador(conexion, id_c,(err, comprador) =>{
        let direccionC = comprador[0].direccion;
        let estado = "pendiente";
        let id_vendedor = prod[0].id_vendedor;
        let id_shopper = comprador[0].id_comprador;
        console.log("datos que necesito: ");
        console.log("Direccion comprador: " + direccionC);
        console.log("Estado: " + estado);
        console.log("id_vendedor: " + id_vendedor);
        console.log("id_comprador: " + id_shopper);
        res.render("carritos/seguimientoComprador", { products: productosC, total: suma, comprador: comprador });
      
      });
    });
  },
  seguimientoVendedor: function (req, res) {
    res.render("carritos/seguimientoVendedor");
  },
  pagar: function (req, res) {
    let id_comprador = require("../public/javascripts/id");
    console.log("id_comprador en jabones");
    console.log(id_comprador[id_comprador.length - 1]);
    let id_c = id_comprador[id_comprador.length - 1];


    carrito.obtenerDatosComprador(conexion, id_c,(err, comprador)=>{
      console.log("imprimiendo los datos del comprador")
      console.log(comprador);
      console.log(comprador[0].nombre);
      carrito.obtenerCarrito(conexion, id_c, (err, productosC) => {
        let copia = [];
        copia = productosC;
        console.log("El comprador tiene: " + copia.length + " productos");
        let suma = 0;
        for (let i = 0; i < copia.length; i++) {
          copia[i].precioProducto *= copia[i].cantidad;
          suma += copia[i].precioProducto;
        }
        console.log("Monto total: " + suma);
  
        res.render("carritos/pagos", { products: productosC, total: suma, comprador: comprador });
      });

    })


    
  },
  insertarSeguimiento:function(req, res){

  }
};
