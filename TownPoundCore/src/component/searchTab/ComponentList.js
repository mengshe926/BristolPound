import React from 'react'
import { View } from 'react-native'
 import Colors from '@Colors/colors'
import { SEARCH_BAR_HEIGHT } from './SearchTabStyle'

class ComponentList extends React.Component {
  constructor() {
    super()
    this.layoutInfo = []
    this.state = {
      highlightedIndex: -1
    }
  }

  componentWillMount() {
    this.props.refreshTabMode()
  }


  captureChildLayout(event, index) {
    const {x, y, width, height} = event.nativeEvent.layout
    this.layoutInfo[index] = {
      index, x, y, width, height, pressable: this.props.items[index].pressable
    }
  }

  highlightItem(location) {
    const hit = this.layoutInfo.find(f => f.y < location && (f.y + f.height) > location)
    this.setState({
      highlightedIndex: hit && hit.pressable ? hit.index : -1
    })
  }

  /*
    Issue this fixes: #865
    How the issue appears: on some Android devices, when pressing the deselect button the touch event is triggered at the draggableList level, instead of at the Button level
    How it fixes the issue: handle the touch manually, and if the touch is within the deselect button area, trigger the deselect function istead of the onPressItem function
  */
  isDeselectButtonPressed(index, pageX) {
    return this.props.items[index].isSelected && this.layoutInfo[index].width - pageX < SEARCH_BAR_HEIGHT
  }

  handleRelease(hasMoved, event) {
    const index = this.state.highlightedIndex
    if (!hasMoved && this.props.items[index]) {
      if (this.isDeselectButtonPressed(index, event.nativeEvent.pageX) ) {
        this.props.deselect()
      } else {
        this.props.onPressItem(index)
      }
    }
    this.setState({
      highlightedIndex: -1
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.items.map((item, index) => {
          let containerBackgroundColor
          if (item.pressable) {
            containerBackgroundColor = this.state.highlightedIndex === index
              ? Colors.offWhite
              : 'white'
          }
          return (
            //zIndex is required for overflow to work on android
            <View style={{ backgroundColor: containerBackgroundColor, overflow: 'hidden', zIndex: 100 }}
                onLayout={(event) => this.captureChildLayout(event, index)}
                key={item.id || index}>
              {this.props.componentForItem(item, this.props.deselect)}
            </View>
          )
        })}
      </View>
    )
  }
}

export default ComponentList
