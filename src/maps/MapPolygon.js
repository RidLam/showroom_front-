import React from 'react'
import HPlatform, { HMap, HMapPolygon, HMapCircle, HMapPolyLine, HMapRoute , HMapGeoCode, HMapMarker  } from "react-here-map";


 
class MapPolygon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           lat: '',
           lng: '',
           circleCoords : { lat: 48.8566, lng: 2.3522 }
        }
    }

   
    

  render() {
    const {shape, height, width} = this.props;
    const polygonPoints = shape;
    const polygonOptions = {
    style: {
        fillColor: "#BB225A",
        strokeColor: "#BB225A",
        lineWidth: 2
    }
    };
    
    
    const circleOptions = {
                style: {
                    strokeColor: "rgba(255, 0, 0, 1)", // Color of the perimeter
                    lineWidth: 2,
                    fillColor: "rgba(100, 100, 100, 0.6)" // Color of the circle
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
                    zoom={22}
                    mapOptions={{ 
                        //center: { lat: 52.5321472, lng: 13.3935785 }, 
                        bounds: true,
                        autoColor: true
                    }}
                >
                    <HMapPolyLine 
                        points={polygonPoints} 
                        options={polygonOptions} 
                        />
                </HMap>
                </HPlatform>
           
    </div>
    )
  }
}

export default MapPolygon;