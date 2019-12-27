import React from 'react'
import HPlatform, { HMap, HMapPolygon, HMapCircle, HMapPolyLine, HMapRoute , HMapGeoCode, HMapMarker  } from "react-here-map";


 
class MapCircle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           lat: '',
           lng: '',
           circleCoords : { lat: 48.8566, lng: 2.3522 }
        }
    }

   
    

  render() {
    const {shape, height, width, coords} = this.props;
    const polygonPoints = shape;
    
    
    
    const circleOptions = {
                style: {
                    strokeColor: "rgba(255, 0, 0, 1)", // Color of the perimeter
                    lineWidth: 1,
                    fillColor: "rgba(187,34,90,0.1)" // Color of the circle
                }
            };
    
         
    return (
        <div style={{alignContent: 'center'}}>
            <HPlatform
                app_id="2Ts3vDUTLPW8kNUtyFRY"
                app_code="MDivMVFtNkpim-dWuetlWw"
                useCIT
                useHTTPS
                includeUI
                includePlaces
                interactive
                animateCenter={true}
                animateZoom={true}
                >
                <HMap
                    style={{
                    height: height,
                    width: width,
                    
                    }}
                    mapOptions={{ 
                        center: coords, 
                        bounds: true,
                        autoColor: true,
                        zoom: 12
                    }}
                >
                    <HMapCircle
                        coords={coords} 
                        options={circleOptions} 
                        radius={1400}
                        />
                </HMap>
                </HPlatform>
           
    </div>
    )
  }
}

export default MapCircle;