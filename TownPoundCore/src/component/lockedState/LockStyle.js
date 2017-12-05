import { StyleSheet, Dimensions } from 'react-native'
import Colors from '@Colors/colors'
import { border, absolutePosition, horizontalAbsolutePosition } from '../../util/StyleUtils'
import { screenWidth, screenHeight } from '../../util/ScreenSizes'

const style = {
  outerContainer: {
    ...horizontalAbsolutePosition(0, 0),
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    ...absolutePosition(),
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    ...border(['bottom', 'top'], Colors.gray, StyleSheet.hairlineWidth)
  },
  header: {
    backgroundColor: Colors.primaryBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  errorText: {
      fontSize: 13,
      color: Colors.red,
      textAlign: 'center'
  },
  form: {
      ...border(['bottom', 'top'],
      Colors.gray5,
      StyleSheet.hairlineWidth)
  },
  headerText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  container: {
    backgroundColor: Colors.offWhite,
    // marginBottom: 10,
    width: screenWidth * 0.9,
    // height: screenHeight * 0.5,
    elevation: 5,
    shadowOffset: {width: 5, height: 5},
    shadowColor: Colors.offBlack,
    shadowOpacity: 0.5,
    borderRadius: 5
  },
  instructionWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 7,
  },
  buttonContainer: {
    height: 40,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  pinEntry: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
  textInput: {
    padding: 10,
    textAlign: 'center',
    borderColor: Colors.primaryBlue,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 18,
    marginLeft: 40,
    marginRight: 40,
    height: 50
  }

}

export default style
