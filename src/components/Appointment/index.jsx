import React from "react";
import "components/Appointment/styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";
import { useEffect } from "@storybook/addons";

export default function Appointment(props) {
  //transition variables
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const cancel = function () {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className='appointment'>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={() => transition(EDIT)}
          time={props.time}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message={"Updating..."} />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={cancel}
          onCancel={back}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(SHOW)}
          // onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          onClose={() => transition(EMPTY)}
          message={"Error: can't save"}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          // onClose={back}
          onClose={() => transition(back)}
          message={"Error: can't save"}
        />
      )}
    </article>
  );
}
