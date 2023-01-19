import Nav from 'react-bootstrap/Nav';
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


export function NewCardsBox(props) {
    const words = props.words || [];
    const wordsList = words.map((word) =>
        <Card key={word.id} {...word} />
    );

    return (
        <div className={'cardBox ' + props.type}>
            {wordsList}
        </div>

    );
}
export function Header() {
    return (
        <Nav className='MyHeader'
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >

            <Nav.Item >
                <Nav.Link href="/home"><img className='LogoPng' src="assets/images/logo-icon.png" alt='logo'></img></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3">Link</Nav.Link>
            </Nav.Item>

            <div className='Heading'>Флеш-карты для изучения английского языка</div>

        </Nav>


    );
}




