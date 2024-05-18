import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContextProvider';
import { Route, Routes, Navigate } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from './components/board/Board';

const ApplicationViews = () => {
    const { 
        rerender,
        openAddTaskModal,
        openAddColumnModal,
        openViewTaskModal,
        openEditColumnModal,
        handleRerender,
        setError
     } = useContext(AppContext);  

    const [didMove, setDidMove] = useState(false);

    useEffect(() => {
    }, [didMove]);

    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/board" />} />

            <Route 
                path="/board" 
                element={<DndProvider backend={HTML5Backend}>
                            <Board 
                                didMove={didMove} 
                                setDidMove={setDidMove} 
                                openAddTaskModal={openAddTaskModal} 
                                openAddColumnModal={openAddColumnModal}
                                openViewTaskModal={openViewTaskModal} 
                                openEditColumnModal={openEditColumnModal} 
                                setError={setError}
                                rerender={rerender}
                                handleRerender={handleRerender}
                            />
                        </DndProvider>} 
            />
        </ Routes>
    )
}

export default ApplicationViews;
