import React, { useEffect, useState } from "react";
//import logo from "./logo.svg";
import diaryService from "./services/diaryServices";
import "./App.css";
import { NonSensitiveDiaryEntry } from "./types";

function App() {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([]);
  const initializeDiaryEntries = async () => {
    console.log("start of initialize");
    const res = await diaryService.getAll();
    console.log("initialize", res);
    setDiary(res || []);
  };
  useEffect(() => {
    initializeDiaryEntries();
  }, []);
  return (
    <div className="App">
      <h2> diary entries</h2>
      {diary.map((x, y) => (
        <div key={y}>
          <h3>{x.date}</h3>
          <p>visibility{x.visibility}</p>
          <p>weather{x.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
