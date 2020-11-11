import {Polygon} from 'react-native-maps';
import React from 'react';
import {Beach} from '../types/Beach';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootParamsType} from '../types/RootParamsType';
import {BeachContainer} from '../state/BeachContainer';

interface BeachPolygonsProps {
  currentBeach: string;
  favouriteBeaches: string[] | undefined;
  handleTap: (beach: Beach) => void;
  navigation: DrawerScreenProps<RootParamsType, 'BeachMap'>;
}

const rgbaValues: { [id: string]: string } = {
  lowCongestion: 'rgba(118, 176, 65, 0.5)',
  medCongestion: 'rgba(255, 230, 153, 0.5)',
  highCongestion: 'rgba(228, 87, 46, 0.5)',
  currentOutline: 'rgba(250, 255, 50, 1)',
  favouriteOutline: 'rgba(228, 87, 46, 1)',
};

/**
 * Beach polygons
 * @param {BeachPolygonsProps} props
 * @return {React.FC<BeachPolygonsProps>}
 */
export const BeachPolygons: React.FC<BeachPolygonsProps> = (
    props: BeachPolygonsProps,
) => {
  const beachContainer = BeachContainer.useContainer();
  const polygons = beachContainer.beaches.map((beach, index) => {
    const beachCongestion = beach.properties?.congestionLevel;
    const isCurrentBeach = beach.label === props.currentBeach;
    const isFavouriteBeach = props.favouriteBeaches?.includes(beach.label);
    return (
      <Polygon
        coordinates={beach.polygon}
        fillColor={
          beachCongestion === 'high'
            ? rgbaValues['highCongestion']
            : beachCongestion === 'med'
            ? rgbaValues['medCongestion']
            : rgbaValues['lowCongestion']
        }
        strokeWidth={isCurrentBeach || isFavouriteBeach ? 2 : 0}
        strokeColor={
          isFavouriteBeach && !isCurrentBeach
            ? rgbaValues['favouriteOutline']
            : rgbaValues['currentOutline']
        }
        tappable={true}
        onPress={() => props.handleTap(beach)}
        key={index}
      />
    );
  });

  return <>{polygons}</>;
};
