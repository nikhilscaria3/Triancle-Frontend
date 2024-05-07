import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-brand btn btn-link" type="button">Navbar</button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="nav-link active btn btn-link" type="button">Home</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" type="button">Link</button>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle btn btn-link" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><button className="dropdown-item btn btn-link" type="button">Action</button></li>
                                <li><button className="dropdown-item btn btn-link" type="button">Another action</button></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><button className="dropdown-item btn btn-link" type="button">Something else here</button></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link disabled btn btn-link" type="button" disabled>Disabled</button>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
