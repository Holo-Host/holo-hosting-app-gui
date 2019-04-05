import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudCreate, SaveButton } from 'react-admin';

export const saveWithNote = (resource, values, basePath, redirectTo) => {
    const action = crudCreate(resource, {...values, average_note: 10}, basePath, redirectTo);
    action.meta.refresh = true;
    return action;
}

class SaveButtonComponent extends Component {
    handleClick = () => {
      console.log("I'm inside the handler for SaveWithNoteButtonComponent", this.props);
        const { resource, basePath, handleSubmit, redirect, saveWithNote } = this.props;
        return handleSubmit(values => {
          saveWithNote(resource, values, basePath, redirect);
        });
    };

    render() {
        console.log("I'm OUTSIDE the handler for SaveWithNoteButtonComponent", this.props);
        const { handleSubmitWithRedirect, saveWithNote, ...props } = this.props;
        return (
            <SaveButton
                handleSubmitWithRedirect={this.handleClick}
                redirect="show"
                {...props}
            />
        );
    }
}

export default connect(
    undefined,
    { saveWithNote }
)(SaveButtonComponent);
