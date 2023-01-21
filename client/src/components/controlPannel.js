import React, {useContext, useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import {Context} from "../index";
import {login, logout} from "../api/userAPI";
import {observer} from "mobx-react-lite";

const ControlPanel = observer(() => {
    const {board} = useContext(Context);
    const newEpic = useRef('');
    const vPassword = useRef('');

    const handleAddEpic = () => {
        if (newEpic.current.value) {
            board.addEpic(newEpic.current.value);
            newEpic.current.value = '';
            board.setCurEpic(board.epics.length - 1);
        }
    }

    const handleLogin = () => {
        try {
            login(vPassword.current.value).then(data => {
                board.setIsLogin(true);
            }).catch(e => {
                alert(e.response.data.message)
            });
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const handleLogout = () => {
        try {
            logout().then(data => {
                board.setIsLogin(false);
            }).catch(e => {
                alert(e.response.data.message)
            });
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Accordion defaultActiveKey="-1">
            <Accordion.Item eventKey="-1">
                <Accordion.Header>TASKBoard from Ilya Onyanov</Accordion.Header>
                <Accordion.Body>
                    {board.isLogin ?
                        <div className="d-flex">
                            <Form.Check
                                checked={board.islocal}
                                type="switch"
                                className="w-100"
                                onChange={e => board.setIsLocal(e.target.checked)}
                                label="Use local storage"/>
                            <Button className="mx-3 form-control" onClick={handleLogout}>Synchronise</Button>
                            <Button className="mx-3 form-control" onClick={handleLogout}>Logout</Button>
                        </div>
                        :
                        <div className="d-flex">
                            <Form.Control
                                ref={vPassword}
                                type="text"
                                placeholder="Enter password"/>
                            <Button className="mx-3" onClick={handleLogin}>login</Button>
                        </div>
                    }
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="-1">
                <Accordion.Body>
                    <div className="d-flex">
                        <Form.Control
                            ref={newEpic}
                            type="text"
                            placeholder="Epic title"/>
                        <Button className="mx-3 w-25" onClick={handleAddEpic}>Add epic</Button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
});

export default ControlPanel;