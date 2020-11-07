import React, {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HomeScreenProps} from '../types/HomeScreenProps';
import {Beach} from '../types/Beach';
import Beaches from '../mock/beaches';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  button: {},
  item: {
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

type BeachListItemProps = { beach: Beach; onPress: any; style: ViewStyle };

const BeachListItem = (props: BeachListItemProps) => (
  <TouchableOpacity onPress={props.onPress} style={[styles.item, props.style]}>
    <Text style={styles.title}>{props.beach.label}</Text>
  </TouchableOpacity>
);

export const HomeScreen = ({navigation}: HomeScreenProps): JSX.Element => {
  const [selectedBeach, setSelectedBeach] = useState<string | null>(null);

  const renderItem = (beach: Beach) => {
    const backgroundColor =
      beach.label === selectedBeach ? '#6e3b6e' : '#f9c2ff';

    return (
      <BeachListItem
        beach={beach}
        onPress={() => {
          setSelectedBeach(beach.label);

          return navigation.navigate('BeachMap', {beach});
        }}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <View style={styles.view}>
      <Button
        onPress={() => navigation.navigate('BeachMap')}
        title="Go to beach"
        color="skyblue"
      />
      <View style={styles.container}>
        <FlatList
          data={Beaches}
          renderItem={(beach) => renderItem(beach.item)}
          keyExtractor={(beach) => beach.label}
          extraData={selectedBeach}
        />
      </View>
    </View>
  );
};
