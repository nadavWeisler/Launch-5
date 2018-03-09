import React from 'react';
import { Link } from 'react-router-dom';

// 404 page not found 
// TOIDO: make pretty

const pageNotFound = () => {
    return (
     <div>
        page not found! <Link to= "/"> Go Home </Link>
     </div>   
    );
}

export default pageNotFound;