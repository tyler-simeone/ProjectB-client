import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import AddIcon from '@mui/icons-material/Add';
import '../column/styles/ColumnAddTemplate.css';

export const BoardAddTemplate = () => {
    const { openAddBoardModal } = useContext(AppContext); 
    
    return (
        <div key={-1} className="add-column-template--container" onClick={openAddBoardModal}>
            <div className="add-column-template--body">
                <h2 style={{fontSize: "21.5px", color: "#4c4d53"}}>Add new board</h2>
                <div className="add-column-template-icon--container" ><AddIcon className="add-column-icon" /></div>
            </div>
        </div>
    );
}

