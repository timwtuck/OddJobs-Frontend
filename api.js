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
