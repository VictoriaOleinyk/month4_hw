import React, { useState }  from 'react'
import classes from './TodoCard.module.css'
const TodoCard = ({ task, handleDone , handleDeleteTask, handleSelectEdit, isEdit, handleEdit, stopEdit }) => {


    const [ newTitle, setNewTitle ] = useState(task.title)

    const handleNewTitle = (title) => {
        setNewTitle(title)
    }
    if(isEdit) {
        return <div>
            <input onChange={(event) => handleNewTitle(event.target.value)} value={'newTitle'} placeholder='edit' type="text" />
            <button className={classes.button} onClick={() => handleEdit({...task, title: newTitle })}>Save</button>
            <button className={classes.button} onClick={() => stopEdit({task})}>Cancel</button>
        </div>
    } else {


        return <div className={task.completed ? `${classes.todoCard} ${classes.done}` : classes.todoCard}>
            <h3>{task.title}</h3>
            <div>
                <button className={classes.button} onClick={() => handleDone(task.id)}>Done</button>
                <button className={classes.button} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button className={classes.button} onClick={() => handleSelectEdit(task.id)}>Edit</button>
            </div>
        </div>
    }
}

export default TodoCard