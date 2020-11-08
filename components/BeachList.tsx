import React from 'react';
import {Beach} from '../types/Beach';
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Beaches from '../mock/beaches';
import {BeachContainer} from '../state/BeachContainer';
import {Ionicons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selected: {
    backgroundColor: '#ffe699',
  },
  generic: {
    backgroundColor: '#eaf3e2',
  },
  title: {
    fontSize: 18,
  },
});

const FavouriteIcon = (props: {
  color: string;
  size: number;
  focussed: boolean;
}) => (
  <Ionicons
    name={props.focussed ? 'md-heart' : 'md-heart-empty'}
    color={props.color}
    size={props.size}
  />
);

type BeachListItemProps = {
  beach: Beach;
  onPressItem: any;
  onPressFavourite: any;
  isCurrentBeach: boolean;
  isFavouriteBeach: boolean;
};

const BeachListItem = (props: BeachListItemProps) => (
  <View
    style={[
      styles.item,
      props.isCurrentBeach ? styles.selected : styles.generic,
    ]}
  >
    <TouchableOpacity onPress={props.onPressItem}>
      <Text style={styles.title}>{props.beach.label}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={props.onPressFavourite}
      style={{paddingLeft: 20}}
    >
      <FavouriteIcon
        color={'#ff6969'}
        size={32}
        focussed={props.isFavouriteBeach}
      />
    </TouchableOpacity>
  </View>
);

export const BeachList = () => {
  const CurrentBeach = BeachContainer.useContainer();

  const navigation = useNavigation();

  const renderItem = (beach: Beach) => {
    const isCurrentBeach = beach === CurrentBeach.currentBeach;
    const isFavouriteBeach =
      CurrentBeach.favouriteBeach?.includes(beach) ?? false;

    return (
      <BeachListItem
        beach={beach}
        onPressItem={() => {
          CurrentBeach.setCurrentBeach(beach);
          return navigation.navigate('BeachMap', {beach});
        }}
        onPressFavourite={() => {
          CurrentBeach.favouriteBeach?.includes(beach)
            ? CurrentBeach.removeFavouriteBeach(beach)
            : CurrentBeach.addFavouriteBeach(beach);
        }}
        isCurrentBeach={isCurrentBeach}
        isFavouriteBeach={isFavouriteBeach}
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
