import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import ModalTask from "./modalTask";

const TaskCard = ({task, onRemove}) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Card onDoubleClick={() => {
            setModalVisible(true)
        }}>
            <ModalTask show={modalVisible} onHide={() => setModalVisible(false)} task={task}/>
            <Card.Title className="p-2">{task.name}</Card.Title>
            <Card.Body>{task.description}</Card.Body>
            <Card.Subtitle>
                <div role="button"
                     className="text-center pointer-event w-100 link-warning"
                     onClick={onRemove}>remove
                </div>
            </Card.Subtitle>
        </Card>
    );
};

export default TaskCard;