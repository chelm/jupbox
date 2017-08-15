# Jup Box Hero

A Python interface to [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl) for using in a Jupyter Notebook. 

## Install

```bash
pip install https://github.com/chelm/jupbox/archive/master.zip && jupyter nbextension enable --py jupbox
```

## Example usage 

```python

from jupbox import Map, GeoJsonLayer
from IPython.display import display

m = Map(zoom=10, center=[lon, lat], api_key='YOUR_MB_TOKEN')

layer = GeoJsonLayer(geojson, style={})

m.add_layer(layer)

display(m)
```
