import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { openLoginForm } from '../../store/reducer/login'
import { setOverlayOpen } from '../../store/reducer/navigation'
import { Overlay } from '../common/Overlay'
import Colors from '@Colors/colors'

const LoginOverlay = (props) =>
    <Overlay
        overlayVisible={props.overlayVisible}
        onPress={() => props.openLoginForm(false) && props.setOverlayOpen(false)}
        underlayColor={Colors.transparent}
    />



const mapDispatchToProps = (dispatch) => bindActionCreators({ openLoginForm, setOverlayOpen }, dispatch)
const mapStateToProps = (state) => ({
	loginFormOpen: state.login.loginFormOpen,
	overlayVisible: state.navigation.overlayVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginOverlay)
