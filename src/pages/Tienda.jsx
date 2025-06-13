
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API = 'https://dummyjson.com/products?limit=12&skip=';
import CardProducto from "../components/CardProducto";
const Tienda = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // para el paginador 
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [productosPorPaginas, setproductosPorPaginas] = useState(12);
  const URI = API + skip;
  const getDatos = async () => {
    try {
      const response = await fetch(URI);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatos(data.products);
      setTotal(data.total)
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDatos();
  }, [skip]);

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
      <div className="card mb-2 p-1">
        <div className="d-flex justify-content-between align-content-center text-black">
          <p className="lead m-0 fw-bold text-sombra text-white">
            Página {Math.floor(skip / productosPorPaginas) + 1} de {Math.ceil(total / productosPorPaginas)}
          </p>
          <nav>
            <ul className="pagination m-0">
              <li className={`page-item ${skip < productosPorPaginas ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => skip >= productosPorPaginas && setSkip(skip - productosPorPaginas)}
                  disabled={skip < productosPorPaginas}
                  aria-label="Página anterior"
                >
                  &lt;&lt;
                </button>
              </li>
              <li className="page-item active">
                <span className="page-link">
                  {Math.floor(skip / productosPorPaginas) + 1}
                </span>
              </li>
              <li className={`page-item ${skip + productosPorPaginas >= total ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => skip + productosPorPaginas < total && setSkip(skip + productosPorPaginas)}
                  disabled={skip + productosPorPaginas >= total}
                  aria-label="Página siguiente"
                >
                  &gt;&gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="row">
        {datos.map((item) => (
          <CardProducto key={item.id} item={item} />
        ))}

      </div>
    </div>


  )
}

export default Tienda