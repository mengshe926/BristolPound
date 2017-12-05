import React from 'React'
import { View, TouchableOpacity, Text, TextInput, ScrollView, Animated } from 'react-native'
import { MultilineText } from '../DefaultText'
import DefaultText from '@Colors/colors'
import style from './PolicyStyle'
import Colors from '@Colors/colors'
import merge from '../../util/merge'
import KeyboardComponent from '../KeyboardComponent'
import { screenHeight } from '../../util/ScreenSizes'

let PIN_LENGTH = 4


class QuickUnlockDisclaimer extends React.Component {
  constructor() {
    super()
    this.state = {
      enteredPIN: ''
    }
  }

  updateEnteredPIN(enteredPIN) {
    this.setState({
      enteredPIN: enteredPIN
    })
  }

  getButtonColor() {
    if (this.inputValid()) {
      return Colors.primaryBlue
    }
    else {
      return Colors.gray5
    }
  }

  getButtonTextColor() {
    return this.getButtonColor() === Colors.gray5 ? 'black' : 'white'
  }

  inputValid() {
    var len = this.state.enteredPIN.length
    if (len == PIN_LENGTH && !this.props.disabledAccept) {
      return true
    }

    return false
  }

  render() {
    var bottom = this.props.bottom
    return (
      <View style={merge(style.outerContainer, {bottom: bottom})}>
        <View style={style.container}>
          <View style={style.header}>
            <Text style={style.headerText}>
              Quick Unlock Disclaimer
            </Text>
          </View>
          <View style={style.separator}/>
          <ScrollView style={style.instructionWrapper}>
            <Text style={style.instructionText}>
                Disclaimer:
                Enter your Bristol Pound banking PIN code and press 'Accept' to enable the Quick Unlock method. This will use the Bristol Pound banking PIN to reauthenticate the device as opposed to
                requiring the full password again. By accepting this option you are acknowledging that Bristol Pound takes no responsibility for any losses that occur as a
                direct result of the inherent reduction in security.
                NOTE: You may logout at any time to reset this option.
            </Text>
          </ScrollView>
          <View style={style.pinEntry}>
            <TextInput
              style={style.textInput}
              autoFocus={true}
              value={this.state.enteredPIN}
              onSubmitEditing={() => this.inputValid() && this.props.acceptCallback(this.state.enteredPIN)}
              onChangeText={(enteredPIN) => this.updateEnteredPIN(enteredPIN)}
              placeholder="Enter PIN"
              keyboardType='numeric'
              underlineColorAndroid={Colors.transparent}
              secureTextEntry={true}
              maxLength={PIN_LENGTH}
            />
          </View>
          <View style={style.buttonRow}>
            <TouchableOpacity
              style={merge(style.buttonContainer, {borderWidth: 2, borderColor: Colors.primaryBlue})}
              onPress={this.props.rejectCallback}
            >
              <Text style={merge(style.buttonText, {color: Colors.primaryBlue})}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!this.inputValid()}
              style={merge(style.buttonContainer, {backgroundColor: this.getButtonColor()})}
              onPress={() => this.props.acceptCallback(this.state.enteredPIN)}
            >
              <Text style={merge(style.buttonText, {color: this.getButtonTextColor()})}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default QuickUnlockDisclaimer
