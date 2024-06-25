import { Country } from "@/types";
import axios from "axios";

import pThrottle from "p-throttle";

const throttle = pThrottle({
  limit: 1,
  interval: 1000,
  strict: true,
  onDelay: () => {
    console.log("Reached interval limit, call is delayed");
  },
});

export default {
  get(apiUrl: string) {
    return axios.get(apiUrl, {
      auth: {
        username: "any-user-name",
        password: process.env.API_KEY as string,
      },
    });
  },

  async batchedGetDataForCountry(countries: Array<Country>) {
    const continentCodes = ["all", "2001", "1005", "2003", "2004", "2002", "1017", "1015", "1021", "2000", "1014", "1015", "1018", "1012", "1002", "1006", "1012", "1015", "1020", "2003", "1020", "1004", "1016", "1009", "1011", "2005", "1001", "1003"];

    const countryAsPromises = countries
      .filter((country) => !continentCodes.includes(country.countryCode.toString()))
      .map((country) =>
        throttle(() => {
          console.log(`Fetching Data for Country with code ${country.countryCode}`);
          return this.get(
            `https://api.footprintnetwork.org/v1/data/${country.countryCode}/all`
          );
        })
      );
    const results = await Promise.all(countryAsPromises);
    const r = [];
    for (let i = 0; i < results.length; i++) {
      const s = await results[i]();
      r.push({ ...s.data });
    }
    return r;
  },
};
