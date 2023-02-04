import {useContext} from "react";
import {BoardContext} from "../components/contextProvider";

export function useBoard() {
    const {board} = useContext(BoardContext);

    return {board}
}

