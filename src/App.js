
import './App.css';
import { Card, NewCardsBox, Header } from './components/Cards';
import './components/Cards.css';
import EditableTable from "./components/EditableTable/EditableTable";



const words = [
  {
    "id": "13054",
    "english": "cat",
    "transcription": "[kæt]",
    "russian": "кошка",
    "tags": "животные",
    "tags_json": "[\"u0436u0438u0432u043eu0442u043du044bu0435\"]"
  },
  {
    "id": "13147",
    "english": "father",
    "transcription": "[ ˈfɑː.ðə r] ",
    "russian": "отец",
    "tags": "семья",
    "tags_json": "[\"u0441u0435u043cu044cu044f\"]"
  },
  {
    "id": "13148",
    "english": "family",
    "transcription": "[ ˈfæm. ə l.i ]",
    "russian": "семья",
    "tags": "семья",
    "tags_json": "[\"u0441u0435u043cu044cu044f\"]"
  },
  {
    "id": "13158",
    "english": "accelerator\t",
    "transcription": "[ əkˈseləreɪtə ]\t",
    "russian": "акселератор",
    "tags": "деталь",
    "tags_json": "[\"u0434u0435u0442u0430u043bu044c\"]"
  },
  {
    "id": "13166",
    "english": "bulbs\t",
    "transcription": "[ bʌlbz ]\t",
    "russian": "лампы",
    "tags": "автомобиль",
    "tags_json": "[\"u0430u0432u0442u043eu043cu043eu0431u0438u043bu044c\"]"
  },
  {
    "id": "13173",
    "english": "star",
    "transcription": "[stɑː]",
    "russian": "звезда",
    "tags": "космос",
    "tags_json": "[\"u043au043eu0441u043cu043eu0441\"]"
  },
  {
    "id": "13191",
    "english": "galaxy",
    "transcription": "[ˈgæləksɪ]",
    "russian": "галактика",
    "tags": "космос",
    "tags_json": "[\"u043au043eu0441u043cu043eu0441\"]"
  },
  {
    "id": "13195",
    "english": "milk",
    "transcription": "[mɪlk]",
    "russian": "молоко",
    "tags": "продукты",
    "tags_json": "[\"u043fu0440u043eu0434u0443u043au0442u044b\"]"
  },
  {
    "id": "13197",
    "english": "happy",
    "transcription": "[ˈhæpɪ]",
    "russian": "счастливый",
    "tags": "эмоции",
    "tags_json": "[\"u044du043cu043eu0446u0438u0438\"]"
  },
  {
    "id": "13206",
    "english": "new",
    "transcription": "[njuː]",
    "russian": "новый",
    "tags": "слова",
    "tags_json": "[\"u0441u043bu043eu0432u0430\"]"
  },
  {
    "id": "13228",
    "english": "dog",
    "transcription": "[dog]",
    "russian": "собака",
    "tags": "",
    "tags_json": "[]"
  },
  {
    "id": "13229",
    "english": "mouse",
    "transcription": "[mʌuːs]",
    "russian": "мышь",
    "tags": "",
    "tags_json": "[]"
  },
  {
    "id": "13230",
    "english": "sun",
    "transcription": "[ sʌn ] ",
    "russian": "солнце",
    "tags": "",
    "tags_json": "[]"
  },
  {
    "id": "13231",
    "english": "green",
    "transcription": "[ griːn ]",
    "russian": "зелёный",
    "tags": "",
    "tags_json": "[]"
  }
]

const word = words[0]

const columns = [
  { field: 'id', fieldName: '#' },
  { field: 'english', fieldName: 'English' },
  { field: 'transcription', fieldName: 'Transcription' },
  { field: 'russian', fieldName: 'Russian' },
  { field: 'tags', fieldName: 'Tags' },
];

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Card {...word} />
      <div className='CardBoxesContainer'>
        <label>неизвестные
          <NewCardsBox type="unknown"></NewCardsBox></label>
        <label>все карточки
          <NewCardsBox words={words.slice(1)} type="inbox" /></label>
        <label>известные
          <NewCardsBox type="guessed"></NewCardsBox></label>
      </div>
      <div className='TableContainer'>
        <EditableTable columns={columns} rows={words} actions />
      </div>
    </div>
  );
}

export default App;
