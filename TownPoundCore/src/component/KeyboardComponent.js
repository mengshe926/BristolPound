import React from 'react'
import { Keyboard, Animated, AppState } from 'react-native'
import PLATFORM from '../util/Platforms'
import animateTo from '../util/animateTo'

/**
 * Offer common keyboard resizing rules to smooth out the difference between Android and iOS.
 * This has been extracted as base class from Login.js that can be inherited by components that need the resizing.
 *
 * Two limitations:
 *  * KeyboardAvoidingView has been released in the newest version of React-Native, and once our lagging android
 *  version catches up, it should remove the need for this class.
 *  * React design philosophy is to favour composition over inheritance.  Alternative solutions include a separate
 *  resizing component to sit below the component we wish to continue to display.
 */

 // For some reason works for login but not for SendMoney
class KeyboardComponent extends React.Component {
  constructor () {
    super()
    this.keyboardOpen = false
    this.state = { keyboardHeight: new Animated.Value(0) }
    this.animateOpenKeyboard = this.animateOpenKeyboard.bind(this)
    this.animateCloseKeyboard = this.animateCloseKeyboard.bind(this)
  }

  componentWillMount () {
    // On iOS the keyboard is overlaid on top of the content,
    // while on android everything is moved up to make space
    if (PLATFORM.isIOS()) {
      this.keyboardShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
      this.keyboardHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    if (PLATFORM.isAndroid()) {
      this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
      this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    }
  }

  componentWillUnmount () {
    this.keyboardShowListener.remove()
    this.keyboardHideListener.remove()
  }

  keyboardWillShow (e) {
    this.animateOpenKeyboard(e)
  }

  // Android doesn't currently support 'WillShow' and 'WillHide' so use
  // 'DidShow' and 'DidHide' - KeyboardAvoidingView did not work as expected
  // on rn 44.0
  keyboardDidShow (e) {
    this.animateOpenKeyboard(e)
  }


  keyboardDidHide () {
    this.animateCloseKeyboard()
  }

  keyboardWillHide () {
    this.animateCloseKeyboard()
  }

  animateOpenKeyboard (e) {
      var newKeyboardHeight = e.endCoordinates.height
      animateTo(this.state.keyboardHeight, newKeyboardHeight, 500, undefined, () => this.props.setOverlayOpen && this.props.setOverlayOpen(true))
      this.keyboardOpen = true
      if (newKeyboardHeight > this.state.maxKeyboardHeight) {
        this.setState({maxKeyboardHeight: newKeyboardHeight})
      }
  }

  animateCloseKeyboard () {
    animateTo(this.state.keyboardHeight, 0, 500, undefined, () => this.props.setOverlayOpen && this.props.setOverlayOpen(false))
    this.keyboardOpen = false
  }
}

export default KeyboardComponent
