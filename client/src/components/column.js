import React, {useContext, useEffect, useState} from "react";
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {Card} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import TaskCard from "./taskCard";

const Column = observer(({ tag }) => {
    const {board} = useContext(Context);
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        setTasks(board.tasks.filter(item => item.state === tag));
    },[board.curEpic, board.tasks])

    const handleRemoveTask = (tid) => {
        if(window.confirm("Are you sure want delete task?")){
            board.setTasks(board.deleteTask(tid));
        }
    }

    return (
        <Card className="w-50 mx-3 mt-1">
            <Card.Header>{tag}</Card.Header>
            <Card.Body>
                <Droppable droppableId={tag}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                ref={provided.innerRef}
                                style={{ backgroundColor: snapshot.isDraggingOver ? 'lightgray' : 'inherit'}}
                                {...provided.droppableProps}
                            >
                                {tasks.map( (task, index) => (
                                    <Draggable
                                        key={task.name}
                                        draggableId={task.id.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                className='m-2'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TaskCard task={task} onRemove={() => handleRemoveTask(task.id)}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </Card.Body>
        </Card>
    );
});

export default Column;
