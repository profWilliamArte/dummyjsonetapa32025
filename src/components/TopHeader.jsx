import { useContext } from 'react';
import { DolarContext } from '../contexts/DolarContext';

const TopHeader = () => {
    const { loading, error, dolar, euro, fecha } = useContext(DolarContext);

    if (loading) return <p>Cargando precio del dólar...</p>;
    if (error) return <p className="text-danger">Error al cargar el dólar: {error}</p>;

    return (
        <div className="d-flex justify-content-evenly  bg-danger  py-2 ">
            <p className="text-center  m-0 ">Fecha: {fecha}</p>
            <p className="text-center  m-0 ">Euro: {euro} / U$D {dolar}</p>
            
        </div>
    );
};



export default TopHeader



