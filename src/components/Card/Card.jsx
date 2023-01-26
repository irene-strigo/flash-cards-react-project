import React, { useState } from 'react';

export function Card(props) {
    const [showTranslation, setTranslation] = useState(false)
    const handleTranslation = () => {
        setTranslation(!showTranslation)
    }
    return (
        <div className='word' onClick={handleTranslation}>
            <div className='word-meaning'>{props.english} </div>
            <div className='word-transcription'>{props.transcription}</div>
            <div className={'explanation ' + props.class + (showTranslation ? ' onShow ' : [])}>нажми, чтобы увидеть перевод</div>
            <div className={'word-translation ' + props.class + (showTranslation ? ' showWord ' : [])}>{props.russian}</div>
            <div className='word-theme'>{props.theme}</div>
        </div>
    );
}