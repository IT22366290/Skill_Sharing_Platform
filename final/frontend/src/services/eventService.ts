import api from './api';
import { CreateEventDTO, Event, UpdateEventDTO } from '../types/event';
export const eventService = {
  getAllEvents: async (): Promise<Event[]> => {
    try {
      const response = await api.get<Event[]>('/v1/events');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw new Error('Failed to fetch events. Please try again.');
    }
  },
  getEventById: async (id: string): Promise<Event> => {
    try {
      const response = await api.get<Event>(`/v1/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch event:', error);
      throw new Error('Failed to fetch event. Please try again.');
    }
  },
  createEvent: async (data: CreateEventDTO): Promise<Event> => {
    try {
      const formData = new FormData();
      formData.append('userId', data.userId);
      formData.append('eventTitle', data.eventTitle);
      formData.append('description', data.description);
      formData.append('eventType', data.eventType);
      formData.append('eventCategory', data.eventCategory);
      formData.append('date', data.date);
      formData.append('time', data.time);
      formData.append('duration', data.duration);
      if (data.image) {
        formData.append('image', data.image);
      }
      const response = await api.post<Event>('/v1/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create event:', error);
      throw new Error('Failed to create event. Please try again.');
    }
  },
  updateEvent: async (id: string, data: UpdateEventDTO): Promise<Event> => {
    try {
      const formData = new FormData();
      formData.append('userId', data.userId);
      formData.append('eventTitle', data.eventTitle);
      formData.append('description', data.description);
      formData.append('eventType', data.eventType);
      formData.append('eventCategory', data.eventCategory);
      formData.append('date', data.date);
      formData.append('time', data.time);
      formData.append('duration', data.duration);
      if (data.image) {
        formData.append('image', data.image);
      }
      const response = await api.put<Event>(`/v1/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update event:', error);
      throw new Error('Failed to update event. Please try again.');
    }
  },
  deleteEvent: async (id: string): Promise<void> => {
    try {
      await api.delete(`/v1/events/${id}`);
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw new Error('Failed to delete event. Please try again.');
    }
  }
};