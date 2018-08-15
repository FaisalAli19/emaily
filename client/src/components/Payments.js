import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { handleToken } from '../actions';

class Payments extends Component {
	render() {
		return (
			<div>
				<StripeCheckout 
					amount={500}
					description="5$ for 5 credits"
					name="Emaily"
					stripeKey={process.env.REACT_APP_STRIPE_KEY}
					token={token => this.props.handleToken(token)}
				>
					<button className="btn-flat" style={{ color: '#fff', textTransform: 'capitalize' }}>
						Add Credits
					</button>
				</StripeCheckout>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	handleToken: (token) => dispatch(handleToken(token))
});


export default connect(null, mapDispatchToProps)(Payments);