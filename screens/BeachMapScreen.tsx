import React, {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';
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
    padding: 5,
    flex: 1,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hidden: {
    display: 'none',
  },
});

const MapInfo = (props: {
  navigate: Function;
  style: StyleProp<ViewStyle>;
  drawerState: {
    isInfoDrawer: boolean;
    setIsInfoDrawer: Function;
    toggleInfoDrawer: Function;
  };
}) => {
  const BeachContain = BeachContainer.useContainer();

  return (
    <View style={props.style}>
      <View style={styles.title}>
        <Text
          style={styles.title}
          onPress={() => props.drawerState.toggleInfoDrawer()}
        >
          {BeachContain.currentBeach.label}
        </Text>
      </View>
      <View
        style={props.drawerState.isInfoDrawer ? styles.buttons : styles.hidden}
      >
        <View>
          <Text>{'info'}</Text>
        </View>
        <View>
          <Button
            onPress={() => props.navigate('Home')}
            title="Go Home"
            color="blue"
          />
          <Button
            onPress={() => BeachContain.setCurrentBeach(Beaches[0])}
            title="Set Bournemouth"
            color="brown"
          />
        </View>
      </View>
    </View>
  );
};

export const BeachMapScreen = (props: BeachMapScreenProps) => {
  const CurrentBeach = BeachContainer.useContainer();

  const [isInfoDrawer, setIsInfoDrawer] = useState(true);
  const toggleInfoDrawer = () => {
    setIsInfoDrawer(!isInfoDrawer);
  };

  return (
    <>
      <MapView
        region={CurrentBeach.currentBeach.location}
        style={[styles.mapview, isInfoDrawer ? styles.collapsedmap : null]}
      >
        <BeachPolygons
          currentBeach={CurrentBeach.currentBeach}
          favouriteBeaches={CurrentBeach.favouriteBeach}
          navigation={props}
          handleTap={(beach: Beach) => {
            setIsInfoDrawer(true);
            return CurrentBeach.setCurrentBeach(beach);
          }}
        />
      </MapView>

      <MapInfo
        navigate={props.navigation.navigate}
        style={[
          styles.interactionsview,
          isInfoDrawer ? styles.expandedinfo : styles.interactionsview,
        ]}
        drawerState={{isInfoDrawer, setIsInfoDrawer, toggleInfoDrawer}}
      ></MapInfo>
    </>
  );
};
