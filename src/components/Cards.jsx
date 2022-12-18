function Card(props) {
    return (
        <div className='word'>
            <img className='word-meaning' src={props.meaning} />
            <div className='word-transcription'>{props.transcription}</div>
            <div className='word-translation'>{props.translation}</div>
            <div className='word-theme'>{props.theme}</div>
        </div>
    );
}
export default Card