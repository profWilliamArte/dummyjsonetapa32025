import React from 'react'

const VerCarrito = ({ cart, agregar, eliminar, vaciar, comprar }) => {
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

        const totalCantidad = cart.reduce((total, item) => total + item.cantidad, 0);
    const totalPrecio = cart.reduce((total, item) => total + item.cantidad * item.price, 0);
    return (
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Carrito de Compra ({cart.length} Productos)</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">
                {cart.map((item) => (
                    <div key={item.id} className="card mb-3">
                        <div className="row g-0">
                            <div className="card-header p-0">
                                <img src={item.thumbnail} alt="" className="img-fluid" />
                            </div>
                            <div className="card-body text-center">
                                <h5 className="card-title">Producto: {item.title}</h5>
                                <p className="card-text">Precio: ${formatCurrency(item.price)}<br />
                                    Cantidad: {item.cantidad}</p>
                                <h5 className="card-text">Subtotal: ${formatCurrency(item.price * item.cantidad)}</h5>
                            </div>
                            <div className="card-footer text-center">
                                <button onClick={() => agregar(item)} className="btn btn-success btn-sm me-2">+ Agregar</button>
                                <button onClick={() => eliminar(item)} className="btn btn-danger btn-sm">+ Restar</button>
                            </div>
                        </div>
                    </div>
                ))}
                {cart.length > 0 ? (
                    <>
                        <div className="card p-3">
                            <h5>Total Productos: {totalCantidad}</h5>
                            <h5>Total A Pagar: {formatCurrency(totalPrecio)}$</h5>
                        </div>
                        <div className="card p-3 my-3">
                            <button className="btn btn-danger btn-sm mx-1 mb-2" onClick={() => vaciar()}>
                                Vaciar Carrito
                            </button>
                            <button className="btn btn-success btn-sm mx-1" onClick={() => comprar()}>
                                Comprar
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="card p-3 my-3">
                        <h5>Carrito Vacío</h5>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VerCarrito