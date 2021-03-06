import React from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { toggleLoginModal, signIn } from "../actions/loginActions";
import LogInForm from "../components/LogInForm/LogInForm";
import Api from "../utils/Api";
import { SubmissionError } from "redux-form";
import { getOrder } from "../actions/cartActions";
import { isModalOpenSelector } from "../selectors/ProfileSelectors";

class LogInContainer extends React.Component{
    render(){
        let {LoginSubmit} = this.props;
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Log In</ModalHeader>
                <ModalBody>
                    <LogInForm onSubmit={LoginSubmit} />
                </ModalBody>
            </Modal>
        );
    }
}

function submit(values, dispatch){
	return Api.authentication(values)
				.then(response => {
			dispatch(toggleLoginModal());
			dispatch(signIn(response.user, response.token));
			dispatch(getOrder());
			localStorage.setItem("teostofell::timestamp", Date.now());
		})
		.catch(error => {
			throw new SubmissionError({
				_error: "Login failed. Check your fields."
			});
		});
}

const mapStateToProps = state => {
	return {
		isOpen: isModalOpenSelector(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
        toggle: () => dispatch(toggleLoginModal()),
        LoginSubmit: submit,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer);