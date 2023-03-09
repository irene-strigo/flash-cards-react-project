import React, { useState } from 'react';
import { Form, Table } from "react-bootstrap";
import { PencilFill, Save, Trash, XSquare, Plus } from 'react-bootstrap-icons';
import './EditableTable.styles.scss';

const EditableTable = ({ columns, rows, actions, upsertWord, deleteWord }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
    const [editedRow, setEditedRow] = useState();

    const newRow = {
        id: '',
        english: '',
        transcription: '',
        russian: '',
        tags: ''
    }

    const handleAddRow = () => {
        if (isAddMode) {
            return
        }
        setIsAddMode(true)
        setIsEditMode(true);
        setEditedRow(undefined);
        setRowIDToEdit('');
    }

    const handleEdit = (rowID) => {
        setIsEditMode(true);
        setEditedRow(undefined);
        setRowIDToEdit(rowID);
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
            setIsAddMode(false)
            const originalRow = rows.find(row => row.id === editedRow.id) || {}
            const resultRow = { ...originalRow, ...editedRow }
            upsertWord(resultRow)
            setEditedRow(undefined)
        }, 100)
    }

    const renderRow = (row) => {
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
                        : <button onClick={() => deleteWord(row.id)} className='custom-table__action-btn delbtn'>
                            <Trash />
                        </button>
                    }
                </td>
            }
        </tr>
    }

    return (
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
                {isAddMode && renderRow(newRow)}
                {rows.map(row => renderRow(row))}
            </tbody>
        </Table>
    );
};
export default EditableTable;