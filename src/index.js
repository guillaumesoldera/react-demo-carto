import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Leaflet from 'leaflet';
import './Carto.css';

Carto.propTypes = {
  centerLatitude: PropTypes.number.isRequired,
  centerLongitude: PropTypes.number.isRequired,
  centerLabel: PropTypes.string,
  popupContent: PropTypes.node,
  clickOnMap: PropTypes.func.isRequired
}

Carto.defaultProps = {
  centerLatitude: 46.323716,
  centerLongitude: -0.464777,
  centerLabel: "Centre de la carte",
  popupContent: <div>Vous êtes ici</div>,
  clickOnMap: (mouseEvent) => console.log(mouseEvent) 
}

function Carto(props) {
  const { centerLatitude, centerLongitude } = props;
  const [ mapElement, setMapElement ] = useState(null);
  const [ markerCenter, setMarkerCenter ] = useState(undefined)


  const mountCarto = useCallback(node => {
    if (node != null) {
      const mapComponent = Leaflet.map(node).setView([centerLatitude, centerLongitude], 14);
      Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="#">ESRI</a> contributors'
      }).addTo(mapComponent);
      mapComponent.on('click', (mouseEvent) => {
        props.clickOnMap(mouseEvent)
      })
      const marker = Leaflet.marker([centerLatitude, centerLongitude])
      marker.addTo(mapComponent);
      setMapElement(mapComponent);
      setMarkerCenter(marker);
    }
  }, [])

  useEffect(() => {
    if (mapElement) {
      mapElement.panTo([props.centerLatitude, props.centerLongitude])
      if (markerCenter) {
        markerCenter.remove();
      }
      const marker = Leaflet.marker([props.centerLatitude, props.centerLongitude])
      marker.addTo(mapElement);
      setMarkerCenter(marker)
    }
  }, [props.centerLatitude, props.centerLongitude])

  
  return (
    <div className="carto" ref={mountCarto}>
    </div>
  );
}

export default Carto;
