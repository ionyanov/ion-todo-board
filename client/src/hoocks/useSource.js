import {useContext} from "react";
import {BoardContext} from "../components/contextProvider";
import LocalBoard from "../store/local/localBoard";
import GlobalBoard from "../store/global/globalBoard";

export function useSource() {
    const {setBoard, isLocal, setIsLocal} = useContext(BoardContext);

    const toggleSource = () => {
        const newIsLocal = !isLocal;
        setIsLocal(newIsLocal);
        setBoard(newIsLocal ? new LocalBoard() : new GlobalBoard());
    }

    const setSource = (val) => {
        setIsLocal(val);
        setBoard(val ? new LocalBoard() : new GlobalBoard());
    }

    return {isLocal, toggleSource, setSource}
}
