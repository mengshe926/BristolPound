import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert } from 'react-native'

import { resetForm, askToContinuePayment, returnToPayment } from '../store/reducer/sendMoney'
import { hideModal } from '../store/reducer/navigation'

class ContinuePaymentAlert extends React.Component {
    returnToPayment () {
        this.props.returnToPayment()
        this.props.askToContinuePayment(false)
    }

    clearPayment () {
        this.props.resetForm()
        this.props.hideModal()
        this.props.askToContinuePayment(false)
    }

    render () {
        return (
            Alert.alert(
                'Would you like to go back to finish your payment?',
                '',
                [
                    {text: 'No', onPress: () => this.clearPayment()},
                    {text: 'Yes', onPress: () => this.returnToPayment()}
                ]
            )
        )
    }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ askToContinuePayment, hideModal, resetForm, returnToPayment }, dispatch)

export default connect(null, mapDispatchToProps)(ContinuePaymentAlert)
