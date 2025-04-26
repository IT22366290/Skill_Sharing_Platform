import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LeftSidebar from './components/layout/LeftSidebar';
import RightSidebar from './components/layout/RightSidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Goals from './pages/Goals';
import CreatePostModal from './components/posts/CreatePostModal';
import Friends from './pages/Friends';
import Saved from './pages/Saved';
import Events from './pages/Events';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
export function App() {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userId'));
  return <Router>
        {!isAuthenticated ? <Routes>
              <Route path="/signin" element={<SignIn onSignIn={() => setIsAuthenticated(true)} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<SignIn onSignIn={() => setIsAuthenticated(true)} />} />
            </Routes> : <div className="min-h-screen bg-gray-100">
              <Navbar onCreatePost={() => setIsCreatePostModalOpen(true)} />
              <div className="flex">
                <LeftSidebar />
                <main className="flex-1 px-2 py-6 md:px-4 lg:px-8 max-w-full overflow-hidden">
                  <div className="max-w-2xl mx-auto">
                    <Routes>
                      <Route path="/" element={<Home onCreatePost={() => setIsCreatePostModalOpen(true)} />} />
                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/goals" element={<Goals />} />
                      <Route path="/friends" element={<Friends />} />
                      <Route path="/saved" element={<Saved />} />
                      <Route path="/events" element={<Events />} />
                    </Routes>
                  </div>
                </main>
                <RightSidebar />
              </div>
              {isCreatePostModalOpen && <CreatePostModal onClose={() => setIsCreatePostModalOpen(false)} />}
            </div>}
      </Router>;
}