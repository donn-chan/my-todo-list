import React, {useState, useEffect} from 'react';
import './App.css';
import Todo from './components/Todo';

const App = () => {
    // Local Storage retrievers
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks'));
    const storedDoneTasks = JSON.parse(window.localStorage.getItem('doneTasks'));
    
    //TodoList states
    const [todoList, setTodoList] = useState(storedTasks !== null ? storedTasks : []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(todoList));
    }, [todoList]);

    //DoneList states
    const [doneList, setDoneList] = useState(storedDoneTasks !== null ? storedDoneTasks : []);

    useEffect(() => {
        localStorage.setItem('doneTasks', JSON.stringify(doneList));
    }, [doneList]);

    //Task state
    const [task, setTask] = useState('');

    //Edit state
    const [editStatus, setEditStatus] = useState(false);
    const [editTask, setEditTask] = useState('');

    
    const helperMethods = {
        handleSubmit: () => {
            task !== '' ? 
                setTodoList(todoList => [...todoList, {text: task, isCompleted: false, editing: editStatus}])
                : setTodoList(todoList);
            setTask('');
        },
        handleComplete: (index) => {
            const newTasks = [...todoList];
            const newTask = newTasks[index];
            return newTasks[index].isCompleted === true? (
                newTasks[index].isCompleted = false,
                newTasks.splice(index, 1),
                setTodoList(newTasks),
                setDoneList([newTask, ...doneList])
             ) : (
                newTasks[index].isCompleted = true,
                newTasks.splice(index, 1),
                setTodoList(newTasks),
                setDoneList([newTask, ...doneList])
             )
        },
        handleUndo: (index) => {
            const newTasks = [...doneList];
            const newTask = newTasks[index];
            return newTasks[index].isCompleted === true ? (
                newTasks[index].isCompleted = false,
                newTasks.splice(index, 1),
                setDoneList(newTasks),
                setTodoList([newTask, ...todoList])
            ) : (
                newTasks[index].isCompleted = true,
                newTasks.splice(index, 1),
                setDoneList(newTasks),
                setTodoList([newTask, ...todoList])
            )
        },
        handleDelete: (index) => {
            const newTasks = [...todoList];
            newTasks.splice(index, 1);
            setTodoList(newTasks);
        },
        handleDoneDelete: (index) => {
            const newTasks = [...doneList];
            newTasks.splice(index, 1);
            setDoneList(newTasks);
        },
        handleEdit: (index) => {
            const newTasks = [...todoList];
            setEditStatus(true);
            newTasks[index].editing = true;
        },
        handleEditSubmit: (index) => {
            const newTasks = [...todoList];

            return editTask !== '' ? (
                newTasks[index].text = editTask,
                newTasks[index].editing = false,
                setTodoList(newTasks),
                setEditTask(''),
                setEditStatus(false)
            ) : (
                newTasks[index].editing = false,
                setTodoList(newTasks),
                setEditTask(''),
                setEditStatus(false)
            )
        },
        handleEditChange: (e) => setEditTask(e.target.value),
        handleChange: (e) => setTask(e.target.value)
    }

    return (
        <div className="ui container">
            <h1 className="ui header center aligned">Todo List</h1>
            <Todo 
                task={task}
                todoList={todoList}
                doneList={doneList}
                editTask={editTask}
                helperMethods={helperMethods}
            />
        </div>
    );
};

export default App;










