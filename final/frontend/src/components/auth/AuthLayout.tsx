import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle
}) => {
  return <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-gray-50" style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')",
    backgroundBlendMode: 'overlay',
    backgroundColor: 'rgba(243, 244, 246, 0.97)'
  }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <span className="text-3xl font-bold text-blue-600">SkillShare</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </motion.div>
      </div>
    </div>;
};
export default AuthLayout;