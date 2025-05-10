export type EventType = "ONLINE" | "IN_PERSON";
export type EventCategory = "TECH_PROGRAMMING" | "DESIGN" | "LANGUAGE" | "MUSIC" | "BUSINESS";
export interface CreateEventDTO {
  userId: string;
  eventTitle: string;
  description: string;
  eventType: EventType;
  eventCategory: EventCategory;
  date: string;
  time: string;
  duration: string;
  image?: File;
}
export interface UpdateEventDTO extends Omit<CreateEventDTO, 'image'> {
  image?: File;
}
export interface Event {
  id: string;
  userId: string;
  eventTitle: string;
  description: string;
  eventType: EventType;
  eventCategory: EventCategory;
  date: string;
  time: string;
  duration: string;
  image?: string;
  createdAt: string;
}