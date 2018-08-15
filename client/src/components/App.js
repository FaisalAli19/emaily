import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Landing from './Landing';
import { fetchUser } from '../actions';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

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
						<div className="container">
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