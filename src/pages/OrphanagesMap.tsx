import React from 'react';
import "../styles/pages/OrphanagesMap.css";
import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import {Map, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css";

import mapMarkerImg from '../images/map_marker.svg';


export default function OrphanagesMap() {
  return (
   <div id="page-map">
     <aside>
       <header>
         <img src={mapMarkerImg} alt="Happy"/>

         <h2>Escolha um orfanato no mapa.</h2>
         <p>Muitas crianças estão esperando a sua visita :)</p>
       </header>

       <footer>
         <strong>Teixeira de Freitas</strong>
         <span>Bahia</span>
       </footer>
     </aside>
      
     <Map
      center={[-17.539985,-39.7446446]}
      zoom={15}
      style={{width: '100%', height: '100%'}}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
      
      </Map>

     <Link to='' className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
     </Link>
     
   </div>
  )
}
