import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchEvents(params: any = {}) {
  const res = await axios.get(`${API_URL}/api/events`, { params });
  return res.data;
}

export async function fetchEventDetail(id: string) {
  const res = await axios.get(`${API_URL}/api/events/${id}`);
  return res.data;
} 