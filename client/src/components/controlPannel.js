import React, {useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import {observer} from "mobx-react-lite";
import {useBoard} from "../hoocks/useBoard";
import SourcePanel from "./sourcePanel";

const ControlPanel = observer(() => {
    const {board} = useBoard();
    const newEpic = useRef('');

    const handleAddEpic = () => {
        if (newEpic.current.value) {
            board.addEpic(newEpic.current.value);
            newEpic.current.value = '';
            board.setCurEpic(board.epics.length - 1);
        }
    }

    return (
        <Accordion defaultActiveKey="-1">
            <Accordion.Item eventKey="-1">
                <Accordion.Header>TASKBoard from Ilya Onyanov</Accordion.Header>
                <Accordion.Body>
                    <SourcePanel/>
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