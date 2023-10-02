// MUSTAFA VURAL //
//post ayarı  23.09.2023
import { instance } from ".";

/**
 *
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.password
 * @returns
 */
export const loginService = (data) =>
   instance("/login", {
      method: "post",
      data,
   });