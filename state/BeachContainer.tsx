import {useState} from 'react';
import {LogBox} from 'react-native';
import {createContainer} from 'unstated-next';
import {useInterval} from '../hooks/useInterval';
import beachApi from '../mock/beachApi';
import {Beach} from '../types/Beach';

interface UseBeachInterface {
  beaches: Beach[];
  setBeaches: React.Dispatch<React.SetStateAction<Beach[]>>;
  currentBeach: string;
  setCurrentBeach: React.Dispatch<React.SetStateAction<string>>;
  favouriteBeach: string[] | undefined;
  setFavouriteBeach: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  addFavouriteBeach: (beach: Beach) => void;
  removeFavouriteBeach: (
    beach: Beach
  ) => void | React.Dispatch<string[] | undefined>;
}

/**
 * Container for Beach access
 * @param {Beach} initialState
 * @return {UseBeachInterface}
 */
function useBeach(
    initialState: Beach[] = beachApi.getAllBeaches(),
): UseBeachInterface {
  const [beaches, setBeaches] = useState(initialState);
  const [currentBeach, setCurrentBeach] = useState(initialState[0].label);
  const [favouriteBeach, setFavouriteBeach] = useState<string[] | undefined>();

  /**
   * Adds a beach to the favourites list
   * @param {Beach} beach
   * @return {void}
   */
  const addFavouriteBeach = (beach: Beach): void => {
    return favouriteBeach
      ? setFavouriteBeach([...favouriteBeach, beach.label])
      : setFavouriteBeach([beach.label]);
  };

  /**
   * Removes a beaches from favourites list
   * @param {Beach} beach
   * @return {void | React.Dispatch<React.SetStateAction<Beach[] | undefined>>}
   */
  const removeFavouriteBeach = (beach: Beach) => {
    return favouriteBeach
      ? setFavouriteBeach([
        ...favouriteBeach.filter((value) => value != beach.label),
      ])
      : setFavouriteBeach;
  };

  // ignore this warning because our mock api refreshes on a long timer
  // see https://github.com/facebook/react-native/issues/12981
  // (jist is that you shouldn't use long timers because backgrounding the app
  // will break them, but I don't care)
  LogBox.ignoreLogs(['Setting a timer']);

  /**
   * Updates the beach data in state every 5 minutes
   */
  useInterval(() => {
    setBeaches(beachApi.getAllBeaches());
  }, 30000);

  return {
    beaches,
    setBeaches,
    currentBeach,
    setCurrentBeach,
    favouriteBeach,
    setFavouriteBeach,
    addFavouriteBeach,
    removeFavouriteBeach,
  };
}

export const BeachContainer = createContainer(useBeach);
