import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import { toLowercaseWithSpaces, toUppercase, replaceSpacesWithDots, filterWithRandomError } from './filters/filters';
import { Pipeline } from './pipeline/pipeline';
import { QueueFactory } from './pipeline/queueFactory';
import { Person } from './Interfaces/person';

const app: Express = express();
const port: number = 3001;

app.use(express.json());

// const crearArchivoSalida = (salida: string) => {
//   const nombreArchivo = '../salida.txt';
//   fs.appendFile(nombreArchivo, salida + '\n', (err) => {
//     if (err) {
//       console.error('Error al agregar a archivo de salida:', err);
//     } else {
//       console.log('Salida final agregada exitosamente al archivo:', nombreArchivo);
//     }
//   });
// };

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
  // crearArchivoSalida(output);
});

//se crea el listener para cuando un job da error
pipeline.on('errorInFilter', (error, data) => {
  console.error(`Error en el filtro: ${error}, Datos: ${data}`);
});

app.post('/api/patient', (req: Request, res: Response) => {
  console.log('Received data:', req.body);
  const patient = (req.body) as Person;
  const validacion = validatePatient(req.body);
  if(!validacion) {
    res.status(400).send({ message: 'Formato invalido de datos de paciente'} );
    return;
  } else {
    res.status(200).send({ message: `Se ha iniciado el proceso de agenda para la persona ${patient.nombre} ${patient.apellido}`});
    pipeline.processInput(req.body)
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});


const validatePatient = (patient : Person ) => {
  if (patient.nombre === '' || 
    patient.apellido === '' || 
    patient.departamento === '' || 
    patient.telefono === '' || 
    patient.cedula === undefined || 
    patient.necesita_asistencia_movilidad === undefined) {
    return false;
  }
  return true;
}

// npm run build
// npm start


// para rabbit, creacion de contenedor en cmd:
// docker run -it -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
// luego asegurar que el contenedor este encendido, se puede ir a la url para ver el movimiento:
// HAY QUE ESTAR SI O SI CONECTADDO
// http://localhost:15672/ 
// user: guest
// pass: guest