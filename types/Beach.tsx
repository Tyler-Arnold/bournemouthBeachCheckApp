import {LatLng, Region} from 'react-native-maps';
import {CongestionLevel} from './CongestionLevel';

export interface Beach {
  label: string;
  location: Region;
  polygon: Array<LatLng>;
  properties: {
    congestionLevel: CongestionLevel;
    isLifeguard: boolean;
    isPublicToilets: boolean;
    isDogsAllowed: boolean;
    isCyclingAllowed: boolean;
    isBBQAllowed: boolean;
  } | null;
}
