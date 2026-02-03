const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Get all threads
export const getAllThreads = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/threads`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching threads:', error);
    throw error;
  }
};

// Get a specific thread by ID
export const getThreadById = async (threadId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching thread:', error);
    throw error;
  }
};

// Send a message and get AI response
export const sendChatMessage = async (threadId, message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, message }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Delete a thread
export const deleteThreadById = async (threadId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}`, {
      method: 'DELETE',
    });
    return await response.text();
  } catch (error) {
    console.error('Error deleting thread:', error);
    throw error;
  }
};