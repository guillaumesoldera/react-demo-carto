import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import Carto from './index';


function App() {

    const [ latitude, setLatitude ] = useState(undefined)
    const [ longitude, setLongitude ] = useState(undefined)
    


    return (
        <Fragment>
        <input type="number" onBlur={(e) => setLatitude(parseFloat(e.target.value))} />
        <input type="number" onBlur={(e) => setLongitude(parseFloat(e.target.value))} />

        <Carto centerLatitude={latitude} centerLongitude={longitude}/>
        </Fragment>
    )
}


ReactDOM.render(<App />, document.getElementById('app'));
