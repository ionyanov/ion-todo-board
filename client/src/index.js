import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import Board from "./components/board";

const container = document.getElementById('root');
const root = createRoot(container);

export const Context = createContext(null)

root.render(<Context.Provider value={{board: new Board() }}>
                <App />
            </Context.Provider>);