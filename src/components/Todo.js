import React from 'react';
import Button from './Button';

const Todo = ({task, todoList, doneList, helperMethods, editTask }) => {
    const handleForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="ui text container">
            <form onSubmit={handleForm} className="ui segment form">
                <div className="ui action input center input-wrapper">
                    <input type="text" value={task} onChange={helperMethods.handleChange} placeholder="Add a task"></input>
                    <Button buttonClass="ui button" onButtonClick={() => helperMethods.handleSubmit()} content="Add Task" />
                </div>
            </form>
            {todoList.length !== 0 ? (
                <div className="todo-list ui segments">
                    {todoList.map((todo, index) => {
                        return ( 
                            <div key={index} className={todo.isCompleted ? "completed ui segment todo-item" : "ui segment todo-item" }>
                                <div className="todo-content">{todo.text}</div>
                                <div className="todo-modifier">
                                    <Button 
                                        buttonClass="ui button yellow edit" 
                                        onButtonClick={() => helperMethods.handleEdit(index)} 
                                        content={<i className="edit icon"></i>}
                                    />
                                    <Button 
                                        buttonClass="ui button positive"
                                        onButtonClick={() => helperMethods.handleComplete(index)} 
                                        content={todo.isCompleted ? "Undo" : <i className="check circle outline icon"></i>} 
                                    />
                                    <Button 
                                        buttonClass="ui button negative delete" 
                                        onButtonClick={() => helperMethods.handleDelete(index)} 
                                        content={<i className="trash alternate outline icon"></i>} 
                                    />
                                </div>
                                {todo.editing ? (
                                    <div className="edit-field">
                                        <div className="ui action input center input-wrapper">
                                            <input type="text" value={editTask} onChange={helperMethods.handleEditChange} placeholder={todo.text}></input>
                                            <Button buttonClass="ui button" onButtonClick={() => helperMethods.handleEditSubmit(index)} content="Edit Task" />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ); 
                    })}
                </div>
            ) : null}
            
            {doneList.length !== 0 ? (
                <div className="done-list ui segments">
                {doneList.map((todo, index) => {
                    return ( 
                        <div key={index} className={todo.isCompleted ? "completed ui segment todo-item" : "ui segment todo-item" }>
                            <div className="todo-content">{todo.text}</div>
                            <div className="todo-modifier">
                                <Button 
                                    buttonClass="ui button positive"
                                    onButtonClick={() => helperMethods.handleUndo(index)} 
                                    content={todo.isCompleted ? "Undo" : <i className="check circle outline icon"></i>} 
                                />

                                <Button 
                                    buttonClass="ui button negative delete" 
                                    onButtonClick={() => helperMethods.handleDoneDelete(index)} 
                                    content={<i className="trash alternate outline icon"></i>} 
                                />
                            </div>
                        </div>
                    ); 
                })}
            </div>
            ) : null}
            
        </div>
    );
}

export default Todo;