import { useState, useEffect } from 'react';
import { DolarContext } from './DolarContext';

const DolarProvider = ({ children }) => {
    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = 'https://pydolarve.org/api/v2/tipo-cambio'; 

    const getDatos = async () => {
        try {
            setLoading(true);
            const response = await fetch(API);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            // Guardar en estado y localStorage
            setDatos(data);
            localStorage.setItem('dolarData', JSON.stringify({
                data,
                timestamp: Date.now()
            }));
            setLoading(false);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem('dolarData');

        if (stored) {
            try {
                const { data, timestamp } = JSON.parse(stored);
                const ahora = Date.now();
                const expiracion = 5 * 60 * 1000; // 5 minutos

                if (ahora - timestamp < expiracion) {
                    // Usar datos guardados
                    setDatos(data);
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.error("Error al parsear localStorage");
            }
        }

        // Si no hay datos válidos, hacemos la petición
        getDatos();

    }, []);

    const refresh = () => getDatos();

    const valorContexto = {
        loading,
        error,
        dolar: datos?.monitors?.usd?.price || null,
        euro: datos?.monitors?.eur?.price || null,
        fecha: datos?.datetime ? `${datos.datetime.date} / ${datos.datetime.time}` : null,
        refresh
    };

    return (
        <DolarContext.Provider value={valorContexto}>
            {children}
        </DolarContext.Provider>
    );
};

export default DolarProvider;