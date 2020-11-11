import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BeachList} from '../components/BeachList';
import {HeaderBar} from '../components/HeaderBar';
import {HomeScreenProps} from '../types/HomeScreenProps';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  item: {
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  container: {
    flex: 0.94,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

/**
 * Screen containing the beach flatlist
 * @param {HomeScreenProps} props
 * @return {React.FC<HomeScreenProps> }
 */
export const HomeScreen: React.FC<HomeScreenProps> = (
    props: HomeScreenProps,
) => {
  return (
    <View style={styles.view}>
      <HeaderBar title={'Beach List'} navigation={props.navigation} />
      <View style={styles.container}>
        <BeachList />
      </View>
    </View>
  );
};
