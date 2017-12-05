import { Dimensions } from 'react-native'
import Colors from '@Colors/colors'
import commonStyle from './../style.js'
import  { margin, absolutePosition } from '../../util/StyleUtils'

const gapSize = Dimensions.get('window').height / 2 - 170

const style = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  bottomContainer : {
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    flex: 1,
    left: 0,
    right: 0
  },
  background: {
    ...absolutePosition(),
    height: Dimensions.get('window').height,
    backgroundColor: Colors.primaryBlue
  },
  loginButton: {
    container: {
      backgroundColor: Colors.white,
      borderRadius: 10,
      alignSelf: 'stretch',
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      ...margin(gapSize, 20, 10, 20),
    },
    text: {
      fontSize: 22,
      fontFamily: commonStyle.museo500
    },
    replacementContainer: {
      height: 48,
      ...margin(gapSize, 20, 10, 20),
    }
  },
  skipButton: {
    container: {
      backgroundColor: Colors.transparent,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: Colors.white,
      alignSelf: 'stretch',
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      ...margin(0, 20, 18, 20),
    },
    text: {
      color: Colors.white,
      fontSize: 18,
      fontFamily: commonStyle.museo500
    }
  }
}

export default style
