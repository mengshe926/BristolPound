 import Colors from '@Colors/colors'
import { isScreenSmall } from '../../util/ScreenSizes'
import { dimensions, padding, border, margin } from '../../util/StyleUtils'

export const ROW_HEIGHT = isScreenSmall ? 50 : 60
const CONTENT_PADDING = isScreenSmall ? 4 : 8
export const BUSINESS_LIST_SELECTED_GAP = 10

const styles = {
  listItem: {
    // to be merged with container.
    // If the container is unselected, then it's adjacent, so needs a separator.
    // If the container is selected then we need to round it to match whatever is above it.
    containerSelected: {
      borderRadius: 2,
      borderTopWidth: 0,
    },
    containerTopOfList: {
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      borderTopWidth: 0,
    },
    container: {
      ...border(['top'], Colors.offWhite, 1),
      flexDirection: 'row',
      height: ROW_HEIGHT,
      backgroundColor: Colors.transparent
    },
    containerHighlighted: {
      backgroundColor: Colors.offWhite
    },
    // The container contains a color coded margin, an image and a title.
    status: {
      width: 5,
    },
    statusSelected: {
      backgroundColor: Colors.primaryBlue,
      borderBottomLeftRadius: 2,
      borderTopLeftRadius: 2
    },
    statusTopOfList: {
      borderTopLeftRadius: 2
    },
    contents: {
      ...padding(CONTENT_PADDING, 0, CONTENT_PADDING, 5),
      flex: 1,
      flexDirection: 'row',
    },
    image: {
      ...dimensions(isScreenSmall ? 42 : 44),
      paddingRight: 5,
      borderRadius: 5,
    },
    verticalStack: {
      ...padding(0, 10, 0, 10),
      flex: 1,
      flexDirection: 'column'
    },
    title: {
      fontSize: isScreenSmall ? 16 : 18,
      marginTop: 2
    },
    shortDisplay: {
      fontSize: 14,
      color: Colors.gray3,
      marginBottom: 6
    },
    closeButton: {
      alignSelf: 'center',
      borderLeftWidth: 1,
      borderLeftColor: Colors.gray5,
      zIndex: 800
    }
  },
  filterItem: {
    filterContainer: {
      marginLeft: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      marginRight: 10
    },
    filterText: {
      fontSize: isScreenSmall ? 16 : 18
    },
    filterTick: {
      ...dimensions(18),
      ...margin(3)
    },
  }
}

export default styles
