
import React from 'react';
import { Card } from '../Card/Card.jsx'

const titles = {
    inbox: 'Входящие',
    known: 'Знакомые',
    unknown: 'Незнакомые',
}

function NewCardsBox(props) {
    const words = [...(props.words || [])]
    if (props.type !== 'inbox') {
        words.reverse()
    }

    const title = titles[props.type] || ''

    const wordsList = words.map((word) =>
        <Card key={word.id} {...word} />
    );

    return (
        <div className={'cardBox ' + props.type}>
            <h5>{title}</h5>
            <div className="cardsmap">
                {wordsList}
            </div>
        </div>
    );
}
export default NewCardsBox



