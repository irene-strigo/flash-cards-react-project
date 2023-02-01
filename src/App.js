
import './App.css';
import NewCardsBox from './components/NewCardBox/NewCardBox';
import Header from './components/Header/Header';
import './components/Common.css';
import EditableTable from "./components/EditableTable/EditableTable";
import Slider from "./components/Slider/Slider";
import allWords from './components/Slider/words.json'


const columns = [
  { field: 'id', fieldName: '#' },
  { field: 'english', fieldName: 'English' },
  { field: 'transcription', fieldName: 'Transcription' },
  { field: 'russian', fieldName: 'Russian' },
  { field: 'tags', fieldName: 'Tags' },
];

function App() {
  return (
    < div className="App">
      <Header></Header>
      <div className='SliderContainer'>
        <Slider></Slider></div>
      <div className='CardBoxesContainer'>

        <NewCardsBox type="unknown"></NewCardsBox>

        <NewCardsBox title="все карточки" words={allWords.slice(1)} type="inbox" />

        <NewCardsBox title="известные" type="guessed">известные</NewCardsBox>
      </div>
      <div className='TableContainer'>
        <EditableTable columns={columns} rows={allWords} actions />
      </div>
    </div>
  );
}

export default App;
