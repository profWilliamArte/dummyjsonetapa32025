import { createContext } from "react";
export const CarritoContext = createContext();

/**
   ¿Qué hace este código?

  Este archivo crea un contexto de React vacío que luego usaremos para compartir el estado del carrito entre múltiples componentes sin tener   que pasar props manualmente.
  
  

    import { createContext } from "react"; 
        es una función que viene con React.
        Nos permite crear un objeto especial llamado Contexto.
        Este contexto puede contener información (como el estado del carrito) que será accesible por cualquier componente dentro del árbol de React.

    export const carritoContext = createContext();
        Aquí estamos creando un nuevo contexto usando createContext().
        Lo guardamos en una variable llamada carritoContext.
        Lo exportamos como const para poder importarlo desde otros archivos.

    Analogía para los alumnos:
    Piensa en carritoContext como una "mochila compartida" que viaja por toda tu aplicación. Cualquier componente puede acceder a lo que hay dentro de esa mochila, siempre que esté dentro del rango del Proveedor del Contexto.
*/