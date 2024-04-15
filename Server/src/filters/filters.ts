
import { Person } from '../Interfaces/person';

export const filtro1 = (input: Person) => {
    const telefono = input.telefono.replace(/\s/g, '');
    const primerosDosDigitos = telefono.slice(0, 2);

    if (telefono.length !== 9 || primerosDosDigitos !== '09') {
        console.log(telefono, primerosDosDigitos)
        console.log('El número de teléfono no tiene el formato correcto');
    } else {
        console.log('El número de teléfono tiene el formato correcto')
    }
    return input;
};

// Segundo filtro: Convierte el input a mayúsculas.
export const filtro4 = (input: Person) => {   
    
    if (input.necesita_asistencia_movilidad){
        console.log(`La persona ${input.nombre} ${input.apellido} necesita asistencia en movilidad`);
    } else {
        console.log(`La persona ${input.nombre} ${input.apellido} será agendado en el proceso común`​);
    }
    return input;
};


