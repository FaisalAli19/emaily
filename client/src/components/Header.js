import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from "./Payments";

class Header extends Component {
	renderContent = () => {
		console.log(this.props.auth);
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Login with Google</a></li>;
			default:
				return [
					<li key="1"><Payments /></li>,
					<li key="2"><span style={{ padding: '0 15px' }}>Credits: {this.props.auth.credits}</span></li>,
					<li key="3"><a href="/api/logout">Logout</a></li>
				]
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<div className="container">
						<Link to={!!this.props.auth ? "/surveys" : "/"} className="left brand-logo">Emaily</Link>
						<ul className="right">
							{this.renderContent()}
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header);
