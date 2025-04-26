import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon, MapPinIcon, CalendarIcon, ClockIcon, UsersIcon, VideoIcon, GlobeIcon, CheckCircleIcon } from 'lucide-react';
interface Event {
  id: string;
  title: string;
  description: string;
  type: 'online' | 'in-person';
  category: string;
  date: string;
  time: string;
  duration: string;
  location?: string;
  image: string;
  host: {
    name: string;
    avatar: string;
  };
  attendees: {
    count: number;
    avatars: string[];
  };
  isRegistered?: boolean;
}
const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const categories = [{
    id: 'all',
    name: 'All Events'
  }, {
    id: 'tech',
    name: 'Tech & Programming'
  }, {
    id: 'design',
    name: 'Design'
  }, {
    id: 'language',
    name: 'Language'
  }, {
    id: 'music',
    name: 'Music'
  }, {
    id: 'business',
    name: 'Business'
  }];
  const [events] = useState<Event[]>([{
    id: '1',
    title: 'React Development Workshop',
    description: 'Learn advanced React patterns and best practices in this hands-on workshop.',
    type: 'online',
    category: 'tech',
    date: '2024-03-15',
    time: '10:00 AM',
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    attendees: {
      count: 145,
      avatars: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80']
    },
    isRegistered: true
  }, {
    id: '2',
    title: 'UI/UX Design Masterclass',
    description: 'Master the fundamentals of user interface and experience design.',
    type: 'in-person',
    category: 'design',
    date: '2024-03-20',
    time: '2:00 PM',
    duration: '3 hours',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    attendees: {
      count: 48,
      avatars: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80']
    }
  }, {
    id: '3',
    title: 'Spanish Language Exchange',
    description: 'Practice Spanish conversation with native speakers and fellow learners.',
    type: 'online',
    category: 'language',
    date: '2024-03-18',
    time: '6:00 PM',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    attendees: {
      count: 32,
      avatars: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80']
    }
  }]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['1']);
  const toggleRegistration = (eventId: string) => {
    setRegisteredEvents(prev => prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]);
  };
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || event.category === activeFilter;
    return matchesSearch && matchesFilter;
  });
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
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
      }} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
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
            <button className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <FilterIcon size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {filteredEvents.map(event => <motion.div key={event.id} whileHover={{
        y: -4
      }} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.type === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {event.type === 'online' ? <VideoIcon size={14} className="inline mr-1" /> : <MapPinIcon size={14} className="inline mr-1" />}
                    {event.type === 'online' ? 'Online Event' : 'In Person'}
                  </span>
                </div>
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {event.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                  </div>
                  <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={() => toggleRegistration(event.id)} className={`shrink-0 px-4 py-2 rounded-lg font-medium ${registeredEvents.includes(event.id) ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {registeredEvents.includes(event.id) ? <>
                        <CheckCircleIcon size={16} className="inline mr-1" />
                        Registered
                      </> : 'Register Now'}
                  </motion.button>
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
                  {event.location && <div className="flex items-center">
                      <MapPinIcon size={16} className="mr-1" />
                      {event.location}
                    </div>}
                  {event.type === 'online' && <div className="flex items-center">
                      <GlobeIcon size={16} className="mr-1" />
                      Join from anywhere
                    </div>}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={event.host.avatar} alt={event.host.name} className="h-8 w-8 rounded-full" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900">
                        Hosted by {event.host.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {event.attendees.avatars.map((avatar, idx) => <img key={idx} src={avatar} alt="Attendee" className="w-6 h-6 rounded-full border-2 border-white" />)}
                    </div>
                    <span className="text-sm text-gray-500">
                      <UsersIcon size={16} className="inline mr-1" />
                      {event.attendees.count} attending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>)}
      </div>
      {filteredEvents.length === 0 && <div className="text-center py-12">
          <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No events found
          </h3>
          <p className="text-gray-500">
            {searchQuery ? "We couldn't find any events matching your search" : 'There are no upcoming events at the moment'}
          </p>
        </div>}
    </div>;
};
export default Events;