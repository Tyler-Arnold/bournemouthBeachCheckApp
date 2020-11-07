import React, {useState} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {BeachMapScreenProps} from '../types/BeachMapScreenProps';
import MapView from 'react-native-maps';
import {Beach} from '../types/Beach';
import Beaches from '../mock/beaches';
import {BeachPolygons} from '../components/BeachPolygons';

const styles = StyleSheet.create({
  mapview: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'bisque',
  },
  interactionsview: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'bisque',
  },
});

interface BeachMapScreenState {
  currentBeach: Beach;
}

export const BeachMapScreen = (props: BeachMapScreenProps) => {
  const initialState: BeachMapScreenState = {
    currentBeach:
      props.route.params?.beach ??
      Beaches.find((beach) => beach.label === 'BournemouthBeachPier') ??
      Beaches[0],
  };

  const [state, setState] = useState<BeachMapScreenState>(initialState);

  props.navigation.addListener('focus', () => {
    setState({...state, currentBeach: props.route.params!.beach});
  });

  return (
    <>
      <MapView region={state.currentBeach.location} style={styles.mapview}>
        <BeachPolygons
          currentBeach={state.currentBeach}
          navigation={props}
          handleTap={(beach: Beach) =>
            setState({...state, currentBeach: beach})
          }
        />
      </MapView>

      <View style={styles.interactionsview}>
        <Button
          onPress={() => props.navigation.navigate('Home')}
          title="Go Home"
          color="blue"
        />
        <Button
          onPress={() => setState({...state, currentBeach: Beaches[0]})}
          title="Set Bournemouth"
          color="brown"
        />
      </View>
    </>
  );
};
