import { cssInterop } from 'nativewind';
import React from 'react';
import MapView, { MapViewProps } from 'react-native-maps';

interface StyledMapViewProps extends MapViewProps {}

const StyledMapView = React.forwardRef<MapView, StyledMapViewProps>(
  (props, ref) => <MapView ref={ref} {...props} />
);

export default cssInterop(StyledMapView, {
  className: {
    target: 'style',
  },
});
