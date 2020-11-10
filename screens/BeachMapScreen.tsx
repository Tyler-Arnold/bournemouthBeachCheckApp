import React, {useState} from 'react';
import {View, StyleSheet, Text, ViewStyle, StyleProp} from 'react-native';
import {BeachMapScreenProps} from '../types/BeachMapScreenProps';
import MapView from 'react-native-maps';
import {Beach} from '../types/Beach';
import {BeachPolygons} from '../components/BeachPolygons';
import {BeachContainer} from '../state/BeachContainer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootParamsType} from '../types/RootParamsType';

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

interface DrawerState {
  isInfoDrawer: boolean;
  setIsInfoDrawer: (isInfoDrawer: boolean) => void;
  toggleInfoDrawer: () => void;
}

interface MapInfoProps {
  navigate: DrawerNavigationProp<RootParamsType, 'BeachMap'>;
  style: StyleProp<ViewStyle>;
  drawerState: DrawerState;
}

/**
 * Drawer at bottom of map screen, containing info about current beach
 * @param {MapInfoProps} props
 * @return {JSX.Element}
 */
const MapInfo = (props: MapInfoProps): JSX.Element => {
  const BeachContain = BeachContainer.useContainer();

  /**
   * capitalises first letter of string
   * @param {string} s
   * @return {string}
   */
  const capitalise = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const congestionLevel = capitalise(
      BeachContain.beaches.find(
          (beach) => beach.label === BeachContain.currentBeach,
      )?.properties?.congestionLevel ?? 'Low',
  );

  const lifeguarded = BeachContain.beaches.find(
      (beach) => beach.label === BeachContain.currentBeach,
  )?.properties?.isLifeguard
    ? 'Yes'
    : 'No';
  const publicToilets = BeachContain.beaches.find(
      (beach) => beach.label === BeachContain.currentBeach,
  )?.properties?.isPublicToilets
    ? 'Yes'
    : 'No';
  const dogExercise = BeachContain.beaches.find(
      (beach) => beach.label === BeachContain.currentBeach,
  )?.properties?.isDogsAllowed
    ? 'Yes'
    : 'No';
  const cycling = BeachContain.beaches.find(
      (beach) => beach.label === BeachContain.currentBeach,
  )?.properties?.isCyclingAllowed
    ? 'Yes'
    : 'No';
  const BBQs = BeachContain.beaches.find(
      (beach) => beach.label === BeachContain.currentBeach,
  )?.properties?.isBBQAllowed
    ? 'Yes'
    : 'No';

  return (
    <View style={props.style}>
      <View style={styles.title}>
        <Text
          style={styles.title}
          onPress={() => props.drawerState.toggleInfoDrawer()}
        >
          {BeachContain.currentBeach}
        </Text>
      </View>
      <View style={styles.congestion}>
        <Text
          style={styles.congestion}
          onPress={() => props.drawerState.toggleInfoDrawer()}
        >
          {`${congestionLevel} Congestion`}
        </Text>
      </View>
      <View
        style={props.drawerState.isInfoDrawer ? styles.buttons : styles.hidden}
      >
        <View>
          <Text>{`Lifeguarded: ${lifeguarded}`}</Text>
          <Text>{`Is Public Toilets: ${publicToilets}`}</Text>
          <Text>{`Can Dogs Exercise: ${dogExercise}`}</Text>
          <Text>{`Cycling: ${cycling}`}</Text>
          <Text>{`BBQs Allowed: ${BBQs}`}</Text>
        </View>
      </View>
    </View>
  );
};

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

  return (
    <>
      <MapView
        region={
          CurrentBeach.beaches.find(
              (beach) => beach.label === CurrentBeach.currentBeach,
          )?.location
        }
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
