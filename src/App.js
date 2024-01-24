import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [quoteData, setQuote] = useState({
    quote: '',
    sayer: '',
    characterSlug: ''
  });

  function getQuote() {
    axios.get('https://api.gameofthronesquotes.xyz/v1/random')
      .then((response) => {
        const { sentence, character ,  } = response.data;
        setQuote({ quote: sentence, sayer: character.name ,characterSlug: character.slug});
      })
      .catch((error) => {
        setQuote({ quote: "Please try again later !!", sayer: "" });
      });
  }

  useEffect(() => {
    getQuote();
  }, [count]);

  const handleButtonClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={`App ${quoteData.characterSlug}`}>
      <div className='cover'></div>
      <div className='title font'>Game Of Thrones <br/> Quotes</div>
      <div className='contain'>
        <div className='quote font'> "{quoteData.quote}"</div>
        <div className='by font'> {quoteData.sayer} </div>
      </div>
      <button className='got-button' onClick={handleButtonClick}>More</button>
    </div>
  );
}

export default App;
