import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./FlashcardList";
import "./app.css";
// import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const [ categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
  const fetchCategory = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php")
      const data = await response.json()
      setCategories(data.trivia_categories);
    } catch (e) {

    }
  }
  fetchCategory()
  }, [])

  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const amount = amountEl.current.value;
        const category = categoryEl.current.value;
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}`;

        const response = await fetch(url);
        const data = await response.json();

        setFlashcards(
          data.results.map((questionItem, index) => {
            const answer = questionItem.correct_answer;
            const options = [...questionItem.incorrect_answers, answer].map(
              (answer) => decodeString(answer)
            );

            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: decodeString(answer),
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }

  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category"> Category</label>
        <select id="category" ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}</option>
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Number of Questions:</label>
       <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
      </div>
      <div className="form-group">
          <button className="btn">Generate</button>
      </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What is 2 + 3?",
    answer: "Answer",
    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  },
];

export default App;
