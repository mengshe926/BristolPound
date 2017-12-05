import React from'React'
import { StyleSheet } from 'react-native'
import { border } from '../../util/StyleUtils'
import Colors from '@Colors/colors'
import { screenWidth, screenHeight } from '../../util/ScreenSizes'

const style = {
    wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
      backgroundColor: Colors.primaryBlue,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10
    },
    headerText: {
      flex: 1,
      color: 'white',
      textAlign: 'center',
      fontSize: 20
    },
    container: {
      backgroundColor: Colors.offWhite,
      marginBottom: 100,
      width: screenWidth * 0.9,
      height: screenHeight * 0.5,
      elevation: 5,
      shadowOffset:{width: 5, height: 5},
      shadowColor: Colors.offBlack,
      shadowOpacity: 0.5,
      borderRadius: 5
    },
    instructionText: {
        fontSize: 16,
        color: Colors.gray,
        padding: 10,
        textAlign: 'center',
        marginBottom: 7
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
    pinEntry: {
      flex: 1,
      justifyContent: 'center',
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
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 7
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
    buttonText: {
        fontSize: 18,
        textAlign: 'center'
    }
}

export default style
