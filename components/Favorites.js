import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CustomButton from './custom_elements/CustomButton.js';
import ArticleList from './ArticleList.js';

export default class Favorites extends React.Component {

  render() {
    return this.props.favoritesList.length <= 0 ? (
      <View style={styles.noFavsContainer}>
        <Text style={styles.text}>You Have No Favorites!</Text>
      </View>) : (
      <ArticleList
        articles={this.props.favoritesList}
        removeFromFavs={this.props.removeFromFavs}
        addToFavs={this.props.addToFavs}
      />
    );
  }
}

const styles = StyleSheet.create({
  noFavsContainer: {
    flex: 1,
    justifyContent: "center",
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  text: {
    textAlign: "center"
  }
});