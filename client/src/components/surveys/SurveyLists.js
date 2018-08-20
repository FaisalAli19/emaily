import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../actions'

class SurveyLists extends Component {
	componentDidMount(){
		this.props.fetchSurveys()
	}
	renderSurveys(){
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className="card blue-grey darken-1" key={survey.id}>
					<div className="card-content">
						<span className="card-title white-text">{survey.title}</span>
						<p className="white-text">{ survey.body }</p>
						<p className="right white-text">Sent On: { new Date(survey.dateSent).toLocaleDateString() }</p>
					</div>
					<div className="card-action">
						<a className="white-text">Yes: { survey.yes }</a>
						<a className="white-text">No: {survey.no}</a>
					</div>
				</div>
			);
		})
	}
	render() {
		return (
			<div class>
				{this.renderSurveys()}
			</div>
		)
	}
}

const mapStateToProps = ({ surveys }) => ({ surveys })

const mapDispatchToProps = dispatch => ({
  fetchSurveys: () => dispatch(fetchSurveys())
});


export default connect(mapStateToProps, mapDispatchToProps)(SurveyLists);