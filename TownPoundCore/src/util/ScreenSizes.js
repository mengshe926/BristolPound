import { Dimensions } from 'react-native'

export const isScreenSmall = Dimensions.get('window').width <= 375

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height
