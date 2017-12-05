import { StyleSheet, Dimensions } from 'react-native'
import Colors from '@Colors/colors'
import commonStyle from '../style'
import { dimensions, margin, border, horizontalAbsolutePosition } from '../../util/StyleUtils'

import { baselineDeltaForFonts } from '../DefaultText'
const screenWidth = Dimensions.get('window').width
const listMargin = 4 + screenWidth / 40

export const IMAGE_SIZE = 50
const IMAGE_MARGIN = 14

const styles = {
  separator: {
      ...border(['bottom'], Colors.gray5, 1),
      marginLeft: 0,
      marginRight: 0
  },
  header: {
    buttonBar: {
      ...horizontalAbsolutePosition(0, 0),
      marginTop: 15,
      height: 70,
      zIndex: 70
    },
    closeButton: {
        marginLeft: 8,
        zIndex: 100,
        position: 'absolute'
    },
    expandButton: {
      ...dimensions(70),
      position: 'absolute',
      right: 8,
    },
    expandIcon: {
      ...dimensions(18),
      ...margin(26)
    },
    businessLogo: {
      ...dimensions(84),
      marginTop: 58
    },
    title: {
      fontFamily: commonStyle.font.museo500,
      marginTop: 8,
      fontSize: 20,
    },
    subtitle: {
      fontSize: 18,
      color: Colors.gray
    },
    backgroundImage: {
      ...dimensions(screenWidth, 248),
      position: 'absolute',
      backgroundColor: '#EAEAEA'
    },
    backgroundImageContainer: {
      width: screenWidth,
    }
  },
  list: {
    tab: {
      container: {
        backgroundColor: 'white',
      }
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      height: 50,
    },
    description: {
        container: {
            paddingRight: 20,
            marginLeft: 14,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: 'white',
        },
        header: {
          fontSize: 20,
          fontFamily: commonStyle.font.museo700,
        },
        text: {
            fontFamily: commonStyle.font.museo300,
            color: Colors.offBlack,
            fontSize: 18,
            marginRight: 10,
            flex: 1
        }
    },
    button: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        alignContent: 'center',
        justifyContent: 'center'
    },
    buttonImage: {
        width: 20,
        height: 15,
        ...margin(0, IMAGE_MARGIN, 0, IMAGE_MARGIN)
    },
    leftColumn: {
      width: screenWidth / 3,
      flex: 1,
      paddingLeft: listMargin,
      alignSelf: 'center'
    },
    dateNumbers: {
      marginTop: 5,
      fontFamily: commonStyle.font.museo500
    },
    dateLetters: {
      marginTop: 5,
    },
    day: {
      position: 'absolute',
      fontSize: 17,
      top: 24,
      left: listMargin
    },
    midColumnOuter: {
      flex: 1,
      width: screenWidth / 3 ,
      alignItems: 'center',
      alignSelf: 'center'
    },
    midColumnInner: {
      alignSelf: 'center'
    },
    timeText: {
      fontFamily: commonStyle.font.museo500,
    },
    idText: {
      fontFamily: commonStyle.font.museo100,
      fontSize: 16,
    },
    price: {
      flex: 1,
      width: screenWidth / 3,
      alignSelf: 'center',
      paddingRight: listMargin
    },
  },
  footer: {
    ...border(['top'], Colors.gray5, StyleSheet.hairlineWidth),
    backgroundColor: Colors.offWhite,
    flex: 1,
    flexDirection: 'column-reverse'
  },
}

export default styles
