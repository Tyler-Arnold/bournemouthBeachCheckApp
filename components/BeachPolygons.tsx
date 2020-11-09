import {Polygon} from 'react-native-maps';
import React from 'react';
import {Beach} from '../types/Beach';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootParamsType} from '../types/RootParamsType';
import {BeachContainer} from '../state/BeachContainer';

interface BeachPolygonsProps {
  currentBeach: Beach;
  favouriteBeaches: Beach[] | undefined;
  handleTap: (beach: Beach) => void;
  navigation: DrawerScreenProps<RootParamsType, 'BeachMap'>;
}

/**
 * Beach polygons
 * @param {BeachPolygonsProps} props
 * @return {JSX.Element}
 */
export const BeachPolygons = (props: BeachPolygonsProps): JSX.Element => {
  const beachContainer = BeachContainer.useContainer();
  const polygons = beachContainer.beaches.map((beach, index) => {
    return (
      <Polygon
        coordinates={beach.polygon}
        fillColor={'rgba(0,255,0,0.3)'}
        strokeWidth={
          beach === props.currentBeach
          || props.favouriteBeaches?.includes(beach)
            ? 2
            : 0
        }
        strokeColor={
          props.favouriteBeaches?.includes(beach)
          && props.currentBeach !== beach
            ? 'rgba(228,87,46,1)' // move this stuff to styles or an object
            : 'rgba(250,255,50,1)'
        }
        tappable={true}
        onPress={() => props.handleTap(beach)}
        key={index}
      />
    );
  });

  return <>{polygons}</>;
};
