import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const [newInterview, setNewInterview] = useState(false);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "Saving";
  const CONFIRM = "CONFIRM";
  const DELETING = "Deleting";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview, newInterview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  }

  function deleteAppointment(event) {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function onAdd() {
    transition(CREATE)
    setNewInterview(true);
  }

  function onEdit() {
    transition(EDIT)
    setNewInterview(false);
  }

  return (

    <article className="appointment" data-testid="appointment">
      <Header
        time={props.time}>
      </Header>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Error saving appointment"
          onClose={back} />)}
      {mode === ERROR_DELETE && (
        <Error
          message="Error deleting appointment"
          onClose={back} />)}
      {mode === SAVING && (
        <Status message={SAVING} />)}
      {mode === DELETING && (
        <Status message={DELETING} />)}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleteAppointment}
          onCancel={() => back()}
        />
      )}
    </article>
  );
};

Appointment.propTypes = {
  bookInterview: PropTypes.func,
  interview: PropTypes.object,
  interviewers: PropTypes.array,
  onDelete: PropTypes.func,
  time: PropTypes.string
};