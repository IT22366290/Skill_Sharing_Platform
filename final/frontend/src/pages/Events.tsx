import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { SearchIcon, MapPinIcon, CalendarIcon, ClockIcon, VideoIcon, GlobeIcon } from 'lucide-react';
import CreateEventModal from '../components/events/CreateEventModal';
import EditEventModal from '../components/events/EditEventModal';
import { eventService } from '../services/eventService';
import { Event } from '../types/event';
const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const categories = [{
    id: 'all',
    name: 'All Events'
  }, {
    id: 'TECH_PROGRAMMING',
    name: 'Tech & Programming'
  }, {
    id: 'DESIGN',
    name: 'Design'
  }, {
    id: 'LANGUAGE',
    name: 'Language'
  }, {
    id: 'MUSIC',
    name: 'Music'
  }, {
    id: 'BUSINESS',
    name: 'Business'
  }];
  const getEventImage = (event: Event) => {
    if (event.image) {
      // Properly format base64 image as data URL
      return `data:image/png;base64,${event.image}`;
    }
    return null;
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const data = await eventService.getAllEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError('Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateEvent = async (eventData: any) => {
    try {
      await eventService.createEvent(eventData);
      await fetchEvents(); // Refresh the events list
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || event.eventCategory === activeFilter;
    return matchesSearch && matchesFilter;
  });
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">
            Join workshops, meetups, and learning sessions
          </p>
        </div>
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
          Create Event
        </motion.button>
      </div>
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search events..." />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map(category => <button key={category.id} onClick={() => setActiveFilter(category.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {category.name}
                </button>)}
            </div>
          </div>
        </div>
      </div>
      {error && <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>}
      <div className="grid grid-cols-1 gap-6">
        {filteredEvents.map((event: Event) => <motion.div key={event.id} whileHover={{
        y: -4
      }} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto relative">
                {getEventImage(event) ? <img src={getEventImage(event)} alt={event.eventTitle} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <CalendarIcon className="h-12 w-12 text-gray-400" />
                  </div>}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.eventType === 'ONLINE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {event.eventType === 'ONLINE' ? <VideoIcon size={14} className="inline mr-1" /> : <MapPinIcon size={14} className="inline mr-1" />}
                    {event.eventType === 'ONLINE' ? 'Online Event' : 'In Person'}
                  </span>
                </div>
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {event.eventTitle}
                  </h2>
                  {event.userId === localStorage.getItem('userId') && <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} onClick={() => setSelectedEvent(event)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </motion.button>}
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon size={16} className="mr-1" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon size={16} className="mr-1" />
                    {event.time} ({event.duration})
                  </div>
                  {event.eventType === 'ONLINE' && <div className="flex items-center">
                      <GlobeIcon size={16} className="mr-1" />
                      Join from anywhere
                    </div>}
                </div>
              </div>
            </div>
          </motion.div>)}
      </div>
      {filteredEvents.length === 0 && !isLoading && <div className="text-center py-12">
          <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No events found
          </h3>
          <p className="text-gray-500">
            {searchQuery ? "We couldn't find any events matching your search" : 'There are no upcoming events at the moment'}
          </p>
        </div>}
      <AnimatePresence>
        {showCreateModal && <CreateEventModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateEvent} />}
        {selectedEvent && <EditEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onUpdate={() => {
        fetchEvents();
        setSelectedEvent(null);
      }} />}
      </AnimatePresence>
    </div>;
};
export default Events;