import { maxExpandedHeight, maxCollapsedHeight } from '../component/searchTab/SearchTabStyle'
import { ROW_HEIGHT } from '../component/searchTab/BusinessListStyle'
import { BUSINESS_LIST_SELECTED_GAP } from '../component/searchTab/BusinessListStyle'

const SHORT_LIST_BOTTOM_GAP = 12

const calculatePanelHeight = (rowCount, selectedBusiness) => {
  // If there's a selected business (but zoomed out so no closestBusinesses),
  // then don't have a gap at the bottom for the collapsed height
  const extraGap = rowCount ? SHORT_LIST_BOTTOM_GAP : 0

  const selectedBusinessModifier = selectedBusiness ? BUSINESS_LIST_SELECTED_GAP + ROW_HEIGHT : 0
  const collapsedHeight = Math.min(
    rowCount * ROW_HEIGHT + selectedBusinessModifier + extraGap,
    maxCollapsedHeight
  )
  const expandedHeight = Math.max(
    Math.min(rowCount * ROW_HEIGHT + selectedBusinessModifier + BUSINESS_LIST_SELECTED_GAP, maxExpandedHeight),
    collapsedHeight
  )
  const closedHeight = Math.max(ROW_HEIGHT * Math.min(rowCount, 1), selectedBusinessModifier)

  return ({ collapsedHeight, expandedHeight, closedHeight })
}

export default calculatePanelHeight
