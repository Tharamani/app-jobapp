import axios from 'axios';

// export const getAuthToken = ()=>{
// 	return localStorage.getItem('regtoken');
// }

export const authRequests = axios.create({
	headers: {
    Authorization:
      `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
  },
});