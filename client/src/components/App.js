import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from "./Dashboard";
import Header from './Header';
import Landing from './Landing';
import SurveyNew from "./surveys/SurveyNew";
import { fetchUser } from '../actions';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<div className="container" style={{ marginTop: '30px' }}>
							<Route path="/" component={Landing} exact />
							<Route path="/surveys" component={Dashboard} exact />
							<Route path="/surveys/new" component={SurveyNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchUser: () => dispatch(fetchUser())
})


export default connect(null, mapDispatchToProps)(App);