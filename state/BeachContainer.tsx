import {useState} from 'react';
import {createContainer} from 'unstated-next';
import Beaches from '../mock/beaches';
import {Beach} from '../types/Beach';

interface UseBeachInterface {
  currentBeach: Beach;
  setCurrentBeach: React.Dispatch<React.SetStateAction<Beach>>;
  favouriteBeach: Beach[] | undefined;
  setFavouriteBeach: React.Dispatch<React.SetStateAction<Beach[] | undefined>>;
  addFavouriteBeach: (beach: Beach) => void;
  removeFavouriteBeach: (
    beach: Beach
  ) => void | React.Dispatch<Beach[] | undefined>;
}

/**
 * Container for Beach access
 * @param {Beach} initialState
 * @return {UseBeachInterface}
 */
function useBeach(initialState: Beach = Beaches[0]): UseBeachInterface {
  const [currentBeach, setCurrentBeach] = useState(initialState);
  const [favouriteBeach, setFavouriteBeach] = useState<Beach[] | undefined>();
  /**
   * Adds a beach to the favourites list
   * @param {Beach} beach
   * @return {void}
   */
  const addFavouriteBeach = (beach: Beach): void => {
    return favouriteBeach
      ? setFavouriteBeach([...favouriteBeach, beach])
      : setFavouriteBeach([beach]);
  };

  /**
   * Removes a beaches from favourites list
   * @param {Beach} beach
   * @return {void | React.Dispatch<React.SetStateAction<Beach[] | undefined>>}
   */
  const removeFavouriteBeach = (beach: Beach) => {
    return favouriteBeach
      ? setFavouriteBeach([...favouriteBeach.filter((value) => value != beach)])
      : setFavouriteBeach;
  };

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
