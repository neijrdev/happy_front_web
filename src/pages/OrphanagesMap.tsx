import React, { useEffect, useState } from 'react';
import "../styles/pages/orphanagesMap.css";
import {Link} from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import api from './../services/api';
import Leaflet from 'leaflet';
import mapMarkerImg from '../images/map_marker.svg';

const MapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

export default function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState([])

  useEffect(()=>{
    async function loadOrphanges(){
      const response = await api.get('/orphanages')
      setOrphanages(response.data)
    }

    loadOrphanges();

  },[])

  console.log({orphanages});

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

        {orphanages.map(orphanage=>(
          <Marker
          icon={MapIcon}
          position={[orphanage.latitude,orphanage.longitude]}
          >
            <Popup
              className="map-popup"
              closeButton={false}
              minWidth={240}
              maxWidth={240}
            >
              {orphanage.name}
              <Link to={`orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff"/>
              </Link>
            </Popup>
          </Marker>
        ))}


      </Map>

     <Link to='orphanages/create' className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
     </Link>

   </div>
  )
}
