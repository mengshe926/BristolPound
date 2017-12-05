import React from 'react'
import { Animated, BackHandler } from 'react-native'
import animateTo from '../util/animateTo'
import merge from '../util/merge'
import { screenHeight } from '../util/ScreenSizes'

const modalSlideTime = 300

const style = {
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
  backgroundColor: 'white'
}

class Modal extends React.Component {
  constructor () {
    super()
    this.state = { top: new Animated.Value(screenHeight), active: false }
    this.onBackButtonPressBound = this.onBackButtonPress.bind(this)
  }
  onBackButtonPress () {
    this.props.hideModal && this.props.hideModal()
    return true
  }
  componentDidUpdate (lastProps) {
    if (this.props.visible && !lastProps.visible) {
      this.setState({ active: true })
      animateTo(this.state.top, 0, modalSlideTime, undefined, this.props.modalOpened)
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressBound)
    }
    if (!this.props.visible && lastProps.visible) {
      animateTo(this.state.top, screenHeight, modalSlideTime, undefined, () => this.setState({ active: false }))
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressBound)
    }
  }
  render () {
    return (
      <Animated.View style={merge(style, { top: this.state.top })}>
        {this.state.active && this.props.children}
      </Animated.View>
    )
  }
}

export default Modal
