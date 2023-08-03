import React, { useEffect, useState } from "react";
//import logo from "./logo.svg";
import diaryService from "./services/diaryServices";
import "./App.css";
import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  Visibility,
  Weather,
} from "./types";

function App() {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([]);
  const initialNewDiary = {
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: "",
  };
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    ...initialNewDiary,
  });
  const addDiaryEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newDiaryTemp = await diaryService.create(newDiary);
      setDiary(diary.concat(newDiaryTemp));
      setNewDiary({ ...initialNewDiary });
    } catch (error: unknown) {
      console.log(error instanceof Error ? error.message : "Unknown");
    }
  };
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
      <h2>add new</h2>
      <form id="newEntry" onSubmit={addDiaryEntry}>
        <div>
          Date:{" "}
          <input
            type="string"
            id="dateinput"
            value={newDiary.date}
            onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
          />
        </div>
        <div>
          Weather:{" "}
          <input
            type="string"
            id="weatherinput"
            value={newDiary.weather}
            onChange={(e) =>
              setNewDiary({ ...newDiary, weather: e.target.value as Weather })
            }
          />
        </div>
        <div>
          Visibility:{" "}
          <input
            type="string"
            id="visibilityinput"
            value={newDiary.visibility}
            onChange={(e) =>
              setNewDiary({
                ...newDiary,
                visibility: e.target.value as Visibility,
              })
            }
          />
        </div>
        <div>
          Comment:{" "}
          <input
            type="string"
            id="commentinput"
            value={newDiary.comment}
            onChange={(e) =>
              setNewDiary({ ...newDiary, comment: e.target.value })
            }
          />
        </div>
        <button type="submit">submit</button>
      </form>
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
