import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import { toLowercaseWithSpaces, toUppercase, replaceSpacesWithDots, filterWithRandomError } from './filters/filters';
import { Pipeline } from './pipeline/pipeline';
import { QueueFactory } from './pipeline/queueFactory';

const app: Express = express();
const port: number = 3001;

app.use(express.json());

const crearArchivoSalida = (salida: string) => {
  const nombreArchivo = '../salida.txt';
  fs.appendFile(nombreArchivo, salida + '\n', (err) => {
    if (err) {
      console.error('Error al agregar a archivo de salida:', err);
    } else {
      console.log('Salida final agregada exitosamente al archivo:', nombreArchivo);
    }
  });
};

const queueFactory = QueueFactory.getQueueFactory<string>;
const pipeline = new Pipeline<string>([
  toLowercaseWithSpaces,
  filterWithRandomError,
  toUppercase,
  replaceSpacesWithDots
], queueFactory);

//se crea el listener para cuando un job termina
pipeline.on('finalOutput', (output) => {
  console.log(`Salida final: ${output}`);
  crearArchivoSalida(output);
});

//se crea el listener para cuando un job da error
pipeline.on('errorInFilter', (error, data) => {
  console.error(`Error en el filtro: ${error}, Datos: ${data}`);
});

app.post('/api/word', (req: Request, res: Response) => {
  console.log('Received data:', req.body);
  pipeline.processInput(req.body.word)
  res.status(201).send({ message: 'Word created successfully'});
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

// npm run build
// npm start


// para rabbit, creacion de contenedor en cmd:
// docker run -it -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
// luego asegurar que el contenedor este encendido, se puede ir a la url para ver el movimiento:
// HAY QUE ESTAR SI O SI CONECTADDO
// http://localhost:15672/ 
// user: guest
// pass: guest