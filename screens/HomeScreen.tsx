import React from 'react';
import {Button, View, StyleSheet, StatusBar} from 'react-native';
import {BeachList} from '../components/BeachList';
import {HomeScreenProps} from '../types/HomeScreenProps';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  button: {},
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
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export const HomeScreen = ({navigation}: HomeScreenProps): JSX.Element => {
  return (
    <View style={styles.view}>
      <Button
        onPress={() => navigation.navigate('BeachMap')}
        title="Go to beach"
        color="skyblue"
      />
      <View style={styles.container}>
        <BeachList />
      </View>
    </View>
  );
};
