import { dimensions } from '../../util/StyleUtils'
import commonStyle from '../style'

export const TAB_BAR_HEIGHT = 45
const BASELINE = 9
// react native doesn't support adjusting text baseline, so we have to use a magic number
// in order to align the amount with the icons
const MAGIC_NUMBER = 6

const style = {
  tabBar: {
    height: TAB_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'stretch',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    ...commonStyle.shadow
  },
  separator: {
    ...dimensions(1, TAB_BAR_HEIGHT / 2),
    backgroundColor: '#e2e3e6'
  },
  amountContainer: {
    width: 148,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  amountInnerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
    height: TAB_BAR_HEIGHT
  },
  centerChildren: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    height: TAB_BAR_HEIGHT,
    flex: 1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'flex-end',
    paddingBottom: BASELINE
  },
  balanceSymbol: {
    paddingRight: 4,
    marginBottom: BASELINE
  },
  amount: {
    marginBottom: BASELINE - MAGIC_NUMBER
  }
}

export default style
