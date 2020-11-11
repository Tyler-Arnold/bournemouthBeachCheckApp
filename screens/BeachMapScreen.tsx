import React, {useState} from 'react';
import {LayoutAnimation, NativeModules, StyleSheet} from 'react-native';
import {BeachMapScreenProps} from '../types/BeachMapScreenProps';
import MapView from 'react-native-maps';
import {Beach} from '../types/Beach';
import {BeachPolygons} from '../components/BeachPolygons';
import {BeachContainer} from '../state/BeachContainer';
import {MapInfo} from '../components/MapInfo';
import {HeaderBar} from '../components/HeaderBar';

export const styles = StyleSheet.create({
  mapview: {
    flex: 0.84,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaf3e2',
  },
  interactionsview: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#eaf3e2',
    flexDirection: 'column',
    display: 'flex',
  },
  expandedinfo: {
    flex: 0.3,
  },
  collapsedmap: {
    flex: 0.64,
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
  headertext: {
    fontSize: 20,
  },
  burgericon: {
    color: 'black',
    paddingRight: 20,
    paddingLeft: 10,
  },
});

// Sets up a rule to allow us to use LayoutAnimation
const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

/**
 * Screen containing beach map
 * @param {BeachMapScreenProps} props
 * @return {React.FC<BeachMapScreenProps>}
 */
export const BeachMapScreen: React.FC<BeachMapScreenProps> = (
    props: BeachMapScreenProps,
) => {
  const CurrentBeach = BeachContainer.useContainer();

  const [isInfoDrawer, setIsInfoDrawer] = useState(true);

  /**
   * Toggles the info drawer state
   */
  const toggleInfoDrawer = () => {
    LayoutAnimation.easeInEaseOut();
    setIsInfoDrawer(!isInfoDrawer);
  };

  const currentBeachRegion =
    props.route.params?.beach.location ?? CurrentBeach.beaches[0].location;

  let reference: MapView | null;

  props.navigation.addListener('focus', () =>
    reference?.animateToRegion(currentBeachRegion, 1000),
  );

  return (
    <>
      <HeaderBar title={'Beach Map'} navigation={props.navigation} />
      <MapView
        initialRegion={currentBeachRegion}
        ref={(instance) => (reference = instance)}
        style={[styles.mapview, isInfoDrawer ? styles.collapsedmap : null]}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setIsInfoDrawer(false);
        }}
      >
        <BeachPolygons
          currentBeach={CurrentBeach.currentBeach}
          favouriteBeaches={CurrentBeach.favouriteBeach}
          navigation={props}
          handleTap={(beach: Beach) => {
            LayoutAnimation.easeInEaseOut();
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
