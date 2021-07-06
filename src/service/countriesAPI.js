// use to fetch the data from endpoint
import axios from "axios";

const domainURL = "https://restcountries.eu";

// PROMISE
// a promise is an object that represents an asynchronous operation. 
// Promises have several methods that can be register a callback that the JavaScript runtime will call when the operation succeeds or fails.

// Axios requests are actually promises.
//Than means you can use them with promise chaining and async/await.
export const getAllCountries = async () => {
  // room for improve
  // this is to wait the endpoint to have the data ready
  return (await axios.get(`${domainURL}/rest/v2/all`)).data;
  // then() function to register a callback that will call when the request succeeds.
  // .then((response) => response.data);
};

// PROMISES
// Promises as State Machines
// You can think of a promise as a state machine with 3 states:

// Pending The operation is in progress.
// Fulfilled The operation completed successfully.
// Rejected The operation experienced an error.