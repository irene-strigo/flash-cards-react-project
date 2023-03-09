import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import WordsStore from "./stores/WordsStore";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const stores = {
  wordsStore: new WordsStore()
}

root.render(
  <StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </StrictMode>
);
