import { Polygon } from "react-native-maps";
import { Beach } from "../types/Beach";

const BournemouthBeachPier: Beach = {
  label: "BournemouthBeachPier",
  location: {
    latitude: 50.714247,
    longitude: -1.874762,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.00421,
  },
  polygon: [
    { latitude: 50.715614, longitude: -1.875504 },
    { latitude: 50.71476, longitude: -1.875109 },
    { latitude: 50.714613, longitude: -1.875235 },
    { latitude: 50.713703, longitude: -1.874774 },
    { latitude: 50.713714, longitude: -1.874704 },
    { latitude: 50.713696, longitude: -1.874692 },
    { latitude: 50.713641, longitude: -1.874531 },
    { latitude: 50.713643, longitude: -1.874447 },
    { latitude: 50.713662, longitude: -1.874389 },
    { latitude: 50.713789, longitude: -1.874297 },
    { latitude: 50.713803, longitude: -1.874226 },
    { latitude: 50.714712, longitude: -1.874691 },
    { latitude: 50.714781, longitude: -1.874903 },
    { latitude: 50.714785, longitude: -1.874946 },
    { latitude: 50.715616, longitude: -1.875359 },
  ],
};

const BournemouthBeachEast: Beach = {
  label: "BournemouthBeachEast",
  location: {
    latitude: 50.714247,
    longitude: -1.874762,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.00421,
  },
  polygon: [
    { latitude: 50.71562, longitude: -1.875439 },
    { latitude: 50.716169, longitude: -1.875669 },
    { latitude: 50.716355, longitude: -1.873468 },
    { latitude: 50.716776, longitude: -1.871312 },
    { latitude: 50.717244, longitude: -1.8682 },
    { latitude: 50.717, longitude: -1.868157 },
    { latitude: 50.716633, longitude: -1.869616 },
    { latitude: 50.716123, longitude: -1.871977 },
    { latitude: 50.715784, longitude: -1.873876 },
    { latitude: 50.71556, longitude: -1.875045 },
  ],
};

const BournemouthBeachWest: Beach = {
  label: "BournemouthBeachWest",
  location: {
    latitude: 50.714247,
    longitude: -1.874762,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.00421,
  },
  polygon: [
    { latitude: 50.715625, longitude: -1.875437 },
    { latitude: 50.716169, longitude: -1.875669 },
    { latitude: 50.715773, longitude: -1.876703 },
    { latitude: 50.71492, longitude: -1.881172 },
    { latitude: 50.714662, longitude: -1.881086 },
    { latitude: 50.714574, longitude: -1.881054 },
    { latitude: 50.71472, longitude: -1.879959 },
    { latitude: 50.714835, longitude: -1.878699 },
  ],
};

const Beaches = {
  BournemouthBeachPier,
  BournemouthBeachEast,
};

export default Beaches;
