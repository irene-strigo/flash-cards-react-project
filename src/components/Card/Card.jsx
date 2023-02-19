import React, { useState, useRef, useEffect } from 'react';
import { VoiceComponent } from '../VoiceComponent/VoiceComponent'

export function Card(props) {
    const [showTranslation, setTranslation] = useState(false)
    const handleTranslation = () => {
        setTranslation(!showTranslation)
        props.handleLearned()
    }

    const is_active = props.active
    const ref = useRef()
    useEffect(() => is_active ? ref.current.focus() : () => { }, [is_active]);
    return (
        <div className='word'>
            {is_active && <VoiceComponent text={props.english}></VoiceComponent>}
            <div className='word-meaning'>{props.english} </div>
            <div className='word-transcription'>{props.transcription}</div>
            {
                is_active &&
                <>
                    <button onClick={handleTranslation} ref={ref} className={'explanation ' + (showTranslation ? ' onShow ' : [])}>перевод</button>
                    <div className={'word-translation ' + (showTranslation ? ' showWord ' : [])}>{props.russian}</div>
                </>
            }
            <div className='word-theme'>{props.theme}</div>
            {is_active &&
                <>
                    <button className='unknownbtn' onClick={() => { props.switchCard('unknown') }}>Unknown</button>
                    &nbsp;
                    <button className='knownbtn' onClick={() => { props.switchCard('known') }}>Known</button>
                </>
            }
        </div>
    );
}