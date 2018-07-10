import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class CustomButton extends React.Component {

  render() {

    let color = "white";

    if (this.props.primary) {
      color = "#417C81";
    }
    if (this.props.secondary) {
      color = "#AA4439";
    }

    let styles = Object.assign({}, this.props.style, StyleSheet.create({
      container: {
        backgroundColor: this.props.inverted ? "white" : color,
        borderWidth: 1,
        borderColor: color,
        borderRadius: 0,
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
    }));

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