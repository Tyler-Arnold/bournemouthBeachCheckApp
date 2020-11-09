import {Beach} from '../types/Beach';
import Beaches from './beaches';
/** @type {*} */
const beachApi: {
  getAllBeaches: () => Beach[];
} = {
  /**
   * generates the beach data
   *
   * @return {Beach[]}
   */
  getAllBeaches(): Beach[] {
    return Beaches.map((beach) => {
      return {
        ...beach,
        properties: {
          congestionLevel: 'low',
          isLifeguard: true,
          isPublicToilets: true,
          isDogsAllowed: true,
          isCyclingAllowed: true,
          isBBQAllowed: true,
        },
      };
    });
  },
};

export default beachApi;
