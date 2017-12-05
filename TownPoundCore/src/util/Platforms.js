import { Platform } from 'react-native'

const PLATFORM_IOS = 'ios'
const PLATFORM_ANDROID = 'android'
const isIOS = () => Platform.OS === PLATFORM_IOS
const isAndroid = () => Platform.OS === PLATFORM_ANDROID

export default {
    IOS: PLATFORM_IOS,
    ANDROID: PLATFORM_ANDROID,
    isIOS: isIOS,
    isAndroid: isAndroid
}
