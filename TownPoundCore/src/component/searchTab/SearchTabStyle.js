import { Dimensions } from 'react-native'

import platform from '../../util/Platforms'
 import Colors from '@Colors/colors'
import commonStyle from '../style'
import { dimensions, margin, padding } from '../../util/StyleUtils'
import { isScreenSmall, screenHeight } from '../../util/ScreenSizes'
import { TAB_BAR_HEIGHT } from '../tabbar/TabBarStyle'

const MARGIN_SIZE = 10
export const NEARBY_WIDTH = 39
export const SEARCH_BAR_MARGIN = 35
const SEARCH_BAR_WIDTH = Dimensions.get('window').width - 2 * MARGIN_SIZE

export const SEARCH_BAR_HEIGHT = isScreenSmall ? 44 : 48

export const maxExpandedHeight = screenHeight - SEARCH_BAR_MARGIN - SEARCH_BAR_HEIGHT - TAB_BAR_HEIGHT
export const maxCollapsedHeight = 45/100 * screenHeight - TAB_BAR_HEIGHT

const styles = {
  searchTab: {
    expandPanel: {
      left: MARGIN_SIZE,
      right: MARGIN_SIZE,
    },
    searchBar: {
      ...margin(SEARCH_BAR_MARGIN, MARGIN_SIZE, 0, MARGIN_SIZE),
      ...dimensions(SEARCH_BAR_WIDTH, SEARCH_BAR_HEIGHT),
      ...commonStyle.shadow,
      backgroundColor: Colors.white,
      flexDirection: 'row',
      borderRadius: 2,
      zIndex: platform.isIOS() ? undefined : 200
    },
    nearbyButton: {
      width: NEARBY_WIDTH,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      ...margin(5, 9),
      ...padding(2),
      ...dimensions(SEARCH_BAR_WIDTH - SEARCH_BAR_HEIGHT - NEARBY_WIDTH - SEARCH_BAR_HEIGHT, SEARCH_BAR_HEIGHT - 10),
      fontSize: 16,
      backgroundColor: Colors.white,
      color: Colors.primaryBlue,
    },
    closeButton: {
      alignSelf: 'center',
      borderLeftWidth: 1,
      borderLeftColor: Colors.gray5,
      right: 0,
      position: 'absolute',
    },
    searchHeaderText: {
      ...commonStyle.sectionHeader.text,
      color: Colors.gray1,
      ...margin(20, 0, 10, 14),
      backgroundColor: Colors.transparent
    },
    hide: {
      height: 0
    },
    fixedScrollableListContainer: {
      left: MARGIN_SIZE,
      right: MARGIN_SIZE,
      flex: 1,
      maxHeight: maxExpandedHeight,
      top: SEARCH_BAR_HEIGHT + SEARCH_BAR_MARGIN,
      overflow: 'hidden',
      position: 'absolute',
      // zIndex is needed for overflow: hidden on android, but breaks shadow on iOS
      zIndex: platform.isIOS() ? undefined : 100,
      backgroundColor: 'white',
      elevation: 3
    }
  }
}

export default styles
