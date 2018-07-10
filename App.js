import React from 'react';
import { StyleSheet, Text, View, FlatList, WebView, Button, Dimensions, ActivityIndicator } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import ArticleList from './components/ArticleList.js';
import Favorites from './components/Favorites.js';
import CustomButton from './components/custom_elements/CustomButton.js';
import apiKeys from './apiKeys.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      currentArticleURL: null,
      articles: [],
      currentView: "TODAY"
    };

    this.addToFavs = this.addToFavs.bind(this);
    this.removeFromFavs = this.removeFromFavs.bind(this);
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
        for (var i = 0; i < responseJson.articles.length; i++) {
          responseJson.articles[i].id = i;
          responseJson.articles[i].favorite = false;
        }
         this.setState({
            isLoading: false,
            articles: responseJson.status === "ok" ? responseJson.articles : []
         });
      })
      .catch((error) => {
         console.error(error);
      });
  }

  addToFavs(articleIndex) {
    this.setState(previousState => {
      previousState.articles[articleIndex].favorite = true;
      return { "articles": previousState.articles };
    });
  }

  removeFromFavs(articleIndex) {
    this.setState(previousState => {
      previousState.articles[articleIndex].favorite = false;
      return { "articles": previousState.articles };
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
      currentView: "TODAY",
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

  render() {
    let content;

    switch (this.state.currentView) {
      case "WEB_VIEW":
        content = this.state.currentArticleURL ? this.articleView() : this.setState({ currentView: "LIST_VIEW" });
        break;

      case "FAVORITES":
        content = (<Favorites favoritesList={this.state.articles.filter(article => article.favorite)} addToFavs={this.addToFavs} removeFromFavs={this.removeFromFavs} />);
        break;

      case "TODAY":
      default:
        content = this.state.isLoading ? (<View style={styles.loaderContainer}><ActivityIndicator size="large" color="#417C81" /></View>) : (<ArticleList addToFavs={this.addToFavs} openWebView={this.openWebView} articles={this.state.articles} removeFromFavs={this.removeFromFavs} />);
        break;
    }

    return (
      <View style={styles.container}>
        {content}
        <BottomNavigation active={this.state.currentView} hidden={false} >
          <BottomNavigation.Action
              key="TODAY"
              icon="today"
              label="Today"
              onPress={() => this.setState({ currentView: 'TODAY' })}
          />
          <BottomNavigation.Action
              key="FAVORITES"
              icon="favorite"
              label="favorites"
              onPress={() => this.setState({ currentView: 'FAVORITES' })}
          />
          <BottomNavigation.Action
              key="bookmark-border"
              icon="bookmark-border"
              label="Bookmark"
              onPress={() => this.setState({ currentView: 'bookmark-border' })}
          />
          <BottomNavigation.Action
              key="SETTINGS"
              icon="settings"
              label="Settings"
              onPress={() => this.setState({ currentView: 'SETTINGS' })}
          />
        </BottomNavigation>
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
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
