import React from 'react';
import {Beach} from '../types/Beach';
import {
  FlatList,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Beaches from '../mock/beaches';
import {BeachContainer} from '../state/BeachContainer';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

type BeachListItemProps = { beach: Beach; onPress: any; style: ViewStyle };

const BeachListItem = (props: BeachListItemProps) => (
  <TouchableOpacity onPress={props.onPress} style={[styles.item, props.style]}>
    <Text style={styles.title}>{props.beach.label}</Text>
  </TouchableOpacity>
);

export const BeachList = () => {
  const CurrentBeach = BeachContainer.useContainer();

  const navigation = useNavigation();

  const renderItem = (beach: Beach) => {
    const backgroundColor =
      beach === CurrentBeach.currentBeach ? '#6e3b6e' : '#f9c2ff';

    return (
      <BeachListItem
        beach={beach}
        onPress={() => {
          CurrentBeach.setCurrentBeach(beach);
          return navigation.navigate('BeachMap', {beach});
        }}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <>
      <FlatList
        data={Beaches}
        renderItem={(beach) => renderItem(beach.item)}
        keyExtractor={(beach) => beach.label}
        extraData={CurrentBeach.currentBeach}
      />
    </>
  );
};
