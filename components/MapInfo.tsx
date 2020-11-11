import React from 'react';
import {View, Text, ViewStyle, StyleProp} from 'react-native';
import {StyleSheet} from 'react-native';
import {BeachContainer} from '../state/BeachContainer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootParamsType} from '../types/RootParamsType';
import {CongestionIcon} from './CongestionIcon';

const styles = StyleSheet.create({
  mapview: {
    flex: 0.9,
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
    flexDirection: 'row',
    alignItems: 'center',
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
 * @return {React.FC}
 */
export const MapInfo: React.FC<MapInfoProps> = (props: MapInfoProps) => {
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

  const currentBeach = BeachContain.beaches.find(
      (beach) => beach.label === BeachContain.currentBeach,
  );
  const lifeguarded = currentBeach?.properties?.isLifeguard ? 'Yes' : 'No';
  const publicToilets = currentBeach?.properties?.isPublicToilets
    ? 'Yes'
    : 'No';
  const dogExercise = currentBeach?.properties?.isDogsAllowed ? 'Yes' : 'No';
  const cycling = currentBeach?.properties?.isCyclingAllowed ? 'Yes' : 'No';
  const BBQs = currentBeach?.properties?.isBBQAllowed ? 'Yes' : 'No';

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
        <CongestionIcon
          congestion={currentBeach?.properties?.congestionLevel}
        />
        <Text
          style={{fontSize: 20}}
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
