import axios from "axios";

import { NonSensitiveDiaryEntry } from "../types";

//const baseUrl = "/api/diaries";
const baseUrl = "http://localhost:3003/api/diaries";
const getAll = () => {
  //const req = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  const req = axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  console.log("baseUrl", req);
  /*
  return req.then((res) => {
    console.log("inside req", res.data);
    return res.data;
  });
  */
  return req.then((response) => response.data);
};
/*
const exportedDiary = {
  getAll,
};
*/
export default { getAll };
