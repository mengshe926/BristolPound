import React from 'react'
import Communications from 'react-native-communications'
import HTMLView from 'react-native-htmlview'
import { View, Linking, Image, TouchableOpacity, Text } from 'react-native'
import { MultilineText } from '../DefaultText'
import addressToString from '../../util/addresses'
import styles from './BusinessDetailsStyle'
import Images from '@Assets/images'
import Config from '@Config/config'
import _ from 'lodash'

const Field = ({icon, text, accessibilityLabel, onPress, additionalOption}) =>
  <View style={styles.field}>
    <Image style={styles.image} source={icon} resizeMode='contain'/>
    <View style={styles.item}>
      <TouchableOpacity accessibilityLabel={accessibilityLabel} onPress={onPress}>
        <MultilineText style={styles.text}>{text}</MultilineText>
      </TouchableOpacity>
      {additionalOption &&
      <TouchableOpacity accessibilityLabel={accessibilityLabel} onPress={onPress}>
        <MultilineText style={styles.text}>{additionalOption.text}</MultilineText>
      </TouchableOpacity>}
    </View>
  </View>

const renderFields = (fields) =>
  <View>
    {fields.map((field) => (
      // 'key' is magic so isn't passed down into the method.
      // Hence define a duplicate accessibilityLabel.
      field
        ? <Field {...field} accessibilityLabel={field.key}/>
        : null
    ))}
  </View>

const renderExpander = (expandDetailsFn) =>
  <View style={{paddingTop: 12}}>
    <View style={styles.separator}/>
    <TouchableOpacity
      onPress={expandDetailsFn}
      accessiblityLabel='View Full Details'>
      <View>
        <Text style={styles.minorButtonText}>VIEW DETAILS</Text>
      </View>
    </TouchableOpacity>
  </View>

const renderDescription = (description) => {
  return (
    description
      ? <View style={{ paddingTop: 12 }}>
          <View style={styles.separator}/>
          <View style={styles.description} accessibilityLabel='Business Description'>
            <HTMLView value={description.replace(/\\n/g, '')} onLinkPress={url => Linking.openURL(url)} />
          </View>
        </View>
      : null
    )
}




function getFields(business, goToTraderLocation) {
  const fields = [],
      businessDetail = (key, icon, text, onPress, additionalOption = null) => ({ key, icon, text, onPress, additionalOption })

  const phoneDetail = () => {
    let phoneNumbers = business.fields.businessphone.split("/")
    let additionalNumber = phoneNumbers.length == 2
      ? {text: phoneNumbers[1].trim(), onPress: () => Communications.phonecall(phoneNumbers[1].trim(), true)}
      : null
    fields.push(
      businessDetail('phoneField', Images.phone, phoneNumbers[0].trim(), () => Communications.phonecall(phoneNumbers[0].trim(), true), additionalNumber)
    )
  }

  // Order of display should be:
  //    cash point, special offer*, address, opening times*, phone number, email address
  // Note: special offer aren't supported yet.
    _.has(business.subCategories, 'cashpoint1') && fields.push(
      businessDetail('cashPoint1Field', Images.cashpoint1, business.subCategories.cashpoint1 +': '+ Config.CASH_POINT_1, () => {} )
    )

    _.has(business.subCategories, 'cashpoint2') && fields.push(
      businessDetail('cashPoint2Field', Images.cashpoint2, business.subCategories.cashpoint2 +': '+ Config.CASH_POINT_2, () => {} )
    )

    business.fields.memberdiscount && fields.push(
      businessDetail('discountField', Images.deal, business.fields.memberdiscount, () => {} )
    )

    business.address.location && fields.push(
      businessDetail('addressField', Images.address, addressToString(business.address), goToTraderLocation )
    )

    business.fields.businessphone && phoneDetail()

    business.fields.businessemail && fields.push(
      businessDetail('emailField', Images.email, business.fields.businessemail, () => Communications.email([business.fields.businessemail], null, null, null, null))
    )

    business.fields.facebook && fields.push(
      businessDetail('facebookField', Images.facebook, business.name, () => Communications.web(business.fields.facebook))
    )

    business.fields.businesswebsite && fields.push(
          businessDetail('websiteField', Images.website, business.fields.businesswebsite, () => Communications.web(business.fields.businesswebsite))
    )

    business.fields.twitter && fields.push(
          businessDetail('twitterField', Images.twitter, business.fields.twitter.split("@").join(""), () => Communications.web("https://www.twitter.com/" + business.fields.twitter.split("@").join("")))
    )

    business.fields.linkedin && fields.push(
          businessDetail('linkedinField', Images.linkedin, business.name, () => Communications.web(business.fields.linkedin))
    )

    business.fields.flickr && fields.push(
          businessDetail('flickrField', Images.flickr, business.name, () => Communications.web(business.fields.flickr))
    )

    business.fields.businessopeninghours && fields.push(
      businessDetail('openingHoursField', Images.opening, business.fields.businessopeninghours, () => {})
    )

  return fields
}

const renderExpandedDetails = (expandedFields, description) => {
  return (
      <View>
        {renderFields(expandedFields)}
        {description ? renderDescription(description) : undefined}
      </View>
    )
}


class BusinessDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isExpanded: props.isExpanded }
  }

  expandDetails() {
    this.setState({isExpanded: true})
  }

  render() {
    const fields = getFields(this.props.business, this.props.goToTraderLocation)
    let expandedFields = []

    if(fields.length > 2) {
      expandedFields = fields.slice(2)
      fields.length = 2
    }

    return (
      <View style={fields.length > 1 ? styles.moreDetails : styles.addressOnly}>
        {renderFields(fields)}
        {(this.state.isExpanded || !Config.ALLOW_LOGIN)
          ? renderExpandedDetails(expandedFields, this.props.business.fields.description)
          : ((expandedFields.length > 0 || this.props.business.fields.description)
              ? renderExpander(() => this.expandDetails())
              : undefined
            )
        }
      </View>
    )
  }
}

export default BusinessDetails
