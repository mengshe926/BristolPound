import React from 'react'
import { View, TouchableHighlight, Animated, Text, Image } from 'react-native'
import DefaultText from '../DefaultText'
import Price from '../Price'
import {format} from '../../util/date'
import styles from './ProfileStyle'
import Images from '@Assets/images'
import Colors from '@Colors/colors'
import merge from '../../util/merge'
import animateTo from '../../util/animateTo'
import { IMAGE_SIZE } from './ProfileStyle'
/**
 * Render a row representing a single transaction.
 */

class TransactionItem extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      expanded: false,
      spinValue: new Animated.Value(-0.25),
      spin: '-90deg',
      height: new Animated.Value()
    }

    this.addedHeight = undefined
    this.minHeight = styles.list.rowContainer.height

    this.icons = {
      'expand': Images.expandTab
    }

    this.state = this.initialState
    this.toggle = this.toggle.bind(this)
    this.resetState = this.resetState.bind(this)
    this.expandIcon = this.icons['expand']
  }

  resetState() {
    this.setState({
      expanded: false,
      height: new Animated.Value()
    })

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transaction.description !== this.props.transaction.description) {
      this.resetState()
    }
  }

  _setAddedHeight(event) {
    this.addedHeight = event.nativeEvent.layout.height
    this.collapsedHeight = this.minHeight
    this.expandedHeight = this.addedHeight + this.minHeight

    this.state.height.setValue(this.minHeight)

  }

  toggle() {
    let initialValue = this.state.expanded
      ? this.expandedHeight
      : this.collapsedHeight

    let finalValue = this.state.expanded
      ? this.collapsedHeight
      : this.expandedHeight

    let initialRotation = this.state.expanded
      ? 0
      : -0.25

    let finalRotation = this.state.expanded
      ? -0.25
      : 0

    this.setState( {
      expanded: !this.state.expanded
    })

    this.state.height.setValue(initialValue)
    Animated.spring(
      this.state.height,
      {
        toValue: finalValue
      }
    ).start()

    animateTo(this.state.spinValue, finalRotation, 300)

    this.state.spin = this.state.spinValue.interpolate({
      inputRange: [-0.25, 0],
      outputRange: ['-90deg', '0deg']
    })

  }


  render() {
    const { transaction } = this.props
    const dateString = format(transaction.date, 'Do')

    let userEnteredDescription = transaction.description != "Online Payment from Individual Account"

    return (
      <Animated.View
        style={merge(styles.container, {height: this.state.height})}>
        <TouchableHighlight
          onPress={() => {userEnteredDescription && this.toggle()}}
          underlayColor={Colors.offWhite}>
          <View style={styles.list.tab.container}>
            <View  style={merge(styles.list.rowContainer, {marginRight: userEnteredDescription ? 0 : IMAGE_SIZE})}>
              <View style={styles.list.leftColumn}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <DefaultText style={styles.list.dateNumbers}>{dateString.substring(0, dateString.length - 2)}</DefaultText>
                  <DefaultText style={styles.list.dateLetters}>{dateString.substring(dateString.length - 2, dateString.length)}</DefaultText>
                </View>
                <DefaultText style={styles.list.day}>{format(transaction.date, 'dddd')}</DefaultText>
              </View>
              <View style={styles.list.midColumnOuter}>
                <View style={styles.list.midColumnInner}>
                  <DefaultText style={styles.list.timeText}>{format(transaction.date, 'HH:mm:ss')}</DefaultText>
                  <DefaultText style={styles.list.idText}>{transaction.transactionNumber}</DefaultText>
                </View>
              </View>
              <Price
                style={styles.list.price}
                size={27}
                price={transaction.amount}/>
              {userEnteredDescription &&
              <View>
                <View
                  style={styles.list.button}
                  underlayColor={Colors.transparent}>
                  <Animated.Image
                    style={merge(styles.list.buttonImage, {transform: [{rotate: this.state.spin}]})}
                    source={this.expandIcon}
                  ></Animated.Image>
                </View>
              </View>}
            </View>
            {userEnteredDescription &&
            <View style={styles.list.description.container} onLayout={this._setAddedHeight.bind(this)}>
              <DefaultText style={styles.list.description.header}>
                Description:
              </DefaultText>
              <Text style={styles.list.description.text}>
                { transaction.description }
              </Text>
            </View>}
          </View>
        </TouchableHighlight>

      </Animated.View>
    )

  }

}


export default TransactionItem
