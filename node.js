const express = require('express');
// const { fstat } = require('fs');
const app = express();
const url = require('url');
const fs = require('fs');
const path = require('path');


app.listen(8080, () => {
    console.log('El servidor esta inicializado en el puerto 8080');
});

app.use(express.static(path.join(__dirname+'/crear')));

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf-8', (error, data) => {
        res.write(data);
        res.end();
    });
});

// 2. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta
// recibida.

app.get('/crear', (req, res) => {
    const parametros = url.parse(req.url, true).query;
    const archivo = parametros.archivo;
    const contenido = parametros.contenido;

    fs.writeFile(archivo, contenido, 'utf8', () =>{
        res.write("<h1>");
        res.write("Archivo creado con exito!");
        res.write("</h1>");
        res.end();
    });
});

// 3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
// declarado en los parámetros de la consulta recibida.

app.get("/leer", (req, res) => {
    const {archivo} = url.parse(req.url, true).query;
    fs.readFile(archivo, 'utf-8', (err, data) =>{
        res.write(data);
        res.end();
    });
});

// 4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
// declarado en los parámetros de la consulta recibida.


app.get("/renombrar", (req, res) => {
    const {nombre} = url.parse(req.url, true).query;
    const {nuevoNombre} = url.parse(req.url, true).query;
    const fs = require('fs');
    fs.rename (nombre, nuevoNombre, (err, data) => {
        res.write(`El archivo con nombre: ${nombre} fue renombrado : ${nuevoNombre}`);
        res.end();
    });
});

// 5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los
// parámetros de la consulta recibida



app.get("/eliminar", (req, res) => {
    const {archivo} = url.parse (req.url, true).query;
    const fs = require('fs');
    fs.unlink(archivo, (err, data) => {
        // 9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente
// mensaje: “Tu solicitud para eliminar el archivo <nombre_archivo> se está
// procesando”, y luego de 3 segundos envía el mensaje de éxito mencionando el
// nombre del archivo eliminado.
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            
            <body>
                <p>Tu solicitud para eliminar el archivo: ${archivo} se esta procesando para su eliminacion...</p>
                <p id="parrafo"></p>
                <script>
                setTimeout(() => {document.getElementById("parrafo").textContent = "Archivo Eliminado con exito."}, 3000);
                    
                </script>
            </body>
            </html>`);
        res.end();
    });

});