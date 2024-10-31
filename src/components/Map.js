import React from 'react';
import {createRoot} from "react-dom/client";
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import Card from './Card';

const MainMap = () => {
    return (
        <div className="flex h-96">
          <div className='w-1/3 p-4'>
              <div className='flex'>
                  <img src='/images/bustop_blue.png' style={{ width: '30px' }}/>
                  <h2 className="text-black text-3xl text-center font-bold">STOPify</h2>
              </div>
              
              <div>
                  <input
                    type="text"
                    placeholder="Search your bus..."
                    className="border border-gray-300 rounded-full p-2 m-5 w-80"
                  />
              </div>
              <div>
                <Card></Card>

              </div>
          </div>
          <div className='w-2/3 p-4'>
          <APIProvider apiKey={'AIzaSyA4u5WHz6-4ldEWPwyrjjjhhtkOwVm1lyo'} onLoad={() => console.log('Maps API has loaded.')}>
                    <Map
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
