import {Beach} from '../types/Beach';
import Beaches from './beaches';

/**
 * Returns a random boolean value
 * @return {boolean} a random bool
 */
const randomBoolean = () => Math.random() <= 0.5;

/**
 * Returns a random Congestion value
 * @return {'low' | 'med' | 'high'}
 */
const randomCongestion = () =>
  Math.random() <= 0.5 ? 'low' : Math.random() <= 0.8 ? 'med' : 'high';

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
          congestionLevel: randomCongestion(),
          isLifeguard: randomBoolean(),
          isPublicToilets: randomBoolean(),
          isDogsAllowed: randomBoolean(),
          isCyclingAllowed: randomBoolean(),
          isBBQAllowed: randomBoolean(),
        },
      };
    });
  },
};

export default beachApi;
