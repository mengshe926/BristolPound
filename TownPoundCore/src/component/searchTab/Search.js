import React from 'react'
import { View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import _ from 'lodash'
import haversine from 'haversine'

import DefaultText from '../DefaultText'
import BusinessListItem from './BusinessListItem'
import { Button } from '../common/Button'
import DraggableList from './DraggableList'
import ComponentList from './ComponentList'
import FiltersComponent from './FiltersComponent'

import { tabModes } from '../../store/reducer/business'
import FixedScrollableList from './FixedScrollableList'
import Colors from '@Colors/colors'
import { addColorCodes } from '../../util/business'
import searchTabStyle, { maxExpandedHeight, SEARCH_BAR_HEIGHT, SEARCH_BAR_MARGIN } from './SearchTabStyle'
import { ROW_HEIGHT } from './BusinessListStyle'
import Images from '@Assets/images'

const { searchBar, textInput, searchHeaderText, closeButton, nearbyButton, fixedScrollableListContainer } = searchTabStyle.searchTab

const CLOSE_BUTTON = Images.close
const FILTER_BUTTON = Images.filters
const FILTER_DISABLED_BUTTON = Images.filtersDisabled
const NEARBY_BLUE = Images.nearbyBlue
const NEARBY_GREY = Images.nearbyGrey

const MAX_LIST_LENGTH = 50

const ComponentForItem = (item) => {
  if (typeof item === 'string') {
    return  <DefaultText style={searchHeaderText}>
                { item }
            </DefaultText>
  }
  return <BusinessListItem business={item}/>
}

export default class Search extends React.Component {
    constructor(props) {
      super(props)
      this.state = { searchTerms: [], componentListArray: [], input: null, searching: false }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.tabMode !== tabModes.search && this.props.tabMode === tabModes.search) {
        this.refs.textInput.blur()
        this.setState({ searchTerms: [], input: null, componentListArray: [], searching: false })
      }
    }

    updateResults = (allBusinesses = this.props.allBusinesses) => {
      const termsMatch = (field) => {
        let match = true
        this.state.searchTerms.forEach((term) => {
          if (!field || match && field.toLowerCase().indexOf(term.toLowerCase()) === -1) {
            match = false
          }
        })
        return match
      }
      const filteredBusinessList = this.state.searchTerms.length
      ? _.filter(allBusinesses, business => termsMatch(business.name) || termsMatch(business.fields.username) || (business.fields.description && termsMatch(business.fields.description)))
      : []
      const componentListArray = this.createComponentListArray(filteredBusinessList)
      this.setState({ componentListArray, searching: false })
    }

    debouncedUpdate = _.debounce(() => this.updateResults(), 800)

    _onChangeText(input) {
      this.setState({ searchTerms: input ? input.split(' ') : [], input: input || null, searching: true })
      this.debouncedUpdate()
    }

    _businessListOnClick(item) {
      this.refs.textInput.blur()
      this.props.openTraderModal(item.id)
    }

    nearbyButtonEnabled() {
      return this.props.geolocationStatus && haversine(this.props.geolocationStatus, this.props.mapViewport) > 0.1 //km
    }

    nearbyButtonPressed() {
      if (this.nearbyButtonEnabled()) {
        const { latitude, longitude } = this.props.geolocationStatus
        this.props.moveMap({ latitude, longitude })
      }
    }

    createComponentListArray(list) {
      const cropped = list.length > MAX_LIST_LENGTH
      const matches = list.length
      if (cropped) {
        list.length = MAX_LIST_LENGTH
      }
      const coloredList = addColorCodes(list)
      const makePressable = (itemProps) => {
        itemProps.pressable = true
        return itemProps
      }
      const array = this.state.input == null ? [ ...coloredList.map(makePressable) ] : [ `BUSINESSES (${matches} ${matches == 1 ? "MATCH" : "MATCHES"})`, ...coloredList.map(makePressable) ]
      if (cropped) {
        array.push(`${matches - MAX_LIST_LENGTH} ADDITIONAL RESULTS NOT DISPLAYED`)
      }
      return array
    }

    render() {
      const { componentListArray, input } = this.state
      const { tabMode, updateTabMode } = this.props

      let button
      let modeComponent
      if (tabMode===tabModes.search) {
        button = <Button
                    onPress={() => updateTabMode(tabModes.default)}
                    buttonType={CLOSE_BUTTON}
                    style={closeButton}
                    size={SEARCH_BAR_HEIGHT}/>
        modeComponent = <FixedScrollableList
                    style={fixedScrollableListContainer}
                    items={componentListArray}
                    componentForItem={ComponentForItem}
                    onPress={(item) => item.id && this._businessListOnClick(item)}/>
      } else if (tabMode===tabModes.default) {
        button = <Button
                    onPress={() => updateTabMode(tabModes.filter)}
                    buttonType={this.props.activeFilters.length > 0 ? FILTER_BUTTON : FILTER_DISABLED_BUTTON}
                    style={closeButton}
                    size={SEARCH_BAR_HEIGHT}/>
        modeComponent = undefined
      } else if (tabMode===tabModes.filter) {
        button = <Button
                    onPress={() => updateTabMode(tabModes.default)}
                    buttonType={CLOSE_BUTTON}
                    style={closeButton}
                    size={SEARCH_BAR_HEIGHT}/>
        modeComponent = <FiltersComponent
                    allFilters={this.props.allFilters}
                    activeFilters={this.props.activeFilters}
                    removeFilter={this.props.removeFilter}
                    addFilter={this.props.addFilter}/>
      }

      return (
        <View>
          {modeComponent}
          <View style={searchBar}>
            <TouchableOpacity style={nearbyButton}
                onPress={() => this.nearbyButtonPressed()}>
              <Image source={this.nearbyButtonEnabled() ? NEARBY_BLUE : NEARBY_GREY}/>
            </TouchableOpacity>
            <TextInput accessibilityLabel='Search'
                       ref='textInput'
                       onFocus={() => tabMode!==tabModes.search && updateTabMode(tabModes.search)}
                       onChangeText={(text) => this._onChangeText(text)}
                       placeholder={'Search Business'}
                       placeholderTextColor={Colors.gray4}
                       selectTextOnFocus={true}
                       autoCorrect={false}
                       style={textInput}
                       value={input}
                       underlineColorAndroid={Colors.transparent}/>
          {tabMode===tabModes.search && this.state.searching && <ActivityIndicator />}
          {button}
          </View>
        </View>
      )
    }
}
