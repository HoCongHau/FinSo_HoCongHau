import React from 'react';
import { Button } from 'react-bootstrap';

function LoadMore({loading = false, onClick}){
    return(
        <div className="btn-load-more">
            <Button onClick={onClick}>{!loading ? "Loading ..." : "Load more"}</Button>
        </div>
    )
};

export default LoadMore;