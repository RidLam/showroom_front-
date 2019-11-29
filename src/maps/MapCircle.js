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
    const {shape, height, width} = this.props;
    const polygonPoints = shape;
    const polygonOptions = {
    style: {
        fillColor: "#FFFFCC",
        strokeColor: "red",
        lineWidth: 5
    }
    };
    
    
    const circleOptions = {
                style: {
                    strokeColor: "rgba(255, 0, 0, 1)", // Color of the perimeter
                    lineWidth: 2,
                    fillColor: "#BB225A" // Color of the circle
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
                    height: "300px",
                    width: "500px",
                    
                    }}
                    zoom={20}
                    mapOptions={{ 
                        center: { lat: 52.5321472, lng: 13.3935785 }, 
                        bounds: true,
                        autoColor: true
                    }}
                >
                    <HMapCircle
                        coords={this.state.circleCoords} 
                        options={circleOptions} 
                        />
                </HMap>
                </HPlatform>
           
    </div>
    )
  }
}

export default MapCircle;