import Modal from './components/Modal/Modal';
import { useState, useEffect} from 'react';
import classes from './App.module.css'
import Container from './components/Container/Container';
import Button from './components/Button/Button';
import TodoCard from './components/TodoCard/TodoCard';
import Input from "./components/Input/Input";

function App() {

    const [ isShow, setIsShow ]  = useState(false)
    const [ newTask, setNewTask ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ currentEdit, setCurrentEdit ] = useState(null);


    const [ tasks, setTasks ] =  useState([
        {
            id: 1,
            title: 'Coding',
            completed: false
        },
        {
            id: 2,
            title: 'Eat',
            completed: false
        },
        {
            id: 3,
            title: 'Sleep',
            completed: false
        },
        {
            id: 4,
            title: 'Coding',
            completed: false
        },
    ]);

    const [filtered, setFiltered] = useState(tasks)

    useEffect( () => {
        setFiltered(tasks)
    }, [tasks])

    const handleShow = () => setIsShow(!isShow)




    const handleAddTask = () => {

        if(newTask.length < 1 ) return

        setTasks((prevState) => [...prevState,
            {
                id: Date.now(),
                title: newTask,
                completed: false
            }
        ])
        setNewTask('')
        handleShow();
    }

    const handleDeleteTask = (id) => {
        let newTask = [...tasks].filter(item => item.id!== id)
        setTasks(newTask)
    }

    const handleDone = (id) => {
        const newList = tasks.map(task => {
            if(task.id === id) {
                return {...task, completed: !task.completed }
            }else {
                return task
            }
        })
        setTasks([...newList])
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }


    const handleEdit = (editTask) => {
        setCurrentEdit(null);
        const editList = tasks.map(task => {
            if(task.id === editTask.id) {
                return editTask
            }else {
                return task
            }
        })
        setTasks([...editList])
    }

    const stopEdit = () =>  { // cancel
        setCurrentEdit(null);
    }

    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

    const todoFilter = (completed) => {

    if (completed === 'all') {
        setFiltered(tasks)

    } else {
        let newTodo = tasks.filter(task => task.completed === completed)
    setFiltered(newTodo)

        }
    }

    return (
        <>
            <Container>
                <div className={classes.wrapper}>

                    { isShow && <Modal handleAddTask={handleAddTask} setNewTask={setNewTask} handleShow={handleShow}  /> }
                    <Button handleClick={handleShow}><p>Добавить</p></Button>
                    <Input name='search' placeholder='Поиск...' onChange={handleSearch} />
                    <div>
                        <button  className={classes.button} onClick={ () => todoFilter ('all')}>All tasks</button>
                        <button  className={classes.button} onClick={ () => todoFilter (false)}>Open tasks</button>
                        <button  className={classes.button} onClick={ () => todoFilter (true)}>Done task</button>

                    </div>
                    {filtered.map(task =>
                        <TodoCard
                            handleDone={handleDone}
                            handleDeleteTask={handleDeleteTask}
                            handleSelectEdit={setCurrentEdit}
                            handleEdit={handleEdit}
                            stopEdit={stopEdit}
                            todoFilter={todoFilter}
                            isEdit={ currentEdit === task.id}
                            key={task.id}
                            task={task} />)}
                </div>
            </Container>
        </>
    );
}

export default App;
