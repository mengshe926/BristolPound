import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import merge from '../../util/merge'
import { dimensions, margin } from '../../util/StyleUtils'

const style = {
  closeIcon: {
    ...dimensions(18),
  }
}

export const Button = props => {
    return (
        <TouchableOpacity style={merge(dimensions(props.size), props.style)} onPress={props.onPress}>
            <Image style={merge(style.closeIcon, margin((props.size - 18) / 2))} source={props.buttonType} />
        </TouchableOpacity>
    )
}
