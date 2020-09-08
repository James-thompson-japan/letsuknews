import React, { useState, useEffect } from 'react';
import NewsPage from './components/NewsPage'
import SelectionPage from './components/SelectionPage'

function App() {

const [show, setShow] = useState()

useEffect(() => {
  localStorage.getItem("selectionpage") === null && localStorage.setItem('selectionpage','yes')
  localStorage.getItem("selectionpage") === "yes" && setShow("selectionpage")
})


  return (
    <div className="App font-nunito">
      {show === "selectionpage" 
      ?
      <SelectionPage setShow={setShow}/>
      :
      <NewsPage setShow={setShow}/>
      }
    </div>
  );
}

export default App;
