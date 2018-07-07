import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class CustomButton extends React.Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
      >
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#417C81',
    borderRadius: 4,
    marginBottom: 5,
    marginTop: 5,
    width: "95%",
    marginRight: 'auto',
    marginLeft: 'auto',
    shadowOpacity: .5,
    shadowColor: "black",
    shadowRadius: 5
  },
  text: {
    padding: 10,
    textAlign: 'center',
    color: 'white'
  }
});