import { StyleSheet, Dimensions } from 'react-native'
import Colors from '@Colors/colors'
import { border, horizontalAbsolutePosition } from '../../util/StyleUtils'
import { screenWidth, screenHeight } from '../../util/ScreenSizes'

const style = {
  outerContainer: {
    ...horizontalAbsolutePosition(0, 0),
    backgroundColor: 'transparent',
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
  headerText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  container: {
    backgroundColor: Colors.offWhite,
    width: screenWidth * 0.9,
    height: screenHeight * 0.5,
    elevation: 5,
    shadowOffset:{width: 5, height: 5},
    shadowColor: Colors.offBlack,
    shadowOpacity: 0.5
  },
  instructionWrapper: {
    flex: 1,
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
  instructionTextHTML: {
    div: {
      textAlign: 'center'
    },
    p: {
      fontSize: 14,
      color: Colors.gray
    }
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 7
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  pinEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
  textInput: {
    width: screenWidth * 0.7,
    paddingHorizontal: 10,
    paddingVertical: 0,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primaryBlue,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 10,
  }

}

export default style
