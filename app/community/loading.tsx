

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">   
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
        <h2 className="text-center text-2xl font-semibold text-gray-700 dark:text-gray-300">Loading Community...</h2>
        <p className="w-1/2 text-center text-gray-600 dark:text-gray-400">Please wait while we fetch the latest discussions and posts from the community.</p>
    </div>
  )
}
