// Primer filtro: Convierte el input a minúsculas y añade un espacio entre cada letra.
export const toLowercaseWithSpaces = (input: string): string => {
    let result: string = input
        .toLowerCase()             // Convierte el string a minúsculas.
        .split('')                  // Separa el string en un array de caracteres.
        .join(' ');                 // Une los caracteres con un espacio entre ellos.
    console.log(`Filtro toLowercaseWithSpaces,  input${JSON.stringify(input)}, output ${result} }`)
    return result
};

// Segundo filtro: Convierte el input a mayúsculas.
export const toUppercase = (input: string): string=> {   
    let result:string = input.toUpperCase();   // Convierte el string a mayúsculas.
    console.log(`Filtro toUppercase,  input${JSON.stringify(input)}, output ${result} }`)
    return result
};

// Tercer filtro: Reemplaza cada espacio en el input por un punto.
export const replaceSpacesWithDots = (input: string): string => {
    let result = input.replace(/ /g, '.');  // Reemplaza cada espacio (' ') por un punto ('.').
    console.log(`Filtro replaceSpacesWithDots,  input${JSON.stringify(input)}, output ${result} }`)
    return result
};

export const filterWithRandomError = (input: string): string => {
    if (Math.random() < 0.5) { // Probabilidad de 50% para generar un error
        throw new Error("Error aleatorio");
    }
    return input.trim()
}
