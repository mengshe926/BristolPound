import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import DefaultText from './DefaultText'
import Colors from '@Colors/colors'
import merge from '../util/merge'

const style = {
  banner: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    left: 0,
    right: 0,
    backgroundColor: Colors.gray3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerTop: {
    position: 'absolute',
    top: 0,
    height: 40,
    left: 0,
    right: 0,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: Colors.white
  }
}


const NetworkConnection = (props) =>
  !props.status
    ? <View style={props.top ? style.bannerTop : style.banner}>
        <DefaultText style={style.text}>Unable to connect to internet</DefaultText>
      </View>
    : null

const mapStateToProps = (state) => ({
    ...state.networkConnection,
    loginFormOpen: state.login.loginFormOpen
})

export default connect(mapStateToProps)(NetworkConnection)
