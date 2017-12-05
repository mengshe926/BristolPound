import { StyleSheet } from 'react-native'
import { dimensions, margin, border, padding } from '../../util/StyleUtils'
import commonStyle from '../style'
import Colors from '@Colors/colors'

const styles = {
  description: {
    ...margin(18, 24, 0, 24)
  },
  separator: {
    ...border(['bottom', 'top'], Colors.gray5, StyleSheet.hairlineWidth)
  },
  field: {
    ...margin(18, 24, 0, 24),
    flexDirection: 'row',
    paddingTop: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start'
  },
  image: {
    ...dimensions(18, 20),
    marginRight: 16
  },
  item: {
    flexDirection: 'column',
    flex: 1
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: Colors.gray,
    flexWrap: 'wrap',
  },
  minorButtonText: {
    fontFamily: commonStyle.font.museo500,
    alignSelf: 'center',
    color: Colors.primaryBlue,
    backgroundColor: Colors.transparent,
    fontSize: 14,
    marginTop: 18,
    paddingBottom: 8
  },
  addressOnly: {
    ...padding(18, 0, 30, 0)
  },
  moreDetails: {
    paddingBottom: 12
  }
}

export default styles
