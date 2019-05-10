import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addCard,
  selectCard,
  deselectCard,
  deleteCard
} from "../store/CardsActions";

class Card extends Component {
  onPressHnd() {
    // navigate to card edit page
    this.props.selectCard(this.props.cardKey);
    this.props.navigation.push("CardEdit");
  }

  onHoldHnd() {
    // mark card as done
  }

  componentWillMount() {
    this.currentCard = this.props.cards.find(
      cardItem => cardItem.key === this.props.cardKey
    );
  }

  render() {
    const cardOnLoadProps = StyleSheet.create({
      HeightOnLoad: {
        height: this.currentCard.duration
      },
      ColorOnLoad: {
        width: 6,
        borderRadius: 3,
        margin: 4,
        backgroundColor: this.currentCard.color
      }
    });
    return (
      <TouchableNativeFeedback
        onPress={() => this.onPressHnd()}
        onLongPress={() => this.onHoldHnd()}
      >
        <View style={[styles.Main, cardOnLoadProps.HeightOnLoad]}>
          <View style={cardOnLoadProps.ColorOnLoad} />
          <Text style={styles.CardMainText}>{this.currentCard.course}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  Main: {
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#8f8f8f",
    margin: 3,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    borderTopEndRadius: 5,
    flexDirection: "row"
  },
  CardMainText: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    cards: state.cards.cards,
    selectedCard: state.cards.selectedCard
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addCard,
      deleteCard,
      selectCard,
      deselectCard
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
