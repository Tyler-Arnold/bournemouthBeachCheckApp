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
import {BeachContainer} from '../state/BeachContainer';
import {Ionicons} from '@expo/vector-icons';
import {CongestionIcon} from './CongestionIcon';

const styles = StyleSheet.create({
  item: {
    padding: 0,
    paddingHorizontal: 0,
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
  highCongestionColour: {
    color: '#e4572e',
  },
  medCongestionColour: {
    color: '#ffc20a',
  },
  lowCongestionColour: {
    color: '#76b041',
  },
  listitemtext: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  favourite: {
    paddingLeft: 10,
    paddingVertical: 5,
    paddingRight: 20,
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
 * @return {React.FC<FavIconProps>}
 */
const FavouriteIcon: React.FC<FavIconProps> = (props: FavIconProps) => (
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
 * @return {React.FC<BeachListItemProps>}
 */
const BeachListItem: React.FC<BeachListItemProps> = (
    props: BeachListItemProps,
) => (
  <TouchableOpacity
    onPress={props.onPressItem}
    style={[
      styles.item,
      props.isCurrentBeach ? styles.selected : styles.generic,
    ]}
  >
    <View style={styles.listitemtext}>
      <CongestionIcon congestion={props.beach.properties?.congestionLevel} />
      <Text style={styles.title}>{props.beach.label}</Text>
    </View>
    <TouchableOpacity onPress={props.onPressFavourite} style={styles.favourite}>
      <FavouriteIcon
        color={'#ff6969'}
        size={32}
        focussed={props.isFavouriteBeach}
      />
    </TouchableOpacity>
  </TouchableOpacity>
);

/**
 * Component for listing beaches and favourite icon
 * @return {React.FC}
 */
export const BeachList: React.FC = () => {
  const CurrentBeach = BeachContainer.useContainer();
  const navigation = useNavigation();

  /**
   * Renders a BeachListItem with individual settings
   * @param {Beach} beach
   * @return {React.FC<Beach>}
   */
  const renderItem: React.FC<Beach> = (beach: Beach) => {
    const isCurrentBeach = beach.label === CurrentBeach.currentBeach;
    const isFavouriteBeach =
      CurrentBeach.favouriteBeach?.includes(beach.label) ?? false;

    return (
      <BeachListItem
        beach={beach}
        onPressItem={() => {
          CurrentBeach.setCurrentBeach(beach.label);
          return navigation.navigate('BeachMap', {beach});
        }}
        onPressFavourite={() => {
          CurrentBeach.favouriteBeach?.includes(beach.label)
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
        data={CurrentBeach.beaches}
        renderItem={(beach) => renderItem(beach.item)}
        keyExtractor={(beach) => beach.label}
        extraData={CurrentBeach.currentBeach}
      />
    </>
  );
};
