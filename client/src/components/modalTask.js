import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../index";

const ModalTask = ({show, onHide, task}) => {
    const {board} = useContext(Context);

    const [vName, setName] = useState('');
    const [vDescription, setDescription] = useState('');

    useEffect(() => {
        if(task){
            setName(task.name);
            setDescription(task.description);
        }
    },[]);

    const saveTask = () => {
        if(vName){
            if(task) {
                task.name = vName;
                task.description = vDescription;
                board.setTasks( board.updTask(task) );
            }
            else {
                //board.setTasks( board.addTask(vName, vDescription) );
                board.addTask(vName, vDescription);
                setName("");
                setDescription("");
            }
            onHide();
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            autoFocus={false}
        >
            <Modal.Header>
                <Modal.Title>Add task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="my-1"
                        value={vName}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Task name"}
                        autoFocus={true}
                    />
                    <textarea
                        className="my-1 form-control"
                        value={vDescription}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={"Task description"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={saveTask}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTask;