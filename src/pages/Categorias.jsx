
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardProducto from "../components/CardProducto";
const API = 'https://dummyjson.com/products/category/';
const Categorias = () => {
     const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams(); // Obtenemos el ID del producto desde la URL
    
    const URI = API+id; //
    console.log("URI",URI);
    const getDatos = async () => {
        try {
            const res = await fetch(URI); 
            if (!res.ok) throw new Error(`Error al cargar datos (status: ${res.status})`);
            const data = await res.json();
            setDatos(data.products);
            console.log(URI);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, [id]);
     if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Personajes...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Personajes</h4>
                <p>{error}</p>
            </div>
        );
    }

  return (
           <div className="container">
            <h4 className="text-center py-4">Moviles</h4>
            <div className="row">
                {datos.map((item) => (
                    <CardProducto key={item.id} item={item} />
                ))}

            </div>
        </div>
  )
}

export default Categorias