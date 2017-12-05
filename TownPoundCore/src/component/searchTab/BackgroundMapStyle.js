import { horizontalAbsolutePosition } from '../../util/StyleUtils'
import { mapHeight, mapOverflow } from '../../store/reducer/business'

const style = {
  mapContainer: {
    ...horizontalAbsolutePosition(0, 0),
    top: -1 * mapOverflow,
    height: mapHeight,
  },
  map: {
    ...horizontalAbsolutePosition(0, 0),
    top: 0,
    bottom: 0,
  },
  loadingOverlay: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  warningContainer: {
    backgroundColor: 'red',
    height: 320,
    ...horizontalAbsolutePosition(0, 0),
    flex: 1,
    alignItems: 'center',
    paddingTop: 200,
    top: 0
  }
}

export default style
