import { Animated, Easing } from 'react-native'

// utility for animations. 'easing' and 'callback' are optional
const animateTo = (parameterToAnimate, value, duration, easing, callback) => {
  Animated.timing(parameterToAnimate, {
    toValue: value,
    easing: easing || Easing.out(Easing.ease),
    duration
  }).start(callback)
}

export default animateTo
