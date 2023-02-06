
import './App.css';
import NewCardsBox from './components/NewCardBox/NewCardBox';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './components/Common.css';
import EditableTable from "./components/EditableTable/EditableTable";
import Slider from "./components/Slider/Slider";
import allWords from './components/Slider/words.json';



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
      <Header id="Header"></Header>
      <div id="Slider" className='SliderContainer'>
        <Slider></Slider></div>
      <div id="CardBox" className='CardBoxesContainer'>

        <NewCardsBox type="unknown"></NewCardsBox>

        <NewCardsBox title="все карточки" words={allWords.slice(1)} type="inbox" />

        <NewCardsBox title="известные" type="guessed">известные</NewCardsBox>
      </div>
      <div id="Table" className='TableContainer'>
        <EditableTable columns={columns} rows={allWords} actions />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
