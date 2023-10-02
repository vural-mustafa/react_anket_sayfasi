// MUSTAFA VURAL //
// get ve pos istekler 23.09.2023
import { instance } from ".";

export const getAnswers = (id) =>
   instance(`/answers/${id}`, {
      method: "get",
   });

export const setAnswers = (id, data) =>
   instance(`/answers/${id}`, {
      method: "post",
      data,
   });