import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
// import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  useEffect(() => {
    // axios.get('https://opentdb.com/api.php?amount=10')
    // .then(res => {
    //   console.log(res.data)
    // })

    fetch('https://opentdb.com/api.php?amount=10', { method: "GET"})
      .then(res => res.json())
      .then(data => console.log(data.results))
      .catch(error => console.error('Error fetching data:', error))
  }, []);

  return (
   <FlashcardList flashcards={flashcards} />
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'What is 2 + 3?',
    answer: 'Answer',
    options: [
      'Answer 1',
      'Answer 2',
      'Answer 3',
      'Answer 4',
    ]
  },
]

export default App;
