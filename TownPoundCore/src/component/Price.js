import React from 'react'
import { View } from 'react-native'
import DefaultText, { baselineDeltaForFonts } from './DefaultText'
import merge from '../util/merge'
import Colors from '@Colors/colors'
import commonStyle from './style'

const Price = ({prefix, price, color, size, style, center}) => {
  const priceComponents = Math.abs(price).toFixed(2).split('.')
  const priceBeforeDecimal = !isNaN(priceComponents[0]) ? priceComponents[0] : '-'
  const priceAfterDecimal = !isNaN(priceComponents[1]) ? priceComponents[1] : '--'
  const isCredit = price > 0
  size = size || 18
  const smallFontSize = size * 0.75

  // offset the smaller font based on the difference in baseline
  const marginBottom = baselineDeltaForFonts(size, smallFontSize)

  color = color || (isCredit ? Colors.orange : Colors.offBlack)
  prefix = prefix !== undefined ? prefix : (isCredit ? '+' : '')
  const alignSelf = center ? 'center': 'flex-end'

  return (
    <View style={merge(style, {justifyContent: alignSelf, flexDirection: 'row'})}>
      <DefaultText style={{
          fontFamily: commonStyle.font.museo300,
          fontSize: smallFontSize,
          alignSelf,
          marginBottom: marginBottom,
          color}}>
        {prefix}
      </DefaultText>
      <DefaultText style={{
          fontFamily: commonStyle.font.museo300,
          fontSize: size,
          alignSelf,
          color}}>
        {priceBeforeDecimal}
      </DefaultText>
      <DefaultText style={{
          fontFamily: commonStyle.font.museo100,
          fontSize: smallFontSize,
          alignSelf: 'flex-end',
          marginBottom: marginBottom,
          color,
          opacity: 0.6}}>
        .{priceAfterDecimal}
      </DefaultText>
    </View>
  )
}

export default Price
