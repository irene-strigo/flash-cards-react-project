
import './App.css';
import React, { useState } from 'react'

import NewCardsBox from './components/NewCardBox/NewCardBox';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './components/Common.css';
import EditableTable from "./components/EditableTable/EditableTable";
import Slider from "./components/Slider/Slider";
import allWords from './words.json';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const words = allWords.map((word, index) => {
  word.active = (index === 0)
  word.unknown = false
  word.known = false
  return word
})

const columns = [
  { field: 'id', fieldName: '#' },
  { field: 'english', fieldName: 'English' },
  { field: 'transcription', fieldName: 'Transcription' },
  { field: 'russian', fieldName: 'Russian' },
  { field: 'tags', fieldName: 'Tags' },
];

function App() {
  let [items, setItems] = useState(words)

  const switchCard = (command) => {
    // direction === prev - влево
    // direction === next - вправо

    const activeIndex = items.findIndex(item => item.active)

    switch (command) {

      case 'unknown': {
        items[activeIndex].unknown = true
        items[activeIndex].known = false
        break;
      }

      case 'known': {
        items[activeIndex].known = true
        items[activeIndex].unknown = false
        break;
      }

      case 'prev': {
        const itemsInbox = items.filter(w => !w.known && !w.unknown)
        const itemsOther = items.filter(w => w.known || w.unknown)
        itemsInbox.push(itemsInbox.shift())
        items = itemsInbox.concat(itemsOther)
        break;
      }

      case 'next': {
        const itemsInbox = items.filter(w => !w.known && !w.unknown)
        const itemsOther = items.filter(w => w.known || w.unknown)
        itemsInbox.unshift(itemsInbox.pop())
        items = itemsInbox.concat(itemsOther)
        break;
      }
    }

    const nextActiveIndex = items.findIndex(item => !item.unknown && !item.known)
    const allItems = items.map((item, index) => {
      item.active = (index === nextActiveIndex)
      return item
    })

    setItems(allItems)
  }

  return (
    <Router>
      < div className="App">
        <Header>
        </Header>
        <Routes>
          <Route path="/game" element={<div id="cardsPage">
            <div id="slider" className='SliderContainer'>
              <Slider word={items.find(w => w.active)} switchCard={switchCard} ></Slider>
            </div>

            <div id="cardBox" className='CardBoxesContainer'>
              <NewCardsBox type="unknown" words={items.filter(w => !w.active && w.unknown)} />

              <NewCardsBox type="inbox" words={items.filter(w => !w.active && !w.known && !w.unknown)} />

              <NewCardsBox type="known" words={items.filter(w => !w.active && w.known)} />
            </div>
          </div>} />
          <Route path="/home" element={<EditableTable columns={columns} rows={allWords} actions />} />
          <Route path="/cards" element={<div id="CardBox" className='CardBoxesContainer'>

            <NewCardsBox type="unknown"></NewCardsBox>

            <NewCardsBox title="все карточки" words={allWords.slice(1)} type="inbox" />

            <NewCardsBox title="известные" type="guessed"></NewCardsBox>
          </div>} />
        </Routes>
        <Footer id="Footer"></Footer>
      </div>
    </Router>



  );
}

export default App;
