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

interface FavIconProps {
  color: string;
  size: number;
  focussed: boolean;
}

/**
 * Heart icon for indicating favourited beaches
 * @param {FavIconProps} props
 * @return {JSX.Element}
 */
const FavouriteIcon = (props: FavIconProps): JSX.Element => (
  <Ionicons
    name={props.focussed ? 'md-heart' : 'md-heart-empty'}
    color={props.color}
    size={props.size}
  />
);

interface BeachListItemProps {
  beach: Beach;
  onPressItem: () => void;
  onPressFavourite: () => void;
  isCurrentBeach: boolean;
  isFavouriteBeach: boolean;
}

/**
 * Component for a single item in the beach flatlist
 * @param {BeachListItemProps} props
 * @return {JSX.Element}
 */
const BeachListItem = (props: BeachListItemProps): JSX.Element => (
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
      style={{paddingLeft: 40}}
    >
      <FavouriteIcon
        color={'#ff6969'}
        size={32}
        focussed={props.isFavouriteBeach}
      />
    </TouchableOpacity>
  </View>
);

/**
 * Component for listing beaches and favourite icon
 * @return {JSX.Element}
 */
export const BeachList = (): JSX.Element => {
  const CurrentBeach = BeachContainer.useContainer();
  const navigation = useNavigation();

  /**
   * Renders a BeachListItem with individual settings
   * @param {Beach} beach
   * @return {JSX.Element}
   */
  const renderItem = (beach: Beach): JSX.Element => {
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
