import axios from 'axios';
import { faker } from '@faker-js/faker';
import { Person } from './Interfaces/person';

const sendPatient = async () => {
    const patient: Person = {
      nombre: faker.person.firstName(),
      apellido: faker.person.lastName(),
      cedula: faker.helpers.rangeToNumber({ min: 10000000, max: 99999999 }),
      telefono: faker.phone.number('09# ### ###'),
      departamento: faker.location.state(),
      necesita_asistencia_movilidad: faker.datatype.boolean({ probability: 0.3 }),
    };

    try {
      const response = await axios.post('http://localhost:3001/api/patient', patient);
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      } else {
        console.error('Error:', error);
      }
    }
  };
  
  sendPatient();

// npm run build
// npm start