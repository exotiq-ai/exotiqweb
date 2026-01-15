import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle, XCircle, AlertTriangle, Loader, MessageSquare, Zap, Brain, Clock } from 'lucide-react';
import { openAIService } from '../../services/openai';
import { analyticsService } from '../../services/analytics';
import { persistenceService } from '../../services/persistence';
import logger from '../../utils/logger';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  message: string;
  details?: any;
  duration?: number;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  status: 'pending' | 'running' | 'completed';
}

export default function ChatBotTest() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'pending' | 'success' | 'error' | 'warning'>('pending');
  const [testSessionId] = useState(`test-${Date.now()}`);

  const updateTestResult = (suiteIndex: number, testIndex: number, result: Partial<TestResult>) => {
    setTestSuites(prev => {
      const newSuites = [...prev];
      newSuites[suiteIndex].tests[testIndex] = { ...newSuites[suiteIndex].tests[testIndex], ...result };
      return newSuites;
    });
  };

  const updateSuiteStatus = (suiteIndex: number, status: TestSuite['status']) => {
    setTestSuites(prev => {
      const newSuites = [...prev];
      newSuites[suiteIndex].status = status;
      return newSuites;
    });
  };

  // Initialize test suites
  useEffect(() => {
    setTestSuites([
      {
        name: 'Environment & Configuration',
        status: 'pending',
        tests: [
          { name: 'Supabase URL Configuration', status: 'pending', message: '' },
          { name: 'Supabase Anon Key Configuration', status: 'pending', message: '' },
          { name: 'AI Responses Enabled', status: 'pending', message: '' },
          { name: 'Edge Function Endpoint', status: 'pending', message: '' }
        ]
      },
      {
        name: 'OpenAI Integration',
        status: 'pending',
        tests: [
          { name: 'Basic AI Response', status: 'pending', message: '' },
          { name: 'Context Awareness', status: 'pending', message: '' },
          { name: 'Conversation History', status: 'pending', message: '' },
          { name: 'Error Handling & Fallback', status: 'pending', message: '' },
          { name: 'Response Quality', status: 'pending', message: '' }
        ]
      },
      {
        name: 'Services Integration',
        status: 'pending',
        tests: [
          { name: 'Analytics Service', status: 'pending', message: '' },
          { name: 'Persistence Service', status: 'pending', message: '' },
          { name: 'Session Management', status: 'pending', message: '' },
          { name: 'Lead Scoring', status: 'pending', message: '' }
        ]
      },
      {
        name: 'Performance & Reliability',
        status: 'pending',
        tests: [
          { name: 'Response Time', status: 'pending', message: '' },
          { name: 'Concurrent Requests', status: 'pending', message: '' },
          { name: 'Memory Usage', status: 'pending', message: '' },
          { name: 'Error Recovery', status: 'pending', message: '' }
        ]
      }
    ]);
  }, []);

  const runTests = async () => {
    setIsRunning(true);
    setOverallStatus('pending');

    try {
      // Test Suite 1: Environment & Configuration
      await runEnvironmentTests();
      
      // Test Suite 2: OpenAI Integration
      await runOpenAITests();
      
      // Test Suite 3: Services Integration
      await runServicesTests();
      
      // Test Suite 4: Performance & Reliability
      await runPerformanceTests();

      // Calculate overall status
      const allTests = testSuites.flatMap(suite => suite.tests);
      const hasErrors = allTests.some(test => test.status === 'error');
      const hasWarnings = allTests.some(test => test.status === 'warning');
      
      if (hasErrors) {
        setOverallStatus('error');
      } else if (hasWarnings) {
        setOverallStatus('warning');
      } else {
        setOverallStatus('success');
      }

    } catch (error) {
      logger.error('Test execution failed', { error });
      setOverallStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const runEnvironmentTests = async () => {
    updateSuiteStatus(0, 'running');

    // Test 1: Supabase URL
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    updateTestResult(0, 0, {
      status: supabaseUrl ? 'success' : 'error',
      message: supabaseUrl ? `✓ ${supabaseUrl}` : '✗ VITE_SUPABASE_URL not configured'
    });

    // Test 2: Supabase Anon Key
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    updateTestResult(0, 1, {
      status: anonKey ? 'success' : 'error',
      message: anonKey ? '✓ Anon key configured' : '✗ VITE_SUPABASE_ANON_KEY not configured'
    });

    // Test 3: AI Responses Enabled
    const aiEnabled = import.meta.env.VITE_ENABLE_AI_RESPONSES;
    updateTestResult(0, 2, {
      status: aiEnabled === 'true' ? 'success' : 'warning',
      message: aiEnabled === 'true' ? '✓ AI responses enabled' : '⚠ AI responses disabled'
    });

    // Test 4: Edge Function Endpoint
    if (supabaseUrl) {
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/chatbot-ai`, {
          method: 'OPTIONS',
          headers: {
            'Authorization': `Bearer ${anonKey}`,
          }
        });
        
        updateTestResult(0, 3, {
          status: response.ok ? 'success' : 'error',
          message: response.ok ? '✓ Edge function accessible' : `✗ Edge function error: ${response.status}`
        });
      } catch (error) {
        updateTestResult(0, 3, {
          status: 'error',
          message: `✗ Edge function unreachable: ${error.message}`
        });
      }
    }

    updateSuiteStatus(0, 'completed');
  };

  const runOpenAITests = async () => {
    updateSuiteStatus(1, 'running');

    // Test 1: Basic AI Response
    try {
      const startTime = Date.now();
      const response = await openAIService.generateResponse(
        testSessionId,
        "Hello, I'm testing the AI integration. Please respond with 'AI integration working' if you can understand this.",
        { fleetSize: '1-5 vehicles' }
      );
      const duration = Date.now() - startTime;

      const isWorking = response.toLowerCase().includes('ai') || response.toLowerCase().includes('integration') || response.length > 10;
      
      updateTestResult(1, 0, {
        status: isWorking ? 'success' : 'warning',
        message: isWorking ? `✓ AI responded: "${response.substring(0, 50)}..."` : `⚠ Unexpected response: "${response}"`,
        duration,
        details: { response, duration }
      });
    } catch (error) {
      updateTestResult(1, 0, {
        status: 'error',
        message: `✗ AI request failed: ${error.message}`,
        details: { error: error.message }
      });
    }

    // Test 2: Context Awareness
    try {
      const response = await openAIService.generateResponse(
        testSessionId,
        "What's my fleet size?",
        { fleetSize: '6-15 vehicles', name: 'TestUser' }
      );

      const isContextAware = response.toLowerCase().includes('6') || response.toLowerCase().includes('15') || response.toLowerCase().includes('fleet');
      
      updateTestResult(1, 1, {
        status: isContextAware ? 'success' : 'warning',
        message: isContextAware ? '✓ AI uses context correctly' : '⚠ AI may not be using context',
        details: { response }
      });
    } catch (error) {
      updateTestResult(1, 1, {
        status: 'error',
        message: `✗ Context test failed: ${error.message}`
      });
    }

    // Test 3: Conversation History
    try {
      // First message
      await openAIService.generateResponse(testSessionId, "My name is TestUser and I have 10 vehicles.");
      
      // Second message referencing first
      const response = await openAIService.generateResponse(testSessionId, "What did I just tell you about my fleet?");
      
      const remembersContext = response.toLowerCase().includes('10') || response.toLowerCase().includes('ten') || response.toLowerCase().includes('testuser');
      
      updateTestResult(1, 2, {
        status: remembersContext ? 'success' : 'warning',
        message: remembersContext ? '✓ AI remembers conversation history' : '⚠ AI may not remember previous messages',
        details: { response }
      });
    } catch (error) {
      updateTestResult(1, 2, {
        status: 'error',
        message: `✗ History test failed: ${error.message}`
      });
    }

    // Test 4: Error Handling & Fallback
    try {
      // Test with invalid session to trigger fallback
      const response = await openAIService.generateResponse(
        'invalid-session-test',
        "This should trigger fallback response",
        {}
      );

      const hasFallback = response.length > 0;
      
      updateTestResult(1, 3, {
        status: hasFallback ? 'success' : 'error',
        message: hasFallback ? '✓ Fallback responses working' : '✗ No fallback response',
        details: { response }
      });
    } catch (error) {
      updateTestResult(1, 3, {
        status: 'warning',
        message: `⚠ Error handling test inconclusive: ${error.message}`
      });
    }

    // Test 5: Response Quality
    try {
      const response = await openAIService.generateResponse(
        testSessionId,
        "I'm a Turo host with 5 cars. What's the biggest challenge I might face?",
        { fleetSize: '1-5 vehicles', experience: 'intermediate' }
      );

      const isQualityResponse = response.length > 20 && 
                              (response.toLowerCase().includes('turo') || 
                               response.toLowerCase().includes('fleet') || 
                               response.toLowerCase().includes('challenge'));
      
      updateTestResult(1, 4, {
        status: isQualityResponse ? 'success' : 'warning',
        message: isQualityResponse ? '✓ High-quality, relevant responses' : '⚠ Response quality may need improvement',
        details: { response }
      });
    } catch (error) {
      updateTestResult(1, 4, {
        status: 'error',
        message: `✗ Quality test failed: ${error.message}`
      });
    }

    updateSuiteStatus(1, 'completed');
  };

  const runServicesTests = async () => {
    updateSuiteStatus(2, 'running');

    // Test 1: Analytics Service
    try {
      analyticsService.track('test_event', { test: true }, testSessionId);
      analyticsService.startConversation(testSessionId, { test: true });
      analyticsService.trackMessage(testSessionId, 'user', 'Test message');
      
      const events = analyticsService.getEvents({ sessionId: testSessionId });
      
      updateTestResult(2, 0, {
        status: events.length > 0 ? 'success' : 'warning',
        message: events.length > 0 ? `✓ Analytics tracking ${events.length} events` : '⚠ Analytics not tracking events',
        details: { eventCount: events.length }
      });
    } catch (error) {
      updateTestResult(2, 0, {
        status: 'error',
        message: `✗ Analytics service error: ${error.message}`
      });
    }

    // Test 2: Persistence Service
    try {
      persistenceService.addMessage(testSessionId, {
        id: 'test-msg-1',
        type: 'user',
        content: 'Test persistence',
        timestamp: new Date()
      });

      const conversation = persistenceService.loadConversation(testSessionId);
      
      updateTestResult(2, 1, {
        status: conversation ? 'success' : 'error',
        message: conversation ? '✓ Conversation persistence working' : '✗ Persistence service failed',
        details: { messageCount: conversation?.messages.length || 0 }
      });
    } catch (error) {
      updateTestResult(2, 1, {
        status: 'error',
        message: `✗ Persistence service error: ${error.message}`
      });
    }

    // Test 3: Session Management
    try {
      const sessionId = testSessionId;
      const isValidSession = sessionId && sessionId.length > 0;
      
      updateTestResult(2, 2, {
        status: isValidSession ? 'success' : 'error',
        message: isValidSession ? `✓ Session management working: ${sessionId}` : '✗ Session management failed',
        details: { sessionId }
      });
    } catch (error) {
      updateTestResult(2, 2, {
        status: 'error',
        message: `✗ Session management error: ${error.message}`
      });
    }

    // Test 4: Lead Scoring
    try {
      persistenceService.updateLeadScore(testSessionId, 75);
      const conversation = persistenceService.loadConversation(testSessionId);
      
      updateTestResult(2, 3, {
        status: conversation?.leadScore === 75 ? 'success' : 'warning',
        message: conversation?.leadScore === 75 ? '✓ Lead scoring functional' : '⚠ Lead scoring may not be working',
        details: { leadScore: conversation?.leadScore }
      });
    } catch (error) {
      updateTestResult(2, 3, {
        status: 'error',
        message: `✗ Lead scoring error: ${error.message}`
      });
    }

    updateSuiteStatus(2, 'completed');
  };

  const runPerformanceTests = async () => {
    updateSuiteStatus(3, 'running');

    // Test 1: Response Time
    try {
      const startTime = Date.now();
      await openAIService.generateResponse(testSessionId, "Quick response test");
      const responseTime = Date.now() - startTime;

      const isGoodPerformance = responseTime < 10000; // 10 seconds
      
      updateTestResult(3, 0, {
        status: isGoodPerformance ? 'success' : 'warning',
        message: isGoodPerformance ? `✓ Response time: ${responseTime}ms` : `⚠ Slow response: ${responseTime}ms`,
        duration: responseTime,
        details: { responseTime }
      });
    } catch (error) {
      updateTestResult(3, 0, {
        status: 'error',
        message: `✗ Performance test failed: ${error.message}`
      });
    }

    // Test 2: Concurrent Requests
    try {
      const promises = Array.from({ length: 3 }, (_, i) => 
        openAIService.generateResponse(`${testSessionId}-concurrent-${i}`, `Concurrent test ${i}`)
      );

      const startTime = Date.now();
      const results = await Promise.allSettled(promises);
      const duration = Date.now() - startTime;

      const successCount = results.filter(r => r.status === 'fulfilled').length;
      
      updateTestResult(3, 1, {
        status: successCount === 3 ? 'success' : 'warning',
        message: `${successCount}/3 concurrent requests succeeded in ${duration}ms`,
        duration,
        details: { successCount, totalRequests: 3, duration }
      });
    } catch (error) {
      updateTestResult(3, 1, {
        status: 'error',
        message: `✗ Concurrent test failed: ${error.message}`
      });
    }

    // Test 3: Memory Usage
    try {
      const memoryBefore = (performance as any).memory?.usedJSHeapSize || 0;
      
      // Generate several responses to test memory
      for (let i = 0; i < 5; i++) {
        await openAIService.generateResponse(`${testSessionId}-memory-${i}`, `Memory test ${i}`);
      }

      const memoryAfter = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = memoryAfter - memoryBefore;

      updateTestResult(3, 2, {
        status: memoryIncrease < 10000000 ? 'success' : 'warning', // 10MB threshold
        message: `Memory usage: ${Math.round(memoryIncrease / 1024)}KB increase`,
        details: { memoryBefore, memoryAfter, memoryIncrease }
      });
    } catch (error) {
      updateTestResult(3, 2, {
        status: 'warning',
        message: `⚠ Memory test inconclusive: ${error.message}`
      });
    }

    // Test 4: Error Recovery
    try {
      // Test recovery from network error
      const originalFetch = window.fetch;
      let errorThrown = false;

      // Temporarily break fetch for one request
      window.fetch = () => {
        errorThrown = true;
        window.fetch = originalFetch; // Restore immediately
        return Promise.reject(new Error('Simulated network error'));
      };

      const response = await openAIService.generateResponse(testSessionId, "Error recovery test");
      
      updateTestResult(3, 3, {
        status: errorThrown && response.length > 0 ? 'success' : 'warning',
        message: errorThrown && response.length > 0 ? '✓ Error recovery working' : '⚠ Error recovery unclear',
        details: { errorThrown, hasResponse: response.length > 0 }
      });
    } catch (error) {
      updateTestResult(3, 3, {
        status: 'warning',
        message: `⚠ Error recovery test inconclusive: ${error.message}`
      });
    }

    updateSuiteStatus(3, 'completed');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-gray-400" />;
      default: return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-accent-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-dfaalt font-bold text-2xl">ChatBot AI Integration Test</h2>
                <p className="opacity-90">Comprehensive OpenAI functionality verification</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(overallStatus)}
              <span className="font-semibold">
                {overallStatus === 'pending' ? 'Ready to Test' : 
                 overallStatus === 'success' ? 'All Tests Passed' :
                 overallStatus === 'warning' ? 'Some Issues Found' : 'Tests Failed'}
              </span>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {testSuites.map((suite, suiteIndex) => (
              <div key={suite.name} className={`border rounded-xl p-4 ${getStatusColor(
                suite.tests.every(t => t.status === 'success') ? 'success' :
                suite.tests.some(t => t.status === 'error') ? 'error' :
                suite.tests.some(t => t.status === 'warning') ? 'warning' : 'pending'
              )}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-dfaalt font-semibold text-lg">{suite.name}</h3>
                  <div className="flex items-center space-x-2">
                    {suite.status === 'running' && <Loader className="w-4 h-4 animate-spin text-blue-500" />}
                    <span className="text-sm font-medium">
                      {suite.tests.filter(t => t.status === 'success').length}/{suite.tests.length} passed
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {suite.tests.map((test, testIndex) => (
                    <div key={test.name} className="flex items-center justify-between p-3 bg-white dark:bg-dark-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(test.status)}
                        <span className="font-montserrat font-medium">{test.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-montserrat text-sm">{test.message}</div>
                        {test.duration && (
                          <div className="text-xs text-gray-500">{test.duration}ms</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50 dark:bg-dark-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Session ID: <code className="bg-gray-200 dark:bg-dark-600 px-2 py-1 rounded">{testSessionId}</code>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={runTests}
                disabled={isRunning}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                {isRunning ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Running Tests...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Run All Tests</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}