import {LatLng, Region} from 'react-native-maps';

export interface Beach {
  label: string;
  location: Region;
  polygon: Array<LatLng>;
  properties: {
    congestionLevel: 'low' | 'med' | 'high';
    isLifeguard: boolean;
    isPublicToilets: boolean;
    isDogsAllowed: boolean;
    isCyclingAllowed: boolean;
    isBBQAllowed: boolean;
  } | null;
}
