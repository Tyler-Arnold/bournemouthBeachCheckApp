import React from 'react';
import {Ionicons} from '@expo/vector-icons';

interface IconProps {
  color: string;
  size: number;
  focused: boolean;
}
/**
 * Map Icon
 * @param {IconProps} props
 * @return {React.FC<IconProps>}
 */
export const mapIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Ionicons name={'md-map'} color={props.color} size={props.size} />;
};
/**
 * Home Icon
 * @param {IconProps} props
 * @return {React.FC<IconProps>}
 */
export const homeIcon: React.FC<IconProps> = (props: IconProps) => (
  <Ionicons name={'md-home'} color={props.color} size={props.size} />
);
