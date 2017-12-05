import React from 'react'
import { View, Image } from 'react-native'
import DefaultText from '../DefaultText'
import ProfileImage from '../profileImage/ProfileImage'
import FixedScrollableList from './FixedScrollableList'
import styles from './BusinessListStyle'
import searchTabStyle from './SearchTabStyle'
import Images from '@Assets/images'
import Config from '@Config/config'

const TICK = Images.tick

const { searchHeaderText, fixedScrollableListContainer } = searchTabStyle.searchTab

const ComponentForItem = (item, onPress) => {
  if (typeof item === 'string') {
    return  <DefaultText style={searchHeaderText}>
                { item }
            </DefaultText>
  }
   return (
          <View style={styles.listItem.contents}>
              <ProfileImage image={Images[item.id]}
                  style={styles.listItem.image}
                  category={'shop'}
                  borderColor='offWhite'/>
              <View style={styles.filterItem.filterContainer}>
                  <DefaultText style={styles.filterItem.filterText}>
                      {item.label}
                  </DefaultText>
                  {item.filterActive
                    && <Image style={styles.filterItem.filterTick} source={TICK} />}
              </View>
          </View> )
}

export default class FiltersComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { componentListArray: this.createComponentListArray(props.allFilters) }
    }

    componentWillReceiveProps(nextProps) {
      const componentListArray = this.createComponentListArray(this.props.allFilters)
      this.setState({ componentListArray })
    }

    _filtersListOnClick(filter) {
      if (filter.filterActive) {
        this.props.removeFilter(filter.id)
      } else {
        this.props.addFilter(filter.id)
      }
    }

    createComponentListArray(list) {
      const setFilterState = (itemProps) => {
        itemProps.pressable = true
        itemProps.filterActive = this.props.activeFilters.includes(itemProps.id)
        return itemProps
      }
      return [ `FILTERED BY `, ...list.map(setFilterState) ]
    }

    render() {
      return (
          <FixedScrollableList
              style={fixedScrollableListContainer}
              items={this.state.componentListArray}
              componentForItem={ComponentForItem}
              onPress={(item) => this._filtersListOnClick(item)}>
          </FixedScrollableList>
        )
    }
}
