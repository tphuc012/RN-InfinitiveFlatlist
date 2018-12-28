import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InfinitiveFlatlist from "./src/InfinitiveFlatlist";
export default class App extends React.Component {
  render() {
    return <InfinitiveFlatlist />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
