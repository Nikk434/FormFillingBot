import axios from 'axios';

const API_URL = '/api';

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/send-message`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
