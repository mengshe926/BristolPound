import { Dimensions } from 'react-native'
 import Colors from '@Colors/colors'
import { sectionHeight, dimensions, border } from '../../util/StyleUtils'


const { width } = Dimensions.get('window')

const styles = {
  button: {
    height: sectionHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: width
  },
  cashpointDrawer: {
    height: sectionHeight,
    backgroundColor: 'white'
  },
  withdrawButtonOverlay: {
    flex: 1,
    shadowOffset: {
      width: -5,
      height: 5
    },
    shadowColor: 'black',
    shadowOpacity: 0.5
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    width: Dimensions.get('window').width - 20
  },
  noInternetMessage: {
    fontSize: 14,
    textAlign: 'center',
    width: Dimensions.get('window').width - 20,
    fontStyle: 'italic',
    color: 'red'
  },
  textInput: {
    ...dimensions(width, sectionHeight),
    padding: 10,
    textAlign: 'center'
  },
  balanceContainer: {
    ...border(['bottom'], Colors.gray5, 1),
    backgroundColor: Colors.offWhite,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceContainer: {
    flex: 1,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    justifyContent: 'flex-end'
  },
  confirmContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.offWhite
  },
  confirmPayeeContainer: {
    height: sectionHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 1
  },
  confirmDescriptionContainer: {
    height: sectionHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15
  },
  confirmPayeeText: {
    fontSize: 24,
    color: Colors.offBlack,
    textAlign: 'center'
  },
  confirmDescriptionText: {
    fontSize: 24,
    color: Colors.offBlack,
    textAlign: 'center'
  },
  confirmAmountContainer: {
    height: sectionHeight,
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray5
  }
}

export default styles
