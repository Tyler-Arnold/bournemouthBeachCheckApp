import {useState} from 'react';
import {createContainer} from 'unstated-next';
import Beaches from '../mock/beaches';

/**
 * Container for Beach access
 * @param {Beach} initialState
 * @return {Beach}
 */
function useBeach(initialState = Beaches[0]) {
  const [currentBeach, setCurrentBeach] = useState(initialState);
  return {currentBeach, setCurrentBeach};
}

export const BeachContainer = createContainer(useBeach);
