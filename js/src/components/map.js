import React from 'react';
import { MapboxProvider, MapGL, Source, Layer } from '@react-mapboxgl/core';
import mapboxgl from 'mapbox-gl';
import dispatcher from './dispatcher.js';
import autobind from 'autobind-decorator';

class Map extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      layers: [],
      sources: []
    };
  }

  componentWillReceiveProps( newProps ) {
    if ( newProps.layers && this.state.layers.length != newProps.layers.length ){
      this._update( 'layers', newProps.layers );
    }
    if ( newProps.sources && this.state.sources.length != newProps.sources.length ){
      this._update( 'sources', newProps.sources );
    }
  }

  componentWillMount(){
    if ( this.props.layers && this.state.layers !== this.props.layers.length ) {
      this._update( 'layers', this.props.layers );
    }
    if ( this.props.sources && this.state.sources !== this.props.sources.length ) {
      this._update( 'sources', this.props.sources );
    }

    dispatcher.register( payload => {
      if ( payload.actionType === 'map_update' ) {
        const { data = {} } = payload;
        console.log('DATA', data)
        this.setState( { ...data } );
      }
    } );
  }

  @autobind
  _update( prop, val ){
    this.setState( { [ prop ]: val } );
  }
  
  @autobind
  notify_python( data ) {
    this.props.comm.send({ method: "notify", data } );
  }

  buildLayers( layers ) {
    return layers.map( ( layer, i ) => {} );
  }

  createSources( sources ) {
    return sources.map( ( source, i ) => <Source key={ i } {...source} />);
  }

  render() {
    const { 
      zoom, 
      center = [0.0, 0.0],
      bbox,
      api_key,
      style='mapbox://styles/mapbox/light-v8' 
    } = this.props;

    const { layers, sources } = this.state;

    const options = {
      style,
      center,
      bbox,
      zoom,
      containerStyle: {
        height: "400px",
        width: "100%"
      }
    };

    console.log('Layers', layers);
    console.log('Sources', sources);

    return (
      <MapboxProvider mapboxgl={ mapboxgl } accessToken={ api_key }>
        <MapGL { ...options }>
          { !!sources.length && sources.map( ( source, i ) => <Source key={ i } { ...source } /> ) }
          { !!layers.length && layers.map( ( layer, i ) => <Layer key={ i } { ...layer } /> ) }
        </MapGL>
      </MapboxProvider>
    );
  }
}

export default Map;