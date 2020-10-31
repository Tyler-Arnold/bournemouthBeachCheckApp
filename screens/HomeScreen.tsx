import React from "react";
import { Button, View, StyleSheet, ViewStyle } from "react-native";
import { HomeScreenProps } from "../types/HomeScreenProps";

interface Styles {
  view: ViewStyle;
  button: ViewStyle
}

const styles = StyleSheet.create<Styles>({
    view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "skyblue"
    },
    button: {

    }
  });

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.view}>
      <Button
        onPress={() => navigation.navigate("BeachMap")}
        title="Go to beach"
        color="skyblue"
      />
    </View>
  );
};
