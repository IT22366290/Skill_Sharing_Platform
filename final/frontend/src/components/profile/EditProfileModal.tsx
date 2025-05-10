import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, UserIcon, MailIcon, LockIcon, ImageIcon, LoaderIcon, CheckCircleIcon } from 'lucide-react';
import { userService } from '../../services/userService';
interface EditProfileModalProps {
  user: {
    id: string;
    username: string;
    email: string;
    profilePictureBase64?: string;
  };
  onClose: () => void;
  onUpdate: () => void;
}
const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user.profilePictureBase64 ? `data:image/jpeg;base64,${user.profilePictureBase64}` : null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBasicInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      if (selectedImage) {
        formDataToSend.append('profilePicture', selectedImage);
      }
      await userService.updateProfile(user.id, formDataToSend);
      setSuccessMessage('Profile updated successfully');
      onUpdate();
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await userService.updatePassword(user.id, passwordData.currentPassword, passwordData.newPassword);
      setSuccessMessage('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{
      scale: 0.95
    }} animate={{
      scale: 1
    }} exit={{
      scale: 0.95
    }} className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
            <XIcon size={20} />
          </button>
        </div>
        <div className="p-4">
          {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg">
              {error}
            </div>}
          {successMessage && <div className="mb-4 bg-green-50 text-green-600 p-3 rounded-lg flex items-center">
              <CheckCircleIcon size={20} className="mr-2" />
              {successMessage}
            </div>}
          {/* Profile Picture Section */}
          <div className="mb-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mx-auto">
                {imagePreview ? <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <UserIcon size={40} className="text-gray-400" />
                  </div>}
              </div>
              <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <ImageIcon size={16} />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>
          {/* Basic Info Form */}
          <form onSubmit={handleBasicInfoSubmit} className="mb-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative">
                  <input type="text" id="username" value={formData.username} onChange={e => setFormData({
                  ...formData,
                  username: e.target.value
                })} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <UserIcon size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <input type="email" id="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <MailIcon size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                {isLoading ? <LoaderIcon className="animate-spin h-5 w-5" /> : 'Save Changes'}
              </motion.button>
            </div>
          </form>
          {/* Password Change Form */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Change Password
            </h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="mt-1 relative">
                  <input type="password" id="currentPassword" value={passwordData.currentPassword} onChange={e => setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value
                })} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <LockIcon size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input type="password" id="newPassword" value={passwordData.newPassword} onChange={e => setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1 relative">
                  <input type="password" id="confirmPassword" value={passwordData.confirmPassword} onChange={e => setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value
                })} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                {isLoading ? <LoaderIcon className="animate-spin h-5 w-5" /> : 'Update Password'}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>;
};
export default EditProfileModal;