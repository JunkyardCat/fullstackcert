import React, { useEffect, useState } from "react";
//import logo from "./logo.svg";
import diaryService from "./services/diaryServices";
import "./App.css";
import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  ValidationError,
  Visibility,
  Weather,
} from "./types";
import axios from "axios";
import { isValidationError } from "./utils";

function App() {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log("test", error.status, error.response);
        if (error.response && isValidationError(error.response)) {
          console.log("im inside", error.response.data);
          const temp = String(error.response.data);
          //const temp: string = validationError;
          setErrorMessage(temp);
          setTimeout(() => setErrorMessage(null), 5000);
        } else {
          console.log("unknown axios error");
        }
      } else if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("unkown error");
      }
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <h2>add new</h2>
      <form id="newEntry" onSubmit={addDiaryEntry}>
        <div>
          Date:{" "}
          <input
            type="date"
            id="dateinput"
            value={newDiary.date}
            onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
          />
        </div>
        <div>
          Weather: <br />
          {Object.values(Weather).map((w, i) => (
            <>
              <input
                type="radio"
                id={w}
                key={i + "weather"}
                name="weatherradio"
                onChange={() => setNewDiary({ ...newDiary, weather: w })}
                checked={newDiary.weather === w}
              />
              <label key={w + "label"}>{w}</label>
            </>
          ))}
        </div>
        <div>
          Visibility: <br />
          {Object.values(Visibility).map((w, i) => (
            <>
              <input
                type="radio"
                id={w}
                key={i + "visibility"}
                name="visibilityradio"
                onChange={() => setNewDiary({ ...newDiary, visibility: w })}
                checked={newDiary.visibility === w}
              />
              <label key={w + "label"}>{w}</label>
            </>
          ))}
        </div>
        <div>
          Comment:{" "}
          <input
            type="string"
            id="commentinput"
            key="comment"
            value={newDiary.comment}
            onChange={(e) =>
              setNewDiary({ ...newDiary, comment: e.target.value })
            }
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2> diary entries</h2>
      {diary.map((x, y) => (
        <div key={y}>
          <h3>{x.date}</h3>
          <p>visibility: {x.visibility}</p>
          <p>weather: {x.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
