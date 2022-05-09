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
export const postJob = job => {
  return oddJobsApi.post('/jobs', job).then(({ data }) => {
    return data.newJob;
  });
};

//need to check what is being sent from the input and maybe edit the argument??
export const postUser = (username, fullName, email, password) => {
  const newUser = {
    username: username,
    fullName: fullName,
    email: email,
    password: password,
  };
  return oddJobsApi.post('/users/register', newUser).then(({ data }) => {
    return data.user;
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
export const patchUser = (user_id, value) => {
  return oddJobsApi.put(`users/${user_id}`, value).then(({ data }) => {
    return data.user;
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
