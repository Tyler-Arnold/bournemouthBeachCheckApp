import React from 'react';
import {StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {CongestionLevel} from '../types/CongestionLevel';

const styles = StyleSheet.create({
  highCongestionColour: {
    color: '#e4572e',
  },
  medCongestionColour: {
    color: '#ffc20a',
  },
  lowCongestionColour: {
    color: '#76b041',
  },
  congestionIcon: {
    marginRight: 10,
  },
});

interface CongestionIconProps {
  congestion: CongestionLevel | undefined;
}
/**
 * Congestion Icon
 * @param {CongestionIconProps} props
 * @return {React.FC<CongestionIconProps>}
 */
export const CongestionIcon: React.FC<CongestionIconProps> = (
    props: CongestionIconProps,
) => {
  return (
    <Ionicons
      size={32}
      name={`md-${
        props.congestion === 'high'
          ? 'close-circle'
          : props.congestion === 'med'
          ? 'help-circle'
          : 'checkmark-circle'
      }`}
      color={
        props.congestion === 'high'
          ? styles.highCongestionColour.color
          : props.congestion === 'med'
          ? styles.medCongestionColour.color
          : styles.lowCongestionColour.color
      }
      style={styles.congestionIcon}
    />
  );
};
