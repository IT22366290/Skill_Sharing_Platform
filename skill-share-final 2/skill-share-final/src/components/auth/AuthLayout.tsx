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
  return <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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