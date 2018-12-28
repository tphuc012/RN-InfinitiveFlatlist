import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

export default class InfinitiveFlatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data:
              page === 1 ? res.results : [...this.state.data, ...res.results],
            error: res.error || null,
            loading: false,
            refreshing: false
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }, 1000);
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        seed: this.state.seed + 1
      },
      this.makeRemoteRequest()
    );
  };

  handleLoadmore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      this.makeRemoteRequest()
    );
  };
  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
              ItemSeparatorComponent={this.renderSeparator}
            />
          )}
          keyExtractor={item => item.email}
          ListHeaderComponent={
            <SearchBar placeholder="Type Here..." lightTheme round />
          }
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadmore}
          onEndReachedThreshold={0}
        />
      </List>
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: 345,
          backgroundColor: "#CED0CE",
          marginLeft: 0
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "green"
  }
});
