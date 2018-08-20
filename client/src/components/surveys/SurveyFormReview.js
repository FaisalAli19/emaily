import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { FIELDS }  from "./formsFields";
import { submitSurvey } from "../../actions";

const SurveyFormReview = ({ onCancle, values, submitForm, history }) => {
	const reviewFields = FIELDS.map(({ name, label }, idx) => {
			return (
				<div key={idx}>
					<label style={{ fontSize: '.9rem' }}>{label}</label>
					<div style={{ margin: '10px 0 20px' }}>{values[name]}</div>
				</div>
			);
	})
	return <div>
      <h5>Please confirm your entries</h5>
      <div>{reviewFields}</div>
      <button className="yellow darken-3 btn-flat white-text" onClick={onCancle}>
        Back
      </button>
      <button className="green btn-flat white-text right" onClick={() => submitForm(values, history)}>
				Send Survey
				<i className="material-icons right">email</i>
      </button>
    </div>;
};

const mapStateToProps = ({ form }) => ({ values: form.surveyForm.values })

const mapDispatchToProps = dispatch => ({
	submitForm: (values, history) => dispatch(submitSurvey(values, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyFormReview));