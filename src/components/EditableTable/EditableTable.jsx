import React, { useState } from 'react';
import { Form, Table } from "react-bootstrap";
import { PencilFill, Save, Trash, XSquare, Plus } from 'react-bootstrap-icons';
import './EditableTable.styles.scss';
const EditableTable = ({ columns, rows, actions, addWord }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
    const [rowsState, setRowsState] = useState(rows);
    const [editedRow, setEditedRow] = useState();

    const apiBaseUrl = 'http://itgirlschool.justmakeit.ru/api/words'

    const handleAddRow = () => {
        const newRow = {
            id: '',
            english: '',
            transcription: '',
            russian: '',
            tags: ''
        }
        const newRowsState = [...rowsState, newRow]
        // const newRowsState = rowsState.map(r => r)
        // newRowsState.push(newRow)
        setRowsState(newRowsState)
        setIsEditMode(true);
        setEditedRow(undefined);
        setRowIDToEdit('');

    }
    const handleEdit = (rowID) => {
        setIsEditMode(true);
        setEditedRow(undefined);
        setRowIDToEdit(rowID);
    }
    const handleRemoveRow = (rowID) => {
        setTimeout(() => {
            fetch(`${apiBaseUrl}/${rowID}/delete`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (!response.ok) { //Проверяем что код ответа 200
                    throw new Error('Something went wrong ...');
                }
                const newData = rowsState.filter(row => {
                    return row.id !== rowID ? row : null
                });
                setRowsState(newData);
            }).catch(error => console.log(error));
        }, 100)
    }
    const handleOnChangeField = (e, rowID) => {
        const { name: fieldName, value } = e.target;

        setEditedRow({
            ...editedRow,
            id: rowID,
            [fieldName]: value
        })
    }
    const handleCancelEditing = () => {
        setIsEditMode(false);
        setEditedRow(null);
    }
    const handleSaveRowChanges = () => {
        setTimeout(() => {
            setIsEditMode(false);
            const originalRow = rowsState.find(row => row.id === editedRow.id) || {}
            const isNew = editedRow.id === ''
            const url = isNew
                ? `${apiBaseUrl}/add`
                : `${apiBaseUrl}/${editedRow.id}/update`

            const resultRow = { ...originalRow, ...editedRow }

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json' // из-за ошибки CORS при добавлении слова
                },
                body: JSON.stringify(resultRow)
            }).then(response => {
                if (response.ok) { //Проверяем что код ответа 200
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            }).then(savedRow => {

                resultRow.id = savedRow.id

                const newData = rowsState.map(row => {
                    if (row.id === editedRow.id) {
                        return resultRow
                    }
                    return row;
                })
                setRowsState(newData);
                setEditedRow(undefined)
                addWord(resultRow)
            }).catch(error => console.log(error));
        }, 100)
    }
    return (
        <>

            <Table striped bordered hover>
                <thead>

                    <tr>
                        {columns.map((column) => {
                            return <th key={column.field}>{column.fieldName}</th>
                        })}
                        <td>
                            <button onClick={() => handleAddRow()} className='custom-table__action-btn addbtn'>
                                <Plus />
                            </button>
                        </td>
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
            </Table></>
    );
};
export default EditableTable;