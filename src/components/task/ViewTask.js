import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./ViewTask.css"

export const ViewTask = ({ taskId, openEditTaskModal, setError, handleRerender }) => {
    const { deleteConfirmed, openDeleteConfirmationModal, closeDeleteConfirmationModalOnDelete } = useContext(AppContext);

    const [task, setTask] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const loadTask = () => {
        setError();
        setIsLoading(true);
        tasksClient.getTask(taskId, 1)
            .then(resp => {
                setTask(resp);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                handleError(err, setError);
            });
    }

    const deleteTask = (taskId) => {
        setError();
        setIsLoading(true);
        tasksClient.deleteTask(taskId, 1)
            .catch(err => handleError(err, setError));
        setIsLoading(false);
        handleRerender();
        closeDeleteConfirmationModalOnDelete();
    }

    useEffect(() => {
        if (task === undefined)
            loadTask();

        if (deleteConfirmed === true)
            deleteTask();
    }, [task, deleteConfirmed]);

    return (
        task !== undefined ? (
            <>
                <div className="task-details">
                    <div className="task-description--container">
                        {/* <h3 className="task-lbl">Description:</h3> */}
                        <p>{task.taskDescription}</p>
                    </div>
                    
                    <div className="task-create-date--container">
                        <h3 className="task-lbl">Created on:</h3>
                        <p className="created-date">{new Date(task.createDatetime).toDateString()}</p>
                    </div>

                </div>
                <div className="icon--container">
                    <div className="edit-icon" onClick={() => openEditTaskModal(taskId)}><EditIcon style={{fontSize: 22}} /></div>
                    <div className="delete-icon" onClick={() => openDeleteConfirmationModal({resourceName: task.taskName, resourceId: task.taskId, callback: () => deleteTask(task.taskId)})}><DeleteIcon style={{fontSize: 22}} /></div>
                </div>
            </>
        ) : null
    );
}