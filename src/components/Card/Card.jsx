import React, { useState } from 'react';
import { VoiceComponent } from '../VoiceComponent/VoiceComponent'
export function Card(props) {
    const [showTranslation, setTranslation] = useState(false)
    const handleTranslation = () => {
        setTranslation(!showTranslation)
    }
    const is_active = props.active
    return (
        <div className='word'>
            {is_active && <VoiceComponent text={props.english}></VoiceComponent>}
            <div className='word-meaning'>{props.english} </div>
            <div className='word-transcription'>{props.transcription}</div>
            <div onClick={handleTranslation} className={'explanation ' + props.class + (showTranslation ? ' onShow ' : [])}>нажми, чтобы увидеть перевод</div>
            <div className={'word-translation ' + props.class + (showTranslation ? ' showWord ' : [])}>{props.russian}</div>
            <div className='word-theme'>{props.theme}</div>
            {is_active &&
                <>
                    <button className='btn btn-warning' onClick={() => { props.switchCard('unknown') }}>Unknown</button>
                    &nbsp;
                    <button className='btn btn-success' onClick={() => { props.switchCard('known') }}>Known</button>
                </>
            }
        </div>
    );
}