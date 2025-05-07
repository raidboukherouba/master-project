import { useState } from 'react';
import {
  svmClassification,
  knnClassification,
  nbmClassification,
  cnnClassification,
  lstmClassification,
  arabicBertBaseClassification,
  arabicBertMiniClassification,
  arabicBertmediumClassification,
  distilbertClassification,
  aragbpt2Classification,
  majorityVotingClassification,
  stackingClassification
} from '../services/modelsService';

export default function SentimentAnalysis() {
  const [text, setText] = useState('');
  const [model, setModel] = useState('svm');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const models = [
    { id: 'svm', name: 'SVM (Support Vector Machine)', handler: svmClassification },
    { id: 'knn', name: 'KNN (K-Nearest Neighbors)', handler: knnClassification },
    { id: 'nbm', name: 'NBM (Multinomial Naive Bayes)', handler: nbmClassification },
    { id: 'cnn', name: 'CNN (Convolutional Neural Network)', handler: cnnClassification },
    { id: 'lstm', name: 'LSTM (Long Short-Term Memory)', handler: lstmClassification },
    { id: 'arabic_bert_base', name: 'Arabic Bert Base', handler: arabicBertBaseClassification },
    { id: 'arabic_bert_mini', name: 'Arabic Bert Mini', handler: arabicBertMiniClassification },
    { id: 'arabic_bert_medium', name: 'Arabic Bert Medium', handler: arabicBertmediumClassification },
    { id: 'distil_bert_cased', name: 'DistilBert Cased', handler: distilbertClassification },
    { id: 'aragpt2', name: 'araGPT2', handler: aragbpt2Classification },
    { id: 'majority_voting', name: 'Majority Voting', handler: majorityVotingClassification },
    { id: 'stacking', name: 'Stacking', handler: stackingClassification }
  ];

  const formatPercentage = (value) => {
    return (value * 100).toFixed(2) + '%';
  };

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const selectedModel = models.find(m => m.id === model);
      
      if (!selectedModel?.handler) {
        throw new Error('Selected model not implemented');
      }

      const response = await selectedModel.handler(text);
      
      // Handle different response formats
      if (model === 'stacking') {
        setResult({
          type: 'ensemble',
          sentiment: response.stacking_vote?.sentiment,
          confidence: response.stacking_vote?.confidence,
          modelName: selectedModel.name,
          details: response.models ? Object.entries(response.models).map(([modelName, probs]) => ({
            model: modelName,
            positive: probs.positive_prob,
            negative: probs.negative_prob
          })) : []
        });
      } else if (model === 'majority_voting') {
        setResult({
          type: 'ensemble',
          sentiment: response.majority_vote?.sentiment,
          confidence: response.majority_vote?.confidence,
          modelName: selectedModel.name,
          details: response.models ? Object.entries(response.models).map(([modelName, modelData]) => ({
            model: modelName,
            sentiment: modelData.sentiment,
            confidence: modelData.confidence
          })) : []
        });
      } else {
        // Standard model response
        setResult({
          type: 'standard',
          sentiment: response.sentiment === 'Positive' ? 'Positive' : 'Negative',
          confidence: response.confidence || (response.sentiment === 'Positive' ? response.positive_prob : response.negative_prob) || 0,
          modelName: selectedModel.name
        });
      }
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColors = (sentiment) => {
    return {
      bg: sentiment === 'Positive' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900',
      text: sentiment === 'Positive' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200',
      progress: sentiment === 'Positive' ? 'bg-green-500' : 'bg-red-500'
    };
  };

  return (
    <div className="max-w-3xl mt-4 mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 p-6">
        {/* Model Selection */}
        <div className="mb-6">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Analysis Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full py-1.5 truncate border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text to Analyze
          </label>
          <textarea
            id="text"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your text here..."
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={analyzeSentiment}
          disabled={!text.trim() || isLoading}
          className={`w-full py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            !text.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Sentiment'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg animate-fade-in">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="mt-8 space-y-6">
            {/* Main Result Card */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {result.modelName} Result
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    getSentimentColors(result.sentiment).bg
                  } ${
                    getSentimentColors(result.sentiment).text
                  }`}>
                    {result.sentiment}
                  </span>
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confidence: {formatPercentage(result.confidence)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      getSentimentColors(result.sentiment).progress
                    }`}
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Ensemble Model Details */}
            {result.type === 'ensemble' && result.details.length > 0 && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  Model Contributions
                </h4>
                <div className="space-y-3">
                  {result.details.map((modelDetail, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {modelDetail.model.replace(/_/g, ' ')}
                        </span>
                        {model === 'stacking' ? (
                          <div className="flex space-x-4">
                            <span className="text-green-600 dark:text-green-400">
                              Positive: {formatPercentage(modelDetail.positive)}
                            </span>
                            <span className="text-red-600 dark:text-red-400">
                              Negative: {formatPercentage(modelDetail.negative)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex space-x-4">
                            <span className={modelDetail.sentiment === 'Positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {modelDetail.sentiment}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Confidence: {formatPercentage(modelDetail.confidence)}
                            </span>
                          </div>
                        )}
                      </div>
                      {model === 'stacking' ? (
                        <div className="flex space-x-1 h-1.5">
                          <div 
                            className="bg-green-500 rounded-l-full" 
                            style={{ width: `${modelDetail.positive * 100}%` }}
                          ></div>
                          <div 
                            className="bg-red-500 rounded-r-full" 
                            style={{ width: `${modelDetail.negative * 100}%` }}
                          ></div>
                        </div>
                      ) : (
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              modelDetail.sentiment === 'Positive' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${modelDetail.confidence * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}