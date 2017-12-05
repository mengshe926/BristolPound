import React from 'React'
import { View, TextInput, TouchableOpacity, Text, Animated } from 'react-native'
import DefaultText from '../DefaultText'
import Colors from '@Colors/colors'
import merge from '../../util/merge'
import style from './LockStyle'
import { unlockCharNo } from '../../store/reducer/login'
import KeyboardComponent from '../KeyboardComponent'
import _ from 'lodash'

export const maxAttempts = 3;

const PIN_LENGTH = 4


class StoredPasswordLockScreen extends KeyboardComponent {
    constructor() {
      super()
      this.state.enteredPIN = ''
      this.THROTTLED_DELAY = 300
      this.state.maxKeyboardHeight = 0
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
      if (len === PIN_LENGTH && !this.props.disabledUnlock) {
        return true
      }

      return false
    }

    unlockAttempt() {
      this.props.storedPasswordUnlock(this.state.enteredPIN)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.failedAttempts > this.props.failedAttempts) {
        this.setState({enteredPIN: ''})
      }
    }

    render() {
        return (
          this.props.showLockScreen
            ?  <Animated.View style={merge(style.outerContainer, {bottom: this.state.maxKeyboardHeight})}>
                  <View style={style.container}>
                      <View style={style.header}>
                        <Text style={style.headerText}>
                          {this.props.headerMessage || "Unlock App"}
                        </Text>
                      </View>
                      <View style={style.instructionWrapper}>
                        <Text style={style.instructionText}>
                            For your privacy, the app was locked.
                            To unlock, please enter your Bristol Pound banking PIN, as you specified when agreeing to "Quick Login". Or choose "Logout" to just browse.
                        </Text>
                        { this.props.disabledUnlock &&
                          <View>
                              <Text style={merge(style.errorText, { paddingTop: 10 })}>
                                  No internet available right now, log out just to browse
                              </Text>
                          </View>
                        }
                        { this.props.error &&
                            <View>
                                <Text style={merge(style.errorText, { paddingTop: 10 })}>
                                    The PIN you entered was incorrect. If you have forgotten the PIN, choose "Logout".
                                </Text>
                            </View>
                        }
                      </View>
                      <View style={style.form}/>
                      <View style={style.pinEntry}>
                        <TextInput
                            placeholder="Enter PIN"
                            autoFocus={true}
                            value={this.state.enteredPIN}
                            accessibilityLabel={'Unlock PIN'}
                            style={style.textInput}
                            keyboardType='numeric'
                            maxLength={PIN_LENGTH}
                            placeholderTextColor={Colors.gray4}
                            secureTextEntry={true}
                            underlineColorAndroid={Colors.transparent}
                            onChangeText={(value) => this.updateEnteredPIN(value)}
                            onSubmitEditing={() => this.inputValid() && this.props.headerMessage == '' && this.unlockAttempt()}
                            />
                      </View>
                      <View style={style.buttonRow}>
                          <TouchableOpacity
                              style={merge(style.buttonContainer, { backgroundColor: Colors.primaryBlue})}
                              onPress={() => this.props.logout && this.props.logout()}>
                              <Text style={merge(style.buttonText, { color: 'white' })}>
                                  Logout
                              </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={!this.inputValid()}
                            style={merge(style.buttonContainer, {backgroundColor: this.getButtonColor()})}
                            onPress={_.throttle(this.unlockAttempt.bind(this), this.THROTTLED_DELAY)}
                          >
                            <Text style={merge(style.buttonText, {color: this.getButtonTextColor()})}>
                              Unlock
                            </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </Animated.View>
            : null
        )
    }
}

export default StoredPasswordLockScreen
