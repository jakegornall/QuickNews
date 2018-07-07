import React from 'react';
import { StyleSheet, Text, View, FlatList, WebView, Button, Dimensions } from 'react-native';
import ArticleTile from './components/ArticleTile.js';
import CustomButton from './components/custom_elements/CustomButton.js';
import apiKeys from './apiKeys.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      currentArticleURL: null,
      articles: []
    }

    this.listView = this.listView.bind(this);
    this.articleView = this.articleView.bind(this);
    this.openWebView = this.openWebView.bind(this);
    this.closeWebView = this.closeWebView.bind(this);
  }

  componentDidMount() {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKeys.News;
    fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            isLoading: false,
            articles: responseJson.status === "ok" ? responseJson.articles : []
         });
      })
      .catch((error) => {
         console.error(error);
      });
  }

  openWebView(url) {
    this.setState({
      currentView: "WEB_VIEW",
      currentArticleURL: url
    });
  }

  closeWebView() {
    this.setState({
      currentView: "LIST_VIEW",
      currentArticleURL: null
    });
  }

  articleView() {
    return (
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: this.state.currentArticleURL }}
          style={styles.webView}
        />
        <View style={styles.webViewBackBtnContainer}>
          <Button
            title="< Back"
            onPress={this.closeWebView}
          />
        </View>
      </View>
    );
  }

  _keyExtractor = (item, index) => index.toString();

  listView() {
    return (
      <FlatList
        data={this.state.articles}
        renderItem={(item) => <ArticleTile id={item.index} article={item.item} openWebView={this.openWebView} />}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  render() {
    let content;

    switch (this.state.currentView) {
      case "WEB_VIEW":
        content = this.state.currentArticleURL ? this.articleView() : this.setState({ currentView: "LIST_VIEW" });
        break;

      case "LIST_VIEW":
      default:
        content = this.state.isLoading ? (<Text style={styles.text}>Loading Data...</Text>) : this.listView();
        break;
    }

    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    color: '#2e2d33'
  },
  webViewBackBtnContainer: {
    shadowOpacity: .3,
    shadowColor: "black",
    shadowRadius: 10
  },
  webViewContainer: {
    height: Dimensions.get('window').height - 50
  }
});
