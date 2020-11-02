import {Polygon} from 'react-native-maps';
import Beaches from '../mock/beaches';
import React from 'react';
import {Beach} from '../types/Beach';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootParamsType} from '../types/RootParamsType';

export const BeachPolygons = (props: {
  currentBeach: Beach;
  handleTap: Function;
  navigation: DrawerScreenProps<RootParamsType, 'BeachMap'>;
}): JSX.Element => {
  const polygons = Beaches.map((beach, index) => {
    return (
      <Polygon
        coordinates={beach.polygon}
        fillColor={'rgba(0,255,0,0.3)'}
        strokeWidth={beach === props.currentBeach ? 2 : 0}
        strokeColor={'rgba(250,255,50,1)'}
        tappable={true}
        onPress={() => props.handleTap(beach)}
        key={index}
      />
    );
  });

  return <>{polygons}</>;
};
