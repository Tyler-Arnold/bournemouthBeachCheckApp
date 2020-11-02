import {LatLng, Region} from 'react-native-maps';

export type Beach = {
  label: string;
  location: Region;
  polygon: Array<LatLng>;
};
