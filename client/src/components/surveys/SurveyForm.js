import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from "./SurveyField";
import validateEmails from '../../utils/validateEmails'
import { FIELDS } from './formsFields';


class SurveyForm extends Component {
	renderFields = () => {
		return FIELDS.map(({ label, name}, idx) => {
			return <Field key={idx} component={SurveyField} type="text" label={label} name={name} />;
		})
	}
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">send</i>
					</button>
				</form>
			</div>
		)
	}
}

function validate(value) {
	const errors = {};

	errors["recipients"] = validateEmails(value.recipients || "");

	FIELDS.forEach(({ name }) => {
		if (!value[name]) errors[name] = 'You must provide a value'
	})

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);