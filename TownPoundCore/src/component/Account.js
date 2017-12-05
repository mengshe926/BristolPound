import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, ListView, TouchableHighlight } from 'react-native'
import DefaultText from './DefaultText'
import Colors from '@Colors/colors'
import { logout } from '../store/reducer/login'
import { updateStatus } from '../store/reducer/statusMessage'
import ProfileHeader from './profileScreen/ProfileHeader'
import styles from './AccountStyle'

const renderSeparator = (sectionID, rowID) =>
  <View style={styles.separator} key={`sep:${sectionID}:${rowID}`}/>

const renderSectionHeader = (sectionData, sectionID) =>
  <View style={styles.sectionHeader.container} key={sectionID}>
    <DefaultText style={styles.sectionHeader.text}>
      {sectionID.toUpperCase()}
    </DefaultText>
  </View>

const AccountOption = ({text, secondaryText, onPress, index}) =>
  <TouchableHighlight
      onPress={() => onPress ? onPress() : undefined}
      key={index}
      underlayColor={onPress ? Colors.gray5 : Colors.transparent}>
    <View style={styles.row.container}>
      <DefaultText style={styles.row.label}>{text}</DefaultText>
      { secondaryText
        ? <DefaultText style={styles.row.secondary}>{secondaryText}</DefaultText>
        : undefined }
    </View>
  </TouchableHighlight>

const Account = (props) => {
  let ds = new ListView.DataSource({
    rowHasChanged: (a, b) => a.text !== b.text || a.secondaryText !== b.secondaryText,
    sectionHeaderHasChanged: (a, b) => a !== b
  })
  const data = {
    'Profile Settings': [{
        text: 'Email',
        secondaryText: (props.details && props.details.email) || 'Not set'
      }, {
        text: 'Phone',
        secondaryText: (props.details && props.details.phones && props.details.phones.length > 0) ? props.details.phones[0].normalizedNumber : 'Not set'
      }, {
        text: 'Log out',
        onPress: () => {
          props.logout()
          props.updateStatus('Logged out ✓')
        }
      }]
  }
  ds = ds.cloneWithRowsAndSections(data, Object.keys(data))

  return (
    <View style={styles.container}>
      <ProfileHeader
        name={props.details.display}
        username={props.details.shortDisplay}
        image={props.details.image && props.details.image.url}
        category='person'/>
      <ListView
        style={styles.detailsList}
        dataSource={ds}
        scrollEnabled={false}
        renderSeparator={renderSeparator}
        renderSectionHeader={renderSectionHeader}
        renderRow={(accountOption, i) => <AccountOption {...accountOption} index={i}/> }
        removeClippedSubviews={false}/>
    </View>
  )
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ logout, updateStatus }, dispatch)

const mapStateToProps = state => state.account

export default connect(mapStateToProps, mapDispatchToProps)(Account)
