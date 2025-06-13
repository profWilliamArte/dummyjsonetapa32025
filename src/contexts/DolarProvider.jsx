import { useState, useEffect } from 'react';
import { DolarContext } from './DolarContext';

const DolarProvider = ({ children }) => {
    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = 'https://pydolarve.org/api/v2/tipo-cambio'; 

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    // Valor compartido por el contexto
    const valorContexto = {
        loading,
        error,
        dolar: datos?.monitors?.usd?.price || null,
        euro: datos?.monitors?.eur?.price || null,
        fecha: datos?.datetime ? `${datos.datetime.date} / ${datos.datetime.time}` : null,
        refresh: getDatos, // función para recargar datos si es necesario
    };

    return (
        <DolarContext.Provider value={valorContexto}>
            {children}
        </DolarContext.Provider>
    );
};

export default DolarProvider;