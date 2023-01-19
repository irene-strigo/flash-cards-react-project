import React, { useState } from 'react';
import { Form, Table } from "react-bootstrap";
import { PencilFill, Save, Trash, XSquare } from 'react-bootstrap-icons';
import './EditableTable.styles.scss';
const EditableTable = ({ columns, rows, actions }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
    const [rowsState, setRowsState] = useState(rows);
    const [editedRow, setEditedRow] = useState();
    const handleEdit = (rowID) => {
        setIsEditMode(true);
        setEditedRow(undefined);
        setRowIDToEdit(rowID);
    }
    const handleRemoveRow = (rowID) => {
        const newData = rowsState.filter(row => {
            return row.id !== rowID ? row : null
        });
        setRowsState(newData);
    }
    const handleOnChangeField = (e, rowID) => {
        const { name: fieldName, value } = e.target;
        setEditedRow({
            id: rowID,
            [fieldName]: value
        })
    }
    const handleCancelEditing = () => {
        setIsEditMode(false);
        setEditedRow(undefined);
    }
    const handleSaveRowChanges = () => {
        setTimeout(() => {
            setIsEditMode(false);
            const newData = rowsState.map(row => {
                if (row.id === editedRow.id) {
                    if (editedRow.english) row.english = editedRow.english;
                    if (editedRow.transcription) row.transcription = editedRow.transcription;
                    if (editedRow.russian) row.russian = editedRow.russian;
                    if (editedRow.tags) row.tags = editedRow.tags;
                }
                return row;
            })
            setRowsState(newData);
            setEditedRow(undefined)
        }, 1000)
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {columns.map((column) => {
                        return <th key={column.field}>{column.fieldName}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {rowsState.map((row) => {
                    return <tr key={row.id}>
                        <td>
                            {row.id}
                        </td>
                        <td>
                            {isEditMode && rowIDToEdit === row.id
                                ? <Form.Control
                                    type='text'
                                    defaultValue={editedRow ? editedRow.english : row.english}
                                    id={row.id}
                                    name='english'
                                    onChange={(e) => handleOnChangeField(e, row.id)}
                                />
                                : row.english
                            }
                        </td>
                        <td>
                            {isEditMode && rowIDToEdit === row.id
                                ? <Form.Control
                                    type='text'
                                    defaultValue={editedRow ? editedRow.transcription : row.transcription}
                                    id={row.id}
                                    name='transcription'
                                    onChange={(e) => handleOnChangeField(e, row.id)}
                                />
                                : row.transcription
                            }
                        </td>
                        <td>
                            {isEditMode && rowIDToEdit === row.id
                                ? <Form.Control
                                    type='text'
                                    defaultValue={editedRow ? editedRow.russian : row.russian}
                                    id={row.id}
                                    name='russian'
                                    onChange={(e) => handleOnChangeField(e, row.id)}
                                />
                                : row.russian
                            }
                        </td>
                        <td>
                            {isEditMode && rowIDToEdit === row.id
                                ? <Form.Control
                                    type='text'
                                    defaultValue={editedRow ? editedRow.tags : row.tags}
                                    id={row.id}
                                    name='tags'
                                    onChange={(e) => handleOnChangeField(e, row.id)}
                                />
                                : row.tags
                            }
                        </td>
                        {actions &&
                            <td>
                                {isEditMode && rowIDToEdit === row.id
                                    ? <button onClick={() => handleSaveRowChanges()} className='custom-table__action-btn' disabled={!editedRow}>
                                        <Save />
                                    </button>
                                    : <button onClick={() => handleEdit(row.id)} className='custom-table__action-btn'>
                                        <PencilFill />
                                    </button>
                                }
                                {isEditMode && rowIDToEdit === row.id
                                    ? <button onClick={() => handleCancelEditing()} className='custom-table__action-btn delbtn'>
                                        <XSquare />
                                    </button>
                                    : <button onClick={() => handleRemoveRow(row.id)} className='custom-table__action-btn delbtn'>
                                        <Trash />
                                    </button>
                                }
                            </td>
                        }
                    </tr>
                })}
            </tbody>
        </Table>
    );
};
export default EditableTable;