import React from 'react'
import { View } from 'react-native'
import DefaultText from '../DefaultText'
import ProfileImage from '../profileImage/ProfileImage'
import styles from './BusinessListStyle'
import merge from '../../util/merge'
import { SEARCH_BAR_HEIGHT } from './SearchTabStyle'
import { Button } from '../common/Button'
import Images from '@Assets/images'


const CLOSE_BUTTON = Images.close

class BusinessListItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.business.colorCode !== this.props.business.colorCode
  }

  setNativeProps() {
    this.refs.businessListItem.setNativeProps(this.props)
  }

  render() {
    const { container, contents, status, statusSelected, title, verticalStack, closeButton } = styles.listItem
    const { colorCode } = this.props.business
    const { businesscategory, username } = this.props.business.fields
    const statusStyle = merge(status, this.props.isSelected ? statusSelected : {})

    var image = this.props.business.image.url

    return (
      <View style={container} ref="businessListItem">
          <View style={statusStyle}/>
          <View style={contents}>
              <ProfileImage image={image ? {uri: image} : undefined} style={styles.listItem.image} category={'shop'} borderColor='offWhite' colorCode={colorCode}/>
              <View style={verticalStack}>
                  <DefaultText style={title}>{this.props.business.name}</DefaultText>
                  <DefaultText style={styles.listItem.shortDisplay}>{username}</DefaultText>
              </View>
          </View>
          {this.props.isSelected && <Button onPress={this.props.deselect} buttonType={CLOSE_BUTTON} style={closeButton} size={SEARCH_BAR_HEIGHT+10}/>
          }
      </View>
    )
  }
}


export const SelectedBusiness = (props) => {
  return <BusinessListItem {...{ ...props, isSelected: true }}/>
}


export default BusinessListItem
