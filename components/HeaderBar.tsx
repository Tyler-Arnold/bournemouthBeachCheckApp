import React from 'react';
import {StatusBar, Text, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {RootParamsType} from '../types/RootParamsType';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export const styles = StyleSheet.create({
  headerview: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    width: '100%',
    flex: 0.06,
    fontSize: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf3e2',
  },
  headertext: {
    fontSize: 20,
  },
  burgericon: {
    color: 'black',
    paddingRight: 20,
    paddingLeft: 10,
  },
});

interface BurgerIconProps {
  onPress: () => void;
}
/**
 * Burger Icon
 * @param {BurgerIconProps} props
 * @return {React.FC<BurgerIconProps>}
 */
const BurgerIcon: React.FC<BurgerIconProps> = (props: BurgerIconProps) => {
  return (
    <Ionicons
      style={styles.burgericon}
      name={'md-menu'}
      color={styles.burgericon.color}
      size={32}
      onPress={props.onPress}
    />
  );
};
interface HeaderBarProps {
  navigation: DrawerNavigationProp<RootParamsType, 'BeachMap' | 'Home'>;
  title: string;
}
/**
 * Header Bar
 * @param {HeaderBarProps} props
 * @return {React.FC<HeaderBarProps>}
 */
export const HeaderBar: React.FC<HeaderBarProps> = (props: HeaderBarProps) => {
  return (
    <View style={styles.headerview}>
      <BurgerIcon onPress={() => props.navigation.openDrawer()} />
      <Text style={styles.headertext}>{props.title}</Text>
    </View>
  );
};
