import React from 'react'
import { Animated } from 'react-native'
import { connect } from 'react-redux'
import { TAB_BAR_HEIGHT } from './tabbar/TabBarStyle'
import DefaultText from './DefaultText'
import Colors from '@Colors/colors'
import merge from '../util/merge'
import commonStyle from './style'
import { updateStatus } from '../store/reducer/statusMessage'
import animateTo from '../util/animateTo'
import { horizontalAbsolutePosition, sectionHeight } from '../util/StyleUtils'

const style = {
  container: {
    ...horizontalAbsolutePosition(0, 0),
    ...commonStyle.shadow,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class StatusMessage extends React.Component {
  constructor () {
    super()
    this.state = {
      top: new Animated.Value(-sectionHeight),
      height: 0,
      fontSize: 18
    }
  }

  scheduleSlideOut () {
    this.timeout = setTimeout(() => animateTo(this.state.top, -sectionHeight, 300, undefined, () => {
      this.setState({ height: 0 })
      this.props.updateStatus('')
      this.timeout = undefined
    }), 1600)
  }

  componentDidUpdate (lastProps) {
    if (this.props.message && !lastProps.message) {
      const height = this.props.modalVisible ? sectionHeight : TAB_BAR_HEIGHT
      const fontSize = this.props.modalVisible ? 24 : 18
      this.setState({ height, fontSize })
      animateTo(this.state.top, 0, 300)
      this.scheduleSlideOut()
    } else if (this.timeout) {
      clearTimeout(this.timeout)
      this.scheduleSlideOut()
    }
  }

  render () {
    return (
      <Animated.View style={
          merge(style.container, {
            top: this.state.top,
            backgroundColor: this.props.backgroundColor,
            height: this.state.height
          })
        }>
        <DefaultText style={{ color: Colors.white, fontSize: this.state.fontSize }}>
          {this.props.message}
        </DefaultText>
      </Animated.View>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.statusMessage,
  modalVisible: state.navigation.modalVisible
})

const mapDispatchToProps = (dispatch) => ({
  updateStatus: (status) => dispatch(updateStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusMessage)
