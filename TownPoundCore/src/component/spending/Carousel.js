import React from 'react'
import { Animated, PanResponder, View } from 'react-native'
import _ from 'lodash'
import animateTo from '../../util/animateTo'

class Carousel extends React.Component {
  constructor(props) {
    super()

    this.state = ({
      leftOffset: new Animated.Value(this.leftOffsetAtIndex(props.pageIndex, props)),
    })
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        this.leftOffsetAtPanStart = this.state.leftOffset._value
        this.props.onTouchStart && this.props.onTouchStart(this.getPressIndex(evt.nativeEvent.pageX))
      },

      onPanResponderMove: (evt, gestureState) => {
        const newLocation = this.getLocationAfterMove(gestureState.dx)
        this.setState({
          leftOffset: new Animated.Value(newLocation)
        })
        if (Math.abs(gestureState.dx) > 3) {
          this.props.onMove()
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) <= 3 && this.props.onPress) {
          this.props.onPress(this.getPressIndex(evt.nativeEvent.pageX))
        } else {
          const newLocation = this.getLocationAfterMove(gestureState.dx)
          const newIndex = this.indexAtLeftOffset(newLocation)
          if (newIndex !== this.props.pageIndex && this.props.onPageChange) {
            this.props.onPageChange(newIndex)
          } else {
            this.animateLeftOffsetTo(this.leftOffsetAtIndex(newIndex))
          }
        }
      },
    })
  }

  getLocationAfterMove(dx) {
    return _.clamp(this.leftOffsetAtPanStart + dx, this.getMinOffset(), this.getMaxOffset())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageIndex !== this.props.pageIndex) {
      this.animateLeftOffsetTo(this.leftOffsetAtIndex(nextProps.pageIndex))
    }
  }

  getPressIndex(pageX) {
    return Math.floor((pageX - this.state.leftOffset._value) / this.props.itemWidth)
  }

  leftOffsetAtIndex(index, props = this.props) {
    const { itemWidth, containerWidth } = props
    return (containerWidth - itemWidth) / 2 - index * itemWidth
  }

  indexAtLeftOffset(leftOffset) {
    const { containerWidth, itemWidth } = this.props
    const scrollDistance = (containerWidth - itemWidth) / 2 - leftOffset
    return Math.round(scrollDistance / itemWidth)
  }

  getMaxOffset() {
    return (this.props.containerWidth - this.props.itemWidth) / 2
  }

  getMinOffset() {
    return this.getMaxOffset() - (this.props.children.length - 1) * this.props.itemWidth
  }

  animateLeftOffsetTo(destination) {
    animateTo(this.state.leftOffset,
      destination,
      200,
      undefined,
      ()=>{}
    )
  }

  render() {
    return (
      <View style={{ width: this.props.containerWidth, overflow: 'hidden', ...this.props.style }}>
        <Animated.View style={{ flexDirection: 'row', left: this.state.leftOffset }}
          {...this._panResponder.panHandlers} >
          { this.props.children }
        </Animated.View>
      </View>
    )
  }
}

export default Carousel
