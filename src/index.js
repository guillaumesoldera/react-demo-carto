import React, { useCallback, useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import Leaflet from 'leaflet';
import './Carto.css';


export class Carto extends Component {

    mountCarto = (node) => {
        if (node != null) {
            this._mapComponent = Leaflet.map(node).setView([this.props.centerLatitude, this.props.centerLongitude], 14);
            Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
              attribution: '&copy; <a href="#">ESRI</a> contributors'
            }).addTo(this._mapComponent);
            this._mapComponent.on('click', (mouseEvent) => {
              this.props.clickOnMap(mouseEvent)
            })
            this._marker = Leaflet.marker([this.props.centerLatitude, this.props.centerLongitude])
            this._marker.addTo(this._mapComponent);
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.centerLatitude && nextProps.centerLatitude !== this.props.centerLatitude) || (nextProps.centerLongitude && nextProps.centerLongitude !== this.props.centerLongitude)) {
            if (this._mapComponent) {
                this._mapComponent.panTo([nextProps.centerLatitude, nextProps.centerLongitude])
                if (this._marker) {
                    this._marker.remove();
                }
                const marker = Leaflet.marker([nextProps.centerLatitude, nextProps.centerLongitude])
                marker.addTo(this._mapComponent);
                this._marker = marker;
              }
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="carto" ref={this.mountCarto}>
            </div>
        )
    }
};


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