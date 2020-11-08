import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {BeachMapScreenProps} from '../types/BeachMapScreenProps';
import MapView from 'react-native-maps';
import {Beach} from '../types/Beach';
import Beaches from '../mock/beaches';
import {BeachPolygons} from '../components/BeachPolygons';
import {BeachContainer} from '../state/BeachContainer';

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
    flexDirection: 'row',
  },
});

export const BeachMapScreen = (props: BeachMapScreenProps) => {
  const CurrentBeach = BeachContainer.useContainer();

  return (
    <>
      <MapView
        region={CurrentBeach.currentBeach.location}
        style={styles.mapview}
      >
        <BeachPolygons
          currentBeach={CurrentBeach.currentBeach}
          favouriteBeaches={CurrentBeach.favouriteBeach}
          navigation={props}
          handleTap={(beach: Beach) => CurrentBeach.setCurrentBeach(beach)}
        />
      </MapView>

      <View style={styles.interactionsview}>
        <Button
          onPress={() => props.navigation.navigate('Home')}
          title="Go Home"
          color="blue"
        />
        <Button
          onPress={() => CurrentBeach.setCurrentBeach(Beaches[0])}
          title="Set Bournemouth"
          color="brown"
        />
      </View>
    </>
  );
};
