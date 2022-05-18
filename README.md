# OddJobs-Frontend

> This is the frontend part of our group project, Odd Jobs, a mobile app to help connect members of the community who require, or wish to offer, help with odd jobs. Users have the ability to either post a job, or respond to a posted job. There is also an integrated chat feature which enables users to communicate about a job. The user’s location is pinned to a map which displays jobs in the surrounding area.
 
The repo for the backend can be found here:
https://github.com/timwtuck/OddJobs-Backend
 
## Authors

This app was created by the following: 

- [Vicky Brooke · GitHub](https://github.com/vbrooke78) 
- [Akin Fagbohun · GitHub](https://github.com/datboyakin)
- [Tim Tucker · GitHub](https://github.com/timwtuck)
- [John Murphy · GitHub](https://github.com/johndmurphy)
- [Shaun Clarke · GitHub](https://github.com/Tavelar/)

## Tech Stack

- React Native
- Expo
- Socket io

## Installation Instructions

In your terminal input the following:

```bash
git clone https://github.com/datboyakin/OddJobs-Frontend.git

cd OddJobs-Frontend

npm install
```

MacOS users will also need to run the following command:

```bash
npx pod-install
```

As Odd Jobs uses `react-native-maps`, you will need to add your own `API key` to the App.
To do so, get your API key and enable the `Geocoding API` and `Maps Javascript API`. 
Billing must be enabled on the account.

In the root of the project create a file named `.env`

Inside the file input the following (replacing YOUR_API_KEY with the Google API key):

  `REACT_APP_API_KEY=YOUR_API_KEY`

Ensure this is added to the `gitIgnore` file.
 
 
 

