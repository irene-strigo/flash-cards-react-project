
export function Card(props) {
    return (
        <div className='word'>
            <div className='word-meaning'>{props.english} </div>
            <div className='word-transcription'>{props.transcription}</div>
            <div className='word-translation'>{props.russian}</div>
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



