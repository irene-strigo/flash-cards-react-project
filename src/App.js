import './App.css';
import React from 'react'
import NewCardsBox from './components/NewCardBox/NewCardBox';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './components/Common.css';
import EditableTable from "./components/EditableTable/EditableTable";
import Slider from "./components/Slider/Slider";
import { observer, inject } from "mobx-react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const columns = [
  { field: 'id', fieldName: '#' },
  { field: 'english', fieldName: 'English' },
  { field: 'transcription', fieldName: 'Transcription' },
  { field: 'russian', fieldName: 'Russian' },
  { field: 'tags', fieldName: 'Tags' },
];

const App = inject(['wordsStore'])(observer(({ wordsStore }) => {
  /*
    const addNewBook = () => {
      if (!newBook) return;
      bookStore.addBook(newBook);
      setNewBook("");
    }
 */

  const switchCard = (command) => {
    wordsStore.switchCard(command)
  }

  const upsertWord = (upsertableWord) => {
    wordsStore.upsertWord(upsertableWord)
  }

  const deleteWord = (wordID) => {
    wordsStore.deleteWord(wordID)
  }

  const items = wordsStore.words

  return (
    <Router>
      <div className="App">
        <Header>
        </Header>
        <Routes>
          <Route path="/" element={
            <EditableTable columns={columns} rows={items} actions upsertWord={upsertWord} deleteWord={deleteWord} />
          } />
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

        </Routes>
        <Footer id="Footer"></Footer>
      </div>
    </Router>



  )

}))

export default App;
