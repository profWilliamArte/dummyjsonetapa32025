import { Link } from "react-router-dom"
import { FaSun, FaMoon } from 'react-icons/fa'
import FiltroMenu from "./FiltroMenu"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { TbShoppingCartSearch } from "react-icons/tb";

import { useContext } from "react"
import { CarritoContext } from "../contexts/CarritoContext"
import VerCarrito from "./VerCarrito";
const Header = ({ darkMode, toggleTheme }) => {
    const [txtbuscar, setTxtbuscar] = useState('');
    const { cart, agregar, eliminar, vaciar, comprar } = useContext(CarritoContext)
    const menejoTxt = (event) => {
        setTxtbuscar(event.target.value);
    };

    const navigate = useNavigate();
    const manejoEnvio = (event) => {
        event.preventDefault();
        navigate('/busquedas', {
            state: txtbuscar,
        });

    };


    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">DUMMY JSON {cart.length}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/inicio'} className="nav-link active" aria-current="page" href="#">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/movil'} className="nav-link" href="#">Movil</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/laptop'} className="nav-link" href="#">Laptops</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/tienda'} className="nav-link" href="#">Tienda</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categorias
                                </a>
                                <ul className="dropdown-menu">
                                    <FiltroMenu />
                                </ul>
                            </li>


                        </ul>
                        {cart.length > 0 && (
                            <button className="btn btn-outline-warning me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                                <TbShoppingCartSearch className="fs-3" />
                                <span className="badge bg-danger m-1">{cart.length}</span>
                            </button>
                        )}
                        <form className="d-flex" role="search" onSubmit={manejoEnvio}>
                            <input value={txtbuscar} onChange={menejoTxt} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Ok</button>
                        </form>

                        <button onClick={toggleTheme} className="btn btn-dark btn-sm ">
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                </div>
            </nav>

            <VerCarrito cart={cart} agregar={agregar} eliminar={eliminar} vaciar={vaciar} comprar={comprar}   />
               
                
            

        </>
    )
}

export default Header