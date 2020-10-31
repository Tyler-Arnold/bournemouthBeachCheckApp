import React, { useState } from "react";
import { Button, View, Text, StyleSheet, ViewStyle } from "react-native";
import { BeachMapScreenProps } from "../types/BeachMapScreenProps";
import MapView, { Region } from "react-native-maps";

interface Styles {
  view: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "bisque",
  },
});

export const BeachMapScreen = ({ navigation }: BeachMapScreenProps) => {
  const bournemouthBeachRegion: Region = {
    latitude: 50.7155,
    longitude: -1.875,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.00421,
  };
  const sandbanksBeachRegion: Region = {
    latitude: 50.6877,
    longitude: -1.9387,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.00421,
  };
  const boscombeBeachRegion: Region = {
    latitude: 50.7195,
    longitude: -1.843,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.00421,
  };

  const [region, setRegion] = useState(bournemouthBeachRegion)

  return (
    <>
      <MapView
        region={region}
        style={styles.view}
      />
      <View style={styles.view}>
        <Button
          onPress={() => navigation.navigate("Home")}
          title="Go Home"
          color="blue"
        />
        <Button
          onPress={() => setRegion(bournemouthBeachRegion)}
          title="Set Bournemouth"
          color="brown"
        />
        <Button
          onPress={() => setRegion(sandbanksBeachRegion)}
          title="Set Sandbanks"
          color="brown"
        />
        <Button
          onPress={() => setRegion(boscombeBeachRegion)}
          title="Set Boscombe"
          color="brown"
        />
      </View>
    </>
  );
};
