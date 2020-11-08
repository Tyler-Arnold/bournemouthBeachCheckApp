import {useState} from 'react';
import {createContainer} from 'unstated-next';
import Beaches from '../mock/beaches';
import {Beach} from '../types/Beach';

/**
 * Container for Beach access
 * @param {Beach} initialState
 * @return {Beach}
 */
function useBeach(initialState = Beaches[0]) {
  const [currentBeach, setCurrentBeach] = useState(initialState);
  const [favouriteBeach, setFavouriteBeach] = useState<Beach[] | undefined>();
  const addFavouriteBeach = (beach: Beach) => {
    return favouriteBeach
      ? setFavouriteBeach([...favouriteBeach, beach])
      : setFavouriteBeach([beach]);
  };
  const removeFavouriteBeach = (beach: Beach) => {
    return favouriteBeach
      ? setFavouriteBeach([...favouriteBeach.filter((value) => value != beach)])
      : setFavouriteBeach;
  };
  // TODO: come back and make this less gross, add an addFavouriteBeach
  return {
    currentBeach,
    setCurrentBeach,
    favouriteBeach,
    setFavouriteBeach,
    addFavouriteBeach,
    removeFavouriteBeach,
  };
}

export const BeachContainer = createContainer(useBeach);
