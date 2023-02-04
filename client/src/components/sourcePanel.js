import React, {useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import {useLogin} from "../hoocks/useLogin";
import {useSource} from "../hoocks/useSource";

const SourcePanel = () => {
    const {isLogin, handleLogin, handleLogout} = useLogin();
    const {isLocal, toggleSource} = useSource();

    const vPassword = useRef('');

    const login = () => {
        handleLogin(vPassword.current.value);
    }

    return (
        <div>
            {isLogin ?
                <div className="d-flex">
                    <Form.Check
                        checked={isLocal}
                        type="switch"
                        className="w-100"
                        onChange={e => toggleSource()}
                        label="Use local storage"/>
                    <Button className="mx-3 form-control" onClick={() => {
                        alert("ups")
                    }}>Synchronise</Button>
                    <Button className="mx-3 form-control" onClick={handleLogout}>Logout</Button>
                </div>
                :
                <div className="d-flex">
                    <Form.Control
                        ref={vPassword}
                        type="text"
                        placeholder="Enter password"/>
                    <Button className="mx-3" onClick={login}>login</Button>
                </div>
            }
        </div>
    );
};

export default SourcePanel;