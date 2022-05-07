import axios from 'axios';

const oddJobsApi = axios.create({
  baseURL: 'https://odd-jobs-backend.herokuapp.com/api',
});

export const getAllJobs = (category, price, location) => {
  return oddJobsApi.get('/jobs').then(({ data }) => {
    return data.jobs;
  });
};

export const getAllUsers = () => {
  return oddJobsApi.get('/users').then(({ data }) => {
    return data.users;
  });
};

export const getSingleJob = job_id => {
  return oddJobsApi.get(`/jobs/${job_id}`).then(({ data }) => {
    return data.job;
  });
};

export const getSingleUser = user_id => {
  return oddJobsApi.get(`/users/${user_id}`).then(({ data }) => {
    return data.user;
  });
};

export const getUserMessages = user_id => {
  return oddJobsApi.get(`/users/${user_id}/messages`).then(({ data }) => {
    return data.messages;
  });
};

export const getSingleUserMessage = (user_id, message_id) => {
  return oddJobsApi
    .get(`/users/${user_id}/messages/${message_id}`)
    .then(({ data }) => {
      return data.message;
    });
};

//need to check what is being sent from the input and maybe edit the argument??
export const postJob = (username, job) => {
  return oddJobsApi
    .post('/jobs', { username: username, body: job })
    .then(({ data }) => {
      return data.newJob;
    });
};

//need to check what is being sent from the input and maybe edit the argument??
export const postUser = user => {
  return oddJobsApi.post('/users', { user }).then(({ data }) => {
    return data.newUser;
  });
};

//need to check what is being sent from the input and maybe edit the argument??
export const postMessage = (username, user_id, message) => {
  return oddJobsApi
    .post(`/users/${user_id}/messages`, { username: username, body: message })
    .then(({ data }) => {
      return data.newMessage;
    });
};

//need to check what is being sent from the input and maybe edit the argument??
export const patchJob = (job_id, patch) => {
  return oddJobsApi.patch(`jobs/${job_id}`, { patch }).then(({ data }) => {
    return data.updatedJob;
  });
};

//need to check what is being sent from the input and maybe edit the argument??
export const patchUser = (user_id, patch) => {
  return oddJobsApi.patch(`users/${user_id}`, { patch }).then(({ data }) => {
    return data.updatedUser;
  });
};

//need to check what is being sent from the input and maybe edit the argument??
export const patchMessage = (user_id, message_id, patch) => {
  return oddJobsApi
    .patch(`users/${user_id}/messages/${message_id}`, { patch })
    .then(({ data }) => {
      return data.updatedMessage;
    });
};

export const deleteJob = job_id => {
  return oddJobsApi.delete(`/jobs/${job_id}`);
};

export const deleteUser = user_id => {
  return oddJobsApi.delete(`/users/${user_id}`);
};

export const deleteMessage = (user_id, message_id) => {
  return oddJobsApi.delete(`users/${user_id}/messages/${message_id}`);
};

// Google Geolocation API

const postcodeGeolocation = axios.create({
  // response format is JSON
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/JSON?',
});

// API Docs - https://developers.google.com/maps/documentation/geocoding/requests-geocoding#request

export const convertFromPostcode = address => {
  // whitespaces should be replaced with '%20' delimited spaces
  // example valid address 'address=LS1%208BA' OR 'address=24%20Sussex%20Drive%20Ottawa%20ON'
  return postcodeGeolocation.get(`${address}`).then(({ data }) => {
    return data;
  });
};

// Google Distance Matrix API

const distanceAPI = axios.create({
  // response format is JSON
  baseURL: 'https://maps.googleapis.com/maps/api/distancematrix/json?',
});

// API Docs - https://developers.google.com/maps/documentation/distance-matrix/start

export const jobsByDistance = (userPostcode, destinationsCheckFormatting) => {
  // whitespaces should be replaced with '%20' delimited spaces
  // example valid address 'address=LS1%208BA' OR 'address=24%20Sussex%20Drive%20Ottawa%20ON'
  // it seems that destinations should be seperated with a pipe i.e. | as '%7C'
  // example multiple destinations looks like 'destinations=LS1%208BA%7CLS1%207AD
  // note the %20 as whitespace in postcode and %7C as pipe between postcode destinations
  return distanceAPI
    .get(
      `origins=${userPostcode}&destinations=${destinationsCheckFormatting}=imperial&key=${YOUR_API_KEY}`,
    )
    .then(({ data }) => {
      return data;
    });
};

// Example JSON Response //

const distanceResponse = {
  destination_addresses: ['various destination locations'],
  origin_addresses: ["user's postcode location"],
  rows: [
    {
      elements: [
        {
          distance: { text: '228 mi', value: 367439 }, // desired data is probably miles
          duration: { text: '3 hours 53 mins', value: 14003 },
          status: 'OK',
        },
      ],
    },
  ],
  status: 'OK',
};

// JSON  distance response ends //

const exampleJobs = {
  jobs: [
    {
      _id: '6272a6e33c6c76416c3ac4f5',
      title: 'Pick up shopping',
      description: 'I need some shopping picked up at 5pm today',
      category: 'delivery',
      price: 4,
      location: { latitude: 53.797, longitude: -1.556 },
      user_id: '6272a5b53c6c76416c3ac4eb',
      __v: 0,
    },
  ],
};
