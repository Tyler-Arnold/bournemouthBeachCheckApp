import React, { useState } from "react";
import { Button, View, StyleSheet, ViewStyle, Text, SafeAreaView, FlatList, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HomeScreenProps } from "../types/HomeScreenProps";
import { Beach } from "../types/Beach";
import Beaches from "../mock/beaches";

interface Styles {
  view: ViewStyle;
  button: ViewStyle;
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
  },
  button: {},
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

type BeachListItemProps = { beach: Beach; onPress: any; style: ViewStyle };

const BeachListItem = (props: BeachListItemProps) => (
  <TouchableOpacity onPress={props.onPress} style={[styles.item, props.style]}>
    <Text style={styles.title}>{props.beach.label}</Text>
  </TouchableOpacity>
);

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selectedBeach, setSelectedBeach] = useState<string|null>(null);

  const renderItem = (beach: Beach) => {
    const backgroundColor = beach.label === selectedBeach ? "#6e3b6e" : "#f9c2ff";

    return (
      <BeachListItem
        beach={beach}
        onPress={() => setSelectedBeach(beach.label)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <View style={styles.view}>
      <Button
        onPress={() => navigation.navigate("BeachMap")}
        title="Go to beach"
        color="skyblue"
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Beaches}
          renderItem={(beach) => renderItem(beach.item)}
          keyExtractor={(beach) => beach.label}
          extraData={selectedBeach}
        />
      </SafeAreaView>
    </View>
  );
};
