import React, {createContext, useMemo, useState} from 'react';
import LocalBoard from "../store/local/localBoard";

export const BoardContext = createContext({})

const ContextProvider = ({children}) => {
    const [board, setBoard] = useState(new LocalBoard());
    const [isLocal, setIsLocal] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    /*    const [handleCheck] = useLogin();

        useEffect(() => {
            handleCheck();
        }, [])*/

    const defaultProps = useMemo(() => ({
        board, setBoard,
        isLocal, setIsLocal,
        isLogin, setIsLogin
    }), [board, isLocal, isLogin]);

    return (
        <BoardContext.Provider value={defaultProps}>
            {children}
        </BoardContext.Provider>
    );
};

export default ContextProvider;