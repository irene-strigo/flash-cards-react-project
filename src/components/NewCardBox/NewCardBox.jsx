
import React from 'react';
import { Card } from '../Card/Card.jsx'

function NewCardsBox(props) {
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
export default NewCardsBox



