import axios from 'axios';
import { faker } from '@faker-js/faker';

const sendWord = async () => {
    const word = {
      word: faker.word.words(1),
    };
    try {
      const response = await axios.post('http://localhost:3001/api/word', word);
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
  
  sendWord();

// npm run build
// npm start