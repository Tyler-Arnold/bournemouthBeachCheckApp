import {LatLng, Region} from 'react-native-maps';

export interface Beach {
  label: string;
  location: Region;
  polygon: Array<LatLng>;
}
