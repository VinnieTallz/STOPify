import React from 'react';
import {createRoot} from "react-dom/client";
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import Card from './Card';

const MainMap = () => {
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-96">
        <div className='w-full md:w-1/3 p-4'>
            <div className='flex items-center'>
                <img src='/images/bustop_blue.png' style={{ width: '30px' }} alt="Bus Stop Icon" />
                <h2 className="text-black text-2xl md:text-3xl text-center font-bold ml-2">STOPify</h2>
            </div>

                <input
                    type="text"
                    placeholder="Search your bus..."
                    className="border border-gray-300 rounded-full p-2 my-4 w-full" 
                />
    
            <div>
                <Card />
            </div>
        </div>

        <div className='w-full md:w-2/3'>
        <APIProvider apiKey={'AIzaSyA4u5WHz6-4ldEWPwyrjjjhhtkOwVm1lyo'} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
              className="rounded-lg overflow-hidden w-full h-80 md:h-full"
                defaultZoom={13}
                defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
                onCameraChanged={ (ev: MapCameraChangedEvent) =>
                  console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }>
            </Map>
        </APIProvider>
        </div>     
    </div>
);



};

export default MainMap;


