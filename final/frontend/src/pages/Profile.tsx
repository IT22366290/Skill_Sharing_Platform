import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { UserPlusIcon, MessageCircleIcon, SettingsIcon, AlertCircleIcon, TargetIcon } from 'lucide-react';
import { userService } from '../services/userService';
import { skillPostService } from '../services/skillPostService';
import { learningPlanService } from '../services/learningPlanService';
import { User } from '../types/user';
import { Post } from '../types/post';
import { LearningPlan } from '../types/learningPlan';
import PostCard from '../components/posts/PostCard';
import GoalCard from '../components/goals/GoalCard';
import EditProfileModal from '../components/profile/EditProfileModal';
const Profile = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [goals, setGoals] = useState<LearningPlan[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const currentUserId = localStorage.getItem('userId');
        if (!currentUserId) {
          navigate('/signin');
          return;
        }
        const userId = id === 'me' ? currentUserId : id;
        const userData = await userService.getUserById(userId || '');
        setUser(userData);
        setIsFollowing(userData.followingUserIds?.length > 0 || false);
        // Fetch posts and goals
        await Promise.all([fetchUserPosts(userId), fetchUserGoals(Number(userId))]);
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error fetching user:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [id, navigate]);
  const fetchUserPosts = async (userId: string) => {
    setIsLoadingPosts(true);
    try {
      const userPosts = await skillPostService.getUserPosts(userId);
      setPosts(userPosts);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    } finally {
      setIsLoadingPosts(false);
    }
  };
  const fetchUserGoals = async (userId: number) => {
    setIsLoadingGoals(true);
    try {
      const userGoals = await learningPlanService.getUserPlans(userId);
      setGoals(userGoals);
    } catch (error) {
      console.error('Failed to fetch user goals:', error);
    } finally {
      setIsLoadingGoals(false);
    }
  };
  const handleFollowToggle = async () => {
    setIsFollowing(!isFollowing);
    // TODO: Implement follow/unfollow API call
  };
  const handleEditGoal = (goal: LearningPlan) => {
    // Navigate to goals page for editing
    navigate('/goals');
  };
  const handleDeleteGoal = async (goalId: number) => {
    try {
      await learningPlanService.deletePlan(goalId);
      setGoals(goals.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  if (error || !user) {
    return <div className="flex flex-col items-center justify-center h-64">
        <AlertCircleIcon className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
        <p className="text-gray-500">{error || 'User not found'}</p>
      </div>;
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <div className="space-y-4">
            {isLoadingPosts ? <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div> : posts.length > 0 ? posts.map(post => <PostCard key={post.id} post={post} />) : <div className="text-center py-12 text-gray-500">
                No posts yet
              </div>}
          </div>;
      case 'goals':
        return <div className="space-y-4">
            {isLoadingGoals ? <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div> : goals.length > 0 ? goals.map(goal => <GoalCard key={goal.id} goal={goal} onEdit={() => handleEditGoal(goal)} onDelete={() => goal.id && handleDeleteGoal(goal.id)} />) : <div className="text-center py-12 text-gray-500">
                No goals yet
              </div>}
          </div>;
      case 'followers':
      case 'following':
        return <div className="text-center py-12 text-gray-500">
            {activeTab === 'followers' ? 'No followers yet' : 'Not following anyone yet'}
          </div>;
      default:
        return null;
    }
  };
  return <div className="w-full">
      {/* Cover and Profile Picture */}
      <div className="relative mb-6">
        <div className="h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-r from-blue-100 to-blue-200">
          {/* Placeholder gradient for cover image */}
        </div>
        <div className="absolute left-4 -bottom-16 border-4 border-white rounded-full">
          <motion.div whileHover={{
          scale: 1.05
        }} className="h-32 w-32 rounded-full overflow-hidden">
            <img src={user.profilePictureBase64 ? `data:image/jpeg;base64,${user.profilePictureBase64}` : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt={user.username} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>
      {/* Profile Info */}
      <div className="pl-4 pr-4 pt-16 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.username}
            </h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
          <div className="flex space-x-2">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={handleFollowToggle} className={`flex items-center px-4 py-2 rounded-lg font-medium ${isFollowing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {isFollowing ? 'Following' : <>
                  <UserPlusIcon size={18} className="mr-1" />
                  Follow
                </>}
            </motion.button>
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="flex items-center px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300">
              <MessageCircleIcon size={18} className="mr-1" />
              Message
            </motion.button>
            {id === 'me' && <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => setShowEditModal(true)} className="p-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">
                <SettingsIcon size={18} />
              </motion.button>}
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4 px-4">
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
          <div className="text-sm text-gray-500">Posts</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{goals.length}</div>
          <div className="text-sm text-gray-500">Goals</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-t border-gray-200 mt-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {['posts', 'goals', 'followers', 'following'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>)}
        </div>
      </div>
      {/* Tab Content */}
      <div className="py-4 px-4">{renderTabContent()}</div>
      {showEditModal && user && <EditProfileModal user={user} onClose={() => setShowEditModal(false)} onUpdate={() => {
      fetchUserData();
      setShowEditModal(false);
    }} />}
    </div>;
};
export default Profile;