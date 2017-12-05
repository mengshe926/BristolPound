 import Colors from '@Colors/colors'
import { dimensions, border } from '../util/StyleUtils'

const museo900 = 'MuseoSans-900'
const museo700 = 'MuseoSans-700'
const museo500 = 'MuseoSans-500'
const museo300 = 'MuseoSans-300'
const museo100 = 'MuseoSans-100'
const museo900i = 'MuseoSans-900Italic'
const museo700i = 'MuseoSans-700Italic'
const museo500i = 'MuseoSans-500Italic'
const museo300i = 'MuseoSans-300Italic'
const museo100i = 'MuseoSans-100Italic'

const style = {
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      ...dimensions(0)
    },
    elevation: 10
  },
  minorShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      ...dimensions(0)
    },
    elevation: 5
  },
  font: {
    museo900,
    museo700,
    museo500,
    museo300,
    museo100,
    museo900i,
    museo700i,
    museo500i,
    museo300i,
    museo100i
  },
  sectionHeader: {
    container: {
      ...border(['bottom', 'top'], Colors.gray5, 1),
      height: 34,
      backgroundColor: Colors.offWhite,
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      fontFamily: museo700,
      fontSize: 14,
      color: Colors.gray3,
      marginLeft: 14
    }
  }
}

export default style
