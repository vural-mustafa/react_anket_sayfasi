// MUSTAFA VURAL //
// axios,get,post ayarı  21.09.2023
import axios from 'axios'

axios.defaults.withCredentials = true;

export const getSurveysMe = () =>
   axios(`/surveys/`, {
      method: "get",
   });

export const getSurveys = (id) =>
   axios(`/surveys/${id}`, {
      method: "get",
   });

export const setSurveys = (data) =>
   axios(`/surveys/`, {
      method: "post",
      data,
   });

export const putSurveys = (id, data) =>
   axios(`/surveys/${id}`, {
      method: "put",
      data,
   });