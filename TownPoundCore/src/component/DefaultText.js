import React, {Component} from 'react'
import { Text, Linking, TouchableHighlight } from 'react-native'
import Colors from '@Colors/colors'
import merge from '../util/merge'
import commonStyle from './style'


// The designs have a number of screens where fonst of mixed size are displayed on the same
// line of text.  Typically this would be achieved by vertically aligning text around the baseline.
// However, this is not supported in react native. In order to achieve the same result, the baseline
// of the Museo 300 font used by this app has been measured experimentally, giving rise to the function
// below. Aliging fonts of different sizes can be achieved by offsetting them based on their respective
// baselines.
export const baselineForFontSize = (size) =>
  size / 40 * 9

export const baselineDeltaForFonts = (largeFontSize, smallFontSize) =>
  baselineForFontSize(largeFontSize) - baselineForFontSize(smallFontSize)

const style = {
  fontFamily: commonStyle.font.museo300,
  fontSize: 18,
  color: Colors.offBlack,
  backgroundColor: Colors.transparent
}

class DefaultText extends Component {
  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  render () {
    const newStyle = merge(style, this.props.style)
    const defaultProps = {
      numberOfLines: 1,
      ellipsizeMode: 'tail'
    }
    return (
      <Text
          ref={component => this._root = component}
          {...merge(defaultProps, this.props, {style: newStyle})}>
        {this.props.children}
      </Text>
    )
  }
}

export class MultilineText extends Component {
  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  render () {
    const newStyle = merge(style, this.props.style)
    return (
      <Text {...this.props}
          ref={component => this._root = component}
          style={newStyle}>
        {this.props.children}
      </Text>
    )
  }
}

export const HyperlinkText = ({text, link, style}) =>
  <TouchableHighlight underlayColor='transparent'
    onPress={() => Linking.openURL(link)}>
    <DefaultText style={{
      textDecorationLine: 'underline',
      ...style
    }}>
      {text}
    </DefaultText>
  </TouchableHighlight>

export default DefaultText
