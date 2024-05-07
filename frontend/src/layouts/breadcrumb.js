import React from 'react';

function Breadcrumb({ breadcrumbItem, breadcrumbItemActive }) {
  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="page-header-title">
              <h5 className="mb-0">{breadcrumbItemActive}</h5>
            </div>
          </div>
          <div className="col-md-12">
            <ul className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="../dashboard/index.html">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript: void(0)">{breadcrumbItem}</a></li>
              <li className="breadcrumb-item" aria-current="page">{breadcrumbItemActive}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
