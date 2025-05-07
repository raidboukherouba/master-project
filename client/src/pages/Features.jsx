import { FiZap, FiCpu, FiLayers, FiTrendingUp, FiCode, FiLock } from 'react-icons/fi';

export default function Features() {
  const features = [
    {
      icon: <FiZap className="w-6 h-6 text-blue-500" />,
      title: "Fast Analysis",
      description: "Get sentiment results in milliseconds with our optimized models"
    },
    {
      icon: <FiCpu className="w-6 h-6 text-blue-500" />,
      title: "Multiple Models",
      description: "Choose from 12 specialized NLP models including BERT, LSTM, and SVM"
    },
    {
      icon: <FiLayers className="w-6 h-6 text-blue-500" />,
      title: "Ensemble Methods",
      description: "Advanced stacking and majority voting for higher accuracy"
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-blue-500" />,
      title: "Precision Metrics",
      description: "Detailed confidence scores formatted to 2 decimal places"
    },
    {
      icon: <FiCode className="w-6 h-6 text-blue-500" />,
      title: "Developer Friendly",
      description: "Clean API responses with consistent JSON structure"
    },
    {
      icon: <FiLock className="w-6 h-6 text-blue-500" />,
      title: "Secure Processing",
      description: "Your data is never stored or shared with third parties"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Advanced Sentiment Analysis Features
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            Powerful NLP capabilities for accurate text classification
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="pt-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 p-6"
              >
                <div className="flow-root">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-50 dark:bg-blue-900/30 text-white mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Comparison Table */}
        <div className="mt-16 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                  Model
                </th>
                <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Accuracy
                </th>
                <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Precision
                </th>
                <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Recall
                </th>
                <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  F1-score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              {[
                { name: 'KNN', accuracy: '77%', precision: '78%', recall: '76%', f1: '76%' },
                { name: 'SVM linear', accuracy: '82%', precision: '82%', recall: '81%', f1: '81%' },
                { name: 'Naïve Bayes multinomial', accuracy: '80%', precision: '80%', recall: '79%', f1: '79%' },
                { name: 'LSTM', accuracy: '85%', precision: '88%', recall: '81%', f1: '83%' },
                { name: 'CNN', accuracy: '82%', precision: '86%', recall: '76%', f1: '80%' },
                { name: 'Bert-mini', accuracy: '86%', precision: '86%', recall: '86%', f1: '86%' },
                { name: 'Bert-medium', accuracy: '86.7%', precision: '86.7%', recall: '86.6%', f1: '86.6%' },
                { name: 'Bert-base', accuracy: '87.9%', precision: '87.9%', recall: '87.9%', f1: '87.9%' },
                { name: 'Distilbert', accuracy: '85.9%', precision: '85.9%', recall: '85.9%', f1: '85.9%' },
                { name: 'Aragpt2-base', accuracy: '85.7%', precision: '85.7%', recall: '85.7%', f1: '85.7%' },
                { name: 'Majority voting', accuracy: '90%', precision: '89.1%', recall: '92.5%', f1: '90%' },
                { name: 'Stacking', accuracy: '91.1%', precision: '90.4%', recall: '91.9%', f1: '91.2%' }

              ].map((model, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                    {model.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 dark:text-gray-300">
                    {model.accuracy}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 dark:text-gray-300">
                    {model.precision}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 dark:text-gray-300">
                    {model.recall}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 dark:text-gray-300">
                    {model.f1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}