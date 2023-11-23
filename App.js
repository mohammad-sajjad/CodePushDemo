import React, { Component, useState, useEffect } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import codePush from "react-native-code-push";

function App() {
  let [restartAllowed, setRestartAllowed] = useState(true)

  useEffect(() => {
    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress
    );
  }, [])

 

  const codePushStatusDidChange = (syncStatus) => {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE: 
      console.log("Checking for update." )
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package." )

        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        console.log("Awaiting user action." )
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update." )

        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log("App up to date." )

        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        console.log("Update cancelled by user." )

        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed and will be applied on restart." )

        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log("An unknown error occurred." )

        break;
    }
  }

 const codePushDownloadDidProgress = (progress) => {
    console.log('progress', progress)
  }


  const render = () => {
    let progressView;

    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to CodePush!
        </Text>
        <TouchableOpacity onPress={this.sync.bind(this)}>
          <Text style={styles.syncButton}>Press for background sync</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
          <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
        </TouchableOpacity>
        {progressView}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 50
  },
  image: {
    margin: 30,
    width: Dimensions.get("window").width - 100,
    height: 365 * (Dimensions.get("window").width - 100) / 651,
  },
  messages: {
    marginTop: 30,
    textAlign: "center",
  },
  restartToggleButton: {
    color: "blue",
    fontSize: 17
  },
  syncButton: {
    color: "green",
    fontSize: 17
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

App = codePush(codePushOptions)(App);

export default App;