import React, { useState } from "react";
import { Button, View, Text, StyleSheet, ViewStyle } from "react-native";
import { BeachMapScreenProps } from "../types/BeachMapScreenProps";
import MapView, { Region } from "react-native-maps";
import { Beach } from "../types/Beach";
import Beaches from "../mock/beaches";
import { BeachPolygons } from "../components/BeachPolygons";

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

interface BeachMapScreenState {
  currentBeach: Beach;
}

export const BeachMapScreen = ({ navigation }: BeachMapScreenProps) => {
  const initialState: BeachMapScreenState = {
    currentBeach:
      Beaches.find((beach) => beach.label === "BournemouthBeachPier") ??
      Beaches[0],
  };

  const [state, setState] = useState<BeachMapScreenState>(initialState);

  return (
    <>
      <MapView region={state.currentBeach.location} style={styles.view}>
        <BeachPolygons />
      </MapView>

      <View style={styles.view}>
        <Button
          onPress={() => navigation.navigate("Home")}
          title="Go Home"
          color="blue"
        />
        <Button
          onPress={() => setState({ ...state, currentBeach: Beaches[0] })}
          title="Set Bournemouth"
          color="brown"
        />
      </View>
    </>
  );
};
