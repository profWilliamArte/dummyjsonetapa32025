import { useState } from "react";
import { CarritoContext } from "./CarritoContext";

const CarritoProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const agregar = (producto) => {
        setCart((currItems) => {
            const isItemInCart = currItems.find((item) => item.id === producto.id);
            if (isItemInCart) {
                return currItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...currItems, { ...producto, cantidad: 1 }];
            }
        });
    };

    const eliminar = (producto) => {
        setCart((currItems) => {
            const existingItem = currItems.find((item) => item.id === producto.id);
            if (!existingItem) return currItems;

            if (existingItem.cantidad === 1) {
                return currItems.filter((item) => item.id !== producto.id);
            } else {
                return currItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                );
            }
        });
    };

    const vaciar = () => {
        setCart([]);
        alert("Carrito vaciado");
    };

    const comprar = () => {
        fetch('https://dummyjson.com/carts/add',  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1,
                products: cart.map((item) => ({
                    id: item.id,
                    quantity: item.cantidad
                }))
            })
        })
        .then((res) => res.json())
        .then(console.log)
        .catch((error) => console.error(error));

        alert("Gracias por su compra");
        setCart([]);
    };

    return (
        <CarritoContext.Provider value={{ cart, agregar, vaciar, eliminar, comprar }}>
            {children}
        </CarritoContext.Provider>
    );
};

export default CarritoProvider;

/**
  ¿Qué hace este componente?

  Este componente (CarritoProvider) maneja el estado del carrito de compras y ofrece funciones para manipularlo. Además, usa el contexto CarritoContext para compartir ese estado y esas funciones con cualquier componente hijo en la aplicación.

   Desglose paso a paso
1. Importamos herramientas necesarias
    import { useState } from "react";
    import { CarritoContext } from "./CarritoContext";

    Usamos useState para crear un estado local que representará los productos en el carrito.
    Importamos CarritoContext que creamos antes, para poder usarlo como proveedor de datos.

2. Definimos el componente CarritoProvider
    const CarritoProvider = ({ children }) => {

    Este componente recibe un prop especial llamado children.
    Esto significa que puede envolver otros componentes y pasarles información sin tener que renderizar nada directamente.

3. Creamos el estado del carrito
    const [cart, setCart] = useState([]);

    cart: representa la lista de productos en el carrito.
    setCart: función para modificar esa lista.
    Inicia como un arreglo vacío.

4. Función: Agregar producto al carrito
    const agregar = (producto) => {
        setCart((currItems) => {
            const isItemInCart = currItems.find((item) => item.id === producto.id);
            if (isItemInCart) {
                return currItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...currItems, { ...producto, cantidad: 1 }];
            }
        });
    };

    Si el producto ya está en el carrito, aumenta su cantidad .
    Si no está, lo agrega con cantidad 1 .


5. Función: Eliminar producto del carrito

    const eliminar = (producto) => {
        setCart((currItems) => {
            const existingItem = currItems.find((item) => item.id === producto.id);
            if (!existingItem) return currItems;

            if (existingItem.cantidad === 1) {
                return currItems.filter((item) => item.id !== producto.id);
            } else {
                return currItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                );
            }
        });
    };
    
    Si el producto tiene cantidad 1, lo elimina completamente del carrito .
    Si tiene más de uno, solo reduce la cantidad en 1.


6. Función: Vaciar todo el carrito

    const vaciar = () => {
        setCart([]);
        alert("Carrito vaciado");
    };

    Reinicia el carrito a un arreglo vacío.
    Muestra un mensaje de confirmación.

7. Función: Comprar productos

    const comprar = () => {
        fetch('https://dummyjson.com/carts/add',  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1,
                products: cart.map((item) => ({
                    id: item.id,
                    quantity: item.cantidad
                }))
            })
        })
        .then((res) => res.json())
        .then(console.log)
        .catch((error) => console.error(error));

        alert("Gracias por su compra");
        setCart([]);
    };

    Envia los productos del carrito a una API externa usando fetch.
    Luego vacía el carrito y muestra un mensaje de agradecimiento.

8. Proveedor del contexto
    return (
        <CarritoContext.Provider value={{ cart, agregar, vaciar, eliminar, comprar }}>
            {children}
        </CarritoContext.Provider>
    );

    Envuelve todos los hijos ({children}) dentro del contexto.
    El objeto value contiene:
    El estado actual del carrito (cart)
    Las funciones para manipularlo (agregar, eliminar, vaciar, comprar)


    Analogía para los alumnos:
    Piensa en CarritoProvider como el "controlador del carrito" . Es quien sabe:

    Qué hay en el carrito (cart)
    Cómo añadir cosas (agregar)
    Cómo quitar cosas (eliminar)
    Cómo vaciarlo (vaciar)
    Y cómo hacer una compra (comprar)
    Todo esto lo comparte con el resto de la app a través de un contexto , como si fuera un altavoz que dice:
    “Oigan, estos son los datos del carrito, están disponibles para todos.” 

 */