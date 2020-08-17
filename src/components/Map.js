import React from 'react'
import axios from 'axios'
import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
class Map extends React.Component {
  state = {
    bikepoints: [],
    clickMarker: null,
    currentLocation: null
  }
  async componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(data => {
      this.setState({ currentLocation: [data.coords.longitude, data.coords.latitude] })
    })
    try {
      const res = await axios.get('https://api.tfl.gov.uk/bikepoint')
      this.setState({ bikepoints: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  handleMapClick = event => {
    this.setState({ clickMarker: event.lngLat })
  }
  render() {
    console.log(this.state)
    return (
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        height={'100vh'}
        width={'100vw'}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        latitude={51.515}
        longitude={-0.078}
        zoom={10}
        onClick={this.handleMapClick}
      >
        {this.state.bikepoints.map(point => (
          <Marker
            key={point.id}
            latitude={point.lat}
            longitude={point.lon}
          >
           
          </Marker>
        ))}
        {this.state.clickMarker &&
          <Marker
            latitude={this.state.clickMarker[1]}
            longitude={this.state.clickMarker[0]}
          >
           
          </Marker>
        }
        {this.state.currentLocation &&
          <Marker
            latitude={this.state.currentLocation[1]}
            longitude={this.state.currentLocation[0]}
          >
            <span role="img" aria-label="marker">🙊</span>
          </Marker>
        }
      </MapGL>
    )
  }
}
export default Map