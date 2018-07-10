import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import CustomButton from './custom_elements/CustomButton.js';

export default class ArticleTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: this.props.article.favorite
    };

    this.addToFavs = this.addToFavs.bind(this);
    this.removeFromFavs = this.removeFromFavs.bind(this);
  }

  addToFavs(id) {
    this.props.addToFavs(id);
    this.setState({
      isFavorite: true
    });
  }

  removeFromFavs(id) {
    this.setState({
      isFavorite: false
    });
    this.props.removeFromFavs(id);
  }

  render() {
    let article = this.props.article,
        image = article.urlToImage ? (<Image style={styles.image} source={{ uri: article.urlToImage }} />) : '';

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{article.title}</Text>
        {image}
        <Text style={styles.text}>{article.description}</Text>
        <CustomButton
          primary
          title="Read More"
          onPress={() => { this.props.openWebView(article.url) }}
        />
        <CustomButton
          secondary
          title={ article.favorite ? "Remove From Favorites" : "Add To Favorites" }
          onPress={() => { article.favorite ? this.removeFromFavs(article.id) : this.addToFavs(article.id); }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#68979B',
    width: '90%',
    paddingBottom: 5,
    marginBottom: 5,
    marginTop: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    shadowOpacity: .2,
    shadowColor: "black",
    shadowRadius: 5
  },
  header: {
    padding: 10,
    fontSize: 20,
    color: '#2e2d33'
  },
  text: {
    padding: 10,
    color: '#2e2d33'
  },
  image: {
    width: "100%",
    height: Dimensions.get('window').height / 5
  }
});