import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-500">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 px-3 py-1 cursor-pointer border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1 cursor-pointer border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors dark:text-white dark:bg-blue-800 dark:hover:bg-blue-700"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}