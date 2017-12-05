import commonStyle from '../style'
import Colors from '@Colors/colors'

const style = {
  welcome: {
    welcomeText: {
      color: Colors.white,
      fontSize: 26,
      fontFamily: commonStyle.museo300
    },
    usernameText: {
      color: Colors.white,
      fontSize: 30,
      fontFamily: commonStyle.museo700
    },
  },
  infoText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: commonStyle.museo700
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center'
  }
}

export default style
