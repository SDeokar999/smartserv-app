import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import TableComponent from './TableComponent';
function App() {
  const [data, setData] = useState({})
  let buttonDisable = false;
  const [currentIndex, setCurrentIndex] = useState(0)
  var sortedData = [];
  useEffect(() => {
    axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json').then((res) => {
      let datas = res.data.products
      setData((datas))
    })
  }, []);

    Object.entries(data).map(([key, value]) => {
      sortedData.push({
        'title': value.title, 'popularity': value.popularity, 'price': value.price
      })
    })

  const naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  sortedData.sort((a, b) => naturalCollator.compare(a.popularity, b.popularity));
  sortedData.reverse((a, b) => naturalCollator.compare(a.popularity, b.popularity));
  let dataToSend = sortedData.slice(currentIndex, currentIndex + 10)
  function handleNext() {
    if (currentIndex < sortedData.length) {
      setCurrentIndex(currentIndex + 10)
    }
  }
  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 10)
    } else {
    }
    buttonDisable = true
  }

  return (
    <div >
      <header id="heading">
        <div >
          List of Mobile data
        </div>
      </header>
      <div id="center">
        <TableComponent data={dataToSend} />

      </div>
      <div id="center">
        <span>Count {currentIndex+10}</span>
      </div>
      <div id="center">
        <button class="button buttonHover" disabled={buttonDisable} onClick={handlePrevious}>Previous</button>
        <button class="button buttonHover" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;