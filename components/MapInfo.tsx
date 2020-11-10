import React from 'react';
import {View, Text, ViewStyle, StyleProp} from 'react-native';
import {BeachContainer} from '../state/BeachContainer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootParamsType} from '../types/RootParamsType';
import {styles} from '../screens/BeachMapScreen';

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
export const MapInfo = (props: MapInfoProps): JSX.Element => {
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
