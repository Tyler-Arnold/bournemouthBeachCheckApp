import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {BeachMapScreenProps} from '../types/BeachMapScreenProps';
import MapView from 'react-native-maps';
import {Beach} from '../types/Beach';
import {BeachPolygons} from '../components/BeachPolygons';
import {BeachContainer} from '../state/BeachContainer';
import {MapInfo} from '../components/MapInfo';

const styles = StyleSheet.create({
  mapview: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'bisque',
  },
  interactionsview: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'bisque',
    flexDirection: 'column',
    display: 'flex',
  },
  expandedinfo: {
    flex: 0.3,
  },
  collapsedmap: {
    flex: 0.7,
  },
  title: {
    fontSize: 26,
    padding: 1,
    flex: 1,
  },
  congestion: {
    fontSize: 20,
    padding: 1,
    flex: 1,
  },
  buttons: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hidden: {
    display: 'none',
  },
});

/**
 * Screen containing beach map
 * @param {BeachMapScreenProps} props
 * @return {JSX.Element}
 */
export const BeachMapScreen = (props: BeachMapScreenProps): JSX.Element => {
  const CurrentBeach = BeachContainer.useContainer();

  const [isInfoDrawer, setIsInfoDrawer] = useState(true);
  /**
   * Toggles the info drawer state
   */
  const toggleInfoDrawer = () => {
    setIsInfoDrawer(!isInfoDrawer);
  };

  const currentBeachRegion = CurrentBeach.beaches.find(
      (beach) => beach.label === CurrentBeach.currentBeach,
  )?.location;

  return (
    <>
      <MapView
        region={currentBeachRegion}
        style={[styles.mapview, isInfoDrawer ? styles.collapsedmap : null]}
      >
        <BeachPolygons
          currentBeach={CurrentBeach.currentBeach}
          favouriteBeaches={CurrentBeach.favouriteBeach}
          navigation={props}
          handleTap={(beach: Beach) => {
            setIsInfoDrawer(true);
            return CurrentBeach.setCurrentBeach(beach.label);
          }}
        />
      </MapView>

      <MapInfo
        navigate={props.navigation}
        style={[
          styles.interactionsview,
          isInfoDrawer ? styles.expandedinfo : styles.interactionsview,
        ]}
        drawerState={{isInfoDrawer, setIsInfoDrawer, toggleInfoDrawer}}
      ></MapInfo>
    </>
  );
};
