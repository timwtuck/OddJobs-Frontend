import axios from 'axios';
import { REACT_APP_API_KEY } from '@env';

/*
 *
 *
 *
 * database API
 *
 *
 */

const oddJobsApi = axios.create({
  baseURL: 'https://odd-jobs-backend.herokuapp.com/api',
});

export const getAllJobs = () => {
  return oddJobsApi.get('/jobs').then(({ data }) => {
    return data.jobs;
  });
};

export const getJobsByCategory = category => {
  return oddJobsApi.get(`/jobs?category=${category}`).then(({ data }) => {
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

  return oddJobsApi.get(`/messages/chats/${user_id}`)
    .then(({ data }) => {
      const promises = data.message.map(m => getSingleMessage(m._id));
      return Promise.all(promises);
    })
    .then(allMessages => {

    // fitler to format data as wanted
    const formattedMessages = allMessages.map(message => { 
      
      const messageInfo = {_id: message._id};

      if(message.users[0].userId._id === user_id) {

        messageInfo.user = message.users[1].userId;
        messageInfo.unread = message.users[0].unread;
      } 
      else {
        messageInfo.user = message.users[0].userId;
        messageInfo.unread = message.users[1].unread;
      }

      return messageInfo;
    });

    return formattedMessages;
  });
};

export const getSingleMessage = (message_id, userId) => {
  
  let path = `/messages/${message_id}`;
  
  if(userId)
    path += `?user=${userId}`;

  return oddJobsApi
    .get(path)
    .then(({ data }) => {
      return data.message;
    })
};

//need to check what is being sent from the input and maybe edit the argument??
export const postJob = job => {
  return oddJobsApi.post('/jobs', job).then(({ data }) => {
    return data.job;
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

export const createConversation = (user1, user2) => {

  const users = {
    users: [
      {userId: user1},
      {userId: user2}
    ]
  };

  return oddJobsApi.post('/messages', users)
    .then(({data}) => {
      return data.message;
    })
    .catch(err => console.log(err))
}

//need to check what is being sent from the input and maybe edit the argument??
export const postMessage = (userId, messageId, message) => {

  const newMessage = {
    userId: userId,
    content_type: 'text',
    content: message
  }

  return oddJobsApi
    .post(`/messages/${messageId}`,newMessage)
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
