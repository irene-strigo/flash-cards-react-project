import './App.css';
import React, { useState, useEffect } from 'react'

import NewCardsBox from './components/NewCardBox/NewCardBox';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './components/Common.css';
import EditableTable from "./components/EditableTable/EditableTable";
import Slider from "./components/Slider/Slider";
import Loading from "./components/Loading/Loading";
import { ThemeContextProvider } from "./components/Context/Context";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
/*import { ContextProvider } from './components/Context/Context';*/



const columns = [
  { field: 'id', fieldName: '#' },
  { field: 'english', fieldName: 'English' },
  { field: 'transcription', fieldName: 'Transcription' },
  { field: 'russian', fieldName: 'Russian' },
  { field: 'tags', fieldName: 'Tags' },
];


function App() {
  let [currentState, setState] = useState({
    loading: true,
    items: []
  })
  let items = currentState.items

  useEffect(() => {
    fetch('http://itgirlschool.justmakeit.ru/api/words')
      .then(response => {
        if (response.ok) { //Проверяем что код ответа 200
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then((allWords) => {
        const items = allWords.map((word, index) => {
          word.active = (index === 0)
          word.unknown = false
          word.known = false
          word.learned = false
          return word
        })
        setTimeout(() => { setState({ items, loading: false }) }, 100)
        return () => { }
      })
      .catch(error => console.log(error));
    //eslint-disable-next-line
  }, [])

  const addWord = (word) => {
    const newWord = {
      ...word,
      active: false,
      unknown: false,
      known: false,
      learned: false,
    }

    setState({
      items: [...items, newWord],
      loading: false
    })
  }


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

      default: { }
    }

    const nextActiveIndex = items.findIndex(item => !item.unknown && !item.known)
    const allItems = items.map((item, index) => {
      item.active = (index === nextActiveIndex)
      return item
    })

    setState({ items: allItems, loading: false })
  }

  return (
    <ThemeContextProvider>
      <Router>
        < div className="App">

          <Header >
          </Header>
          <Routes>
            <Route path="/" element={
              <>
                {currentState.loading && <Loading />}
                {!currentState.loading && <EditableTable columns={columns} rows={items} actions addWord={addWord} />}
              </>

            } />
            <Route path="/game" element={
              <div id="cardsPage">
                {currentState.loading && <Loading />}
                {!currentState.loading && <>
                  <div id="slider" className='SliderContainer'>
                    <Slider word={items.find(w => w.active)} switchCard={switchCard} ></Slider>
                  </div>

                  <div id="cardBox" className='CardBoxesContainer'>
                    <NewCardsBox type="unknown" words={items.filter(w => !w.active && w.unknown)} />

                    <NewCardsBox type="inbox" words={items.filter(w => !w.active && !w.known && !w.unknown)} />

                    <NewCardsBox type="known" words={items.filter(w => !w.active && w.known)} />

                  </div>
                </>}
              </div>
            } />
            <Route path="/cards" element={<div id="CardBox" className='CardBoxesContainer'>

              <NewCardsBox type="unknown"></NewCardsBox>

              <NewCardsBox type="inbox" words={items.slice(1)} />

              <NewCardsBox type="known"></NewCardsBox>
            </div>} />
          </Routes>
          <Footer id="Footer">
          </Footer>
        </div>
      </Router>
    </ThemeContextProvider>


  );
}

export default App;
