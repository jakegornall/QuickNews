import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ArticleTile from './ArticleTile.js';

export default class ArticleList extends React.Component {

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <FlatList
        data={this.props.articles}
        renderItem={(item) => <ArticleTile id={item.index} article={item.item} openWebView={this.props.openWebView} addToFavs={this.props.addToFavs} removeFromFavs={this.props.removeFromFavs} />}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({

});