import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default class MyWebComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
      }
    hideSpinner=()=> {
        this.setState({ visible: false });
      }
      showSpinner=()=> {
        this.setState({ visible: true });
      }
    render() {
        return (
            <View style={{ flex: 1 }}>
        <WebView
          onLoadStart={() => (this.showSpinner())}
          onLoad={() => this.hideSpinner()}
          style={{ flex: 1 }}
          source={{ uri: this.props.navigation.state.params }}
        />
        {this.state.visible && (
          <ActivityIndicator
            style={styles.load}
            size="large"
            color="black"
          />
          )}
      </View>
        );
    }
}
const styles = StyleSheet.create({
    load:{
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})