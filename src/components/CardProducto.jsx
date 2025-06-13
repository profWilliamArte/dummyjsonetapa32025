import { useContext } from "react"
import { Link } from "react-router-dom"
import { CarritoContext } from "../contexts/CarritoContext"


import { DolarContext } from '../contexts/DolarContext';


const CardProducto = ({ item }) => {
    const { cart, agregar, eliminar } = useContext(CarritoContext)

    const getCantidad = (producto) => {
        return cart.find((item) => item.id === producto.id)?.cantidad || 0
    }

    const totalProd = getCantidad(item)
    const precioTotal = parseFloat(item.price * totalProd);

const formatCurrency = (value) => {
    const numero = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

    if (isNaN(numero)) return '0,00';

    // Formatea solo el número con separador de miles y decimales
    const formattedNumber = new Intl.NumberFormat('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);

    return ` ${formattedNumber}`;
};
    const { loading, error, dolar, euro, fecha } = useContext(DolarContext);

    if (loading) return <p>Cargando precio del dólar...</p>;
    if (error) return <p className="text-danger">Error al cargar el dólar: {error}</p>;
    return (
        <div className="col-md-4 col-xl-3 mb-3" >
            <div className="card h-100">
                <div className="card-header p-0">
                    {totalProd > 0 && (
                        <span
                            className="badge rounded-pill text-bg-warning fs-3 m-1" style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}>
                            {totalProd}
                        </span>
                    )}
                    <img src={item.thumbnail} alt="" className="img-fluid" />
                </div>
                <div className="card-body text-center">
                    <p className="fs-3">{item.title}</p>
                    <p className="fs-5 text-danger fw-bold">Precio: {formatCurrency(item.price)}$<br/>
                    <span className="text-info small">{formatCurrency(item.price*dolar)}Bs</span></p>
                    {totalProd > 0 && (
                        <p className="mt-2 fs-6 text-warning">
                            Total: {formatCurrency(precioTotal)}
                        </p>
                    )}
                </div>
                <div className="card-footer text-center">
                    <a href="#" className="btn btn-primary btn-sm me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
                    <Link to={`/detalle/${item.id}/${item.title}`} href="#" className="btn btn-info btn-sm" >Detalle</Link>
                    <hr />
                    <button className="btn btn-success btn-sm" onClick={() => agregar(item)}>+ Agregar</button>
                    {totalProd > 0 && (
                        <button className="btn btn-danger btn-sm mx-1" onClick={() => eliminar(item)}>- Restar</button>
                    )}
                </div>
            </div>

            <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{item.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={item.thumbnail} alt="" className="img-fluid" />
                                </div>
                                <div className="col-md-8">
                                    <p className="fs-3">{item.title}</p>
                                    <p className="fs-3">Categoria: {item.category}</p>
                                    <p className="fs-3">Marca: {item.brand}</p>
                                    <p className="fs-3">Existencia: {item.stock}</p>
                                    <p className="fs-6">{item.description}</p>
                                    <p className="fs-5 text-danger fw-bold">Precio: {item.price}$</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CardProducto