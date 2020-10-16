import React,{useState, FormEvent, ChangeEvent, useEffect} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { MdClose  } from "react-icons/md";
import {LeafletMouseEvent} from 'leaflet'
import '../styles/pages/createOrphanage.css';
import Sidebar from "../components/Sidebar";
import MapIcon from './../utils/MapIcon';
import api from './../services/api';
import { useHistory } from 'react-router-dom';


interface Images {
  name: string,
  url: string,
}

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({
    latitude: 0, longitude: 0
  })

  const [name, setName]= useState('');
  const [about, setAbout]= useState('');
  const [instructions, setInstructions]= useState('');
  const [opening_hours, setOpening_hours]= useState('');
  const [open_on_weekends, setOpen_on_weekends]= useState(true);
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<Images[]>([])


  

  useEffect(()=>{

    navigator.geolocation.getCurrentPosition(async function(position) {
        // console.log("Latitude is :", position.coords.latitude);
        // latitude=position.coords.latitude
        // console.log("Longitude is :", position.coords.longitude);
        // longitude=position.coords.longitude
        const {latitude, longitude} = await position.coords
        console.log({latitude, longitude})
        setPosition({
          latitude, longitude
        })
      })

  },[])

  function handleMapClick (event:LeafletMouseEvent){
    console.log(event);
    console.log(event.latlng)
    const {lat, lng } = event.latlng
    setPosition({
      latitude:lat,
      longitude:lng
    })
  }

  async function handleSubmit(event:FormEvent){
    event.preventDefault();
    const { latitude, longitude } = position

    const data = new FormData();

    data.append('name',name);
    data.append('about',about);
    data.append('latitude',String(latitude));
    data.append('longitude',String(longitude));
    data.append('instructions',instructions);
    data.append('opening_hours',opening_hours);
    data.append('open_on_weekends',String(open_on_weekends));

    images.forEach(image=>{
      data.append('images',image)
    })

    await api.post('orphanages', data)

    alert('Cadastro Realizado com sucesso!')

    history.push('/app')
  }

  function handleSelectImages (event:ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return ;
    }

    const selectedImages = Array.from(event.target.files)

    const selectedImagesPreview = selectedImages.map(image=>{
      return {
        name:image.name,
        url: URL.createObjectURL(image)};
    })

    setImages([...images, ...selectedImages])
    setPreviewImages([...previewImages,...selectedImagesPreview])
  }

  function handleDeleteImage(index:number){
    const newImages = [...images]
    const newPreviewImages = [...previewImages]
    // console.log({index})
    newImages.splice(index,1)
    newPreviewImages.splice(index,1)

    setImages(newImages)
    setPreviewImages(newPreviewImages)
  }

  // console.log("images",images)
  // console.log("preview_images", previewImages)

  return (
    <div id="page-create-orphanage">
     <Sidebar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[position.latitude,position.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <Marker
                interactive={false}
                icon={MapIcon}
                position={[
                  position.latitude,
                  position.longitude
                  ]}
              />
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event=>setName(event.target.value)}
                required
                />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
               id="about"
               maxLength={300}
               value={about}
               onChange={event=>setAbout(event.target.value)}
               required
              />
            </div>

            <div className="input-block">

              <label htmlFor="images">Fotos</label>

              <div className="images-container">

              

              {previewImages.map((image,index)=>(
                <div 
                key={index} className="image-content">
                  <div
                  className="delete_image"
                  onClick={()=>handleDeleteImage(index)}>
                    <MdClose size={24} color="#FF669D" />
                  </div>
                  <img  src={image.url} alt={name}/>
                </div>
              ))}
    
                <label
                  htmlFor="image[]"
                  className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input
                  onChange={handleSelectImages}
                  multiple
                  type="file"
                  id="image[]"
                  accept="image/*"/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions}
                onChange={event=>setInstructions(event.target.value)}
                required/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Visita</label>
              <input id="opening_hours"
                value={opening_hours}
                onChange={event=>setOpening_hours(event.target.value)}
                required/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends?"active":""}
                  onClick={()=>setOpen_on_weekends(true)}
                  >Sim</button>
                <button
                  type="button"
                  className={!open_on_weekends?"active":""}
                  onClick={()=>setOpen_on_weekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
