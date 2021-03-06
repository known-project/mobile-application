import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Modal,
  ScrollView,
  Image,
  TouchableNativeFeedback
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { showComments, hideComments } from "../store/CardsActions";


class ViewCommentsModal extends Component {
  componentDidMount() {
    return fetch('http://178.63.162.108:8080/api/student/comment/2019-11-11/0/100')
      .then((response) => response.json())
        .then((resJson) => {
          this.setState({ content: resJson });
        })  
  }
  render() {
        const comments = [];
    if (this.state != null) {
      this.state.content.forEach(element => {
        comments.push(
          <View
            key={element.id}
            style={{
              transform: [{ scaleY: -1 }],
              padding: 5,
              margin: 5,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 2,
              flexDirection: "row"
            }}
          >
            <Image
              source={require("../res/images/physics.png")}
              style={{ height: 50, width: 50, resizeMode: "contain" }}
            />
            <View style={{ marginLeft: 5, flex: 1 }}>
              <Text>
                {element.studentId}
                {"\t"}
                <Text style={{ fontSize: 10 }}>
                  {element.date.toLocaleString("en-US", {
                    timeZone: "Asia/Tehran"
                  })}
                </Text>
              </Text>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              />
              <Text>{element.text}</Text>
            </View>
          </View>
        );
      });
    }

    return (
      <Modal visible={this.props.visibleComments != null}>
        <View style={{ heigt: 50 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", margin: 7 }}
          >
            Comments of day :PLACE HOLDER:
          </Text>
        </View>
        <ScrollView style={{ flex: 1, margin: 5, transform: [{ scaleY: -1 }] }}>
          {comments}
        </ScrollView>
        <View>
          <Button title="Close" onPress={() => this.props.hideComments()} />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    visibleComments: state.cards.visibleComments
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showComments,
      hideComments
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCommentsModal);
