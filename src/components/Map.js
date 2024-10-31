import React from 'react';
import {createRoot} from "react-dom/client";
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

const MainMap = () => {
    return (
        <div className="flex justify-center items-center h-96 bg-gray-200">
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
    );


};

export default MainMap;
