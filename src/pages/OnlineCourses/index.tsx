import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';
import parse from 'html-react-parser';
import { X, ArrowLeft } from 'lucide-react';
import { getCourseModules, getCourseDetails, emailChapter, getCourseTest, submitCourseTest } from '../../services/api';

const allowedCodes = ['MS-D', 'MS-EXEC', 'MS-PREM', 'MS-PE', 'MS-P', 'MS-PG', 'MS-PS'];

interface CourseModule {
  ModuleId: number;
  Caption: string;
  Intro: string;
  TestPassed: boolean;
}

interface CourseDetails {
  Caption: string;
  OnlineCourseModuleId: number;
  data: Array<{
    FileName: string;
    Url: string;
  }>;
}

interface TestQuestion {
  Id: number;
  Number: number;
  Question: string;
  PossibleAnswers: string[];
  LatestTestAnswer: number | string;
  AnswerPassed: number | string;
}

interface CourseConfig {
  id: number;
  title: string;
  description: string;
  restricted: boolean;
}

interface SurveyQuestion {
  Question: string;
  TypeCode: 'SURV-MC' | 'SURV-SUGG';
  TypeDescription: string;
  Options?: Record<string, string>;
}

const courses: CourseConfig[] = [
  { id: 6, title: 'Wealth Mastery System', description: 'Main Course', restricted: false },
  { id: 9, title: 'Business Mastery', description: 'Members Only', restricted: true },
  { id: 8, title: 'Consortium Setup', description: 'Members Only', restricted: true },
  { id: 7, title: 'Network Marketing', description: 'Members Only', restricted: true },
];

const OnlineCourses: React.FC = () => {
  const { state } = useAuth();
  const memberData = state.memberData;
  const memberCode = memberData?.MemberCode || '';
  const memberStatusCode = memberData?.MemberStatusCode || '';
  const siteKey = import.meta.env.VITE_SITE_KEY;
  const hasAccess = allowedCodes.includes(memberStatusCode);

  const [selectedCourse, setSelectedCourse] = useState<number>(6);
  const [courseModules, setCourseModules] = useState<CourseModule[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<CourseDetails | null>(null);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showChapters, setShowChapters] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [surveyQuestions, setSurveyQuestions] = useState<Record<string, SurveyQuestion> | null>(null);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const course = courses.find(c => c.id === selectedCourse);
        if (course && (!course.restricted || hasAccess)) {
          const response = await getCourseModules(selectedCourse, memberCode, siteKey);
          if (response.Success && response.Msg?.data) {
            setCourseModules(response.Msg.data);
          }
        }
      } catch (err) {
        setError('Failed to load course modules');
        console.error('Error fetching modules:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedCourse !== 6 || showChapters) {
      fetchModules();
    }
  }, [selectedCourse, memberCode, siteKey, hasAccess, showChapters]);

  const handleCourseSelect = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (course && (!course.restricted || hasAccess)) {
      setSelectedCourse(courseId);
      setShowChapters(false);
    }
  };

  const handleOpenCourse = () => {
    setShowChapters(true);
  };

  const handleViewDocumentation = async (moduleId: number) => {
    try {
      const details = await getCourseDetails(moduleId, memberCode, siteKey);
      if (details.Success) {
        setSelectedModule(details.Msg);
        setShowDetailsModal(true);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleEmailChapter = async (moduleId: number) => {
    try {
      const response = await emailChapter(moduleId, memberCode, siteKey);
      if (response.Success) {
        setNotification({ message: 'Chapter has been emailed to you successfully!', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        setNotification({ message: 'Failed to email chapter. Please try again.', type: 'error' });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error('Error emailing chapter:', error);
      setNotification({ message: 'An error occurred while emailing the chapter.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const canAccessTest = (moduleId: number): boolean => {
    const currentModuleIndex = courseModules.findIndex(m => m.ModuleId === moduleId);
    if (currentModuleIndex === 0) return true;

    const previousModules = courseModules.slice(0, currentModuleIndex);
    return previousModules.every(module => module.TestPassed);
  };

  const handleTestClick = async (moduleId: number) => {
    if (!canAccessTest(moduleId)) {
      setNotification({
        message: 'You must pass the tests for all previous modules before accessing this test.',
        type: 'error',
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      const response = await getCourseTest(moduleId, memberCode, siteKey);
      if (response.Success) {
        setTestQuestions(response.Msg.data.Questions);
        setTestResult('');
        if (response.Msg.data.Survey && Object.keys(response.Msg.data.Survey).length > 0) {
          const allSurveyQuestions: Record<string, SurveyQuestion> = {};
          Object.entries(response.Msg.data.Survey).forEach(([, surveyData]: [string, unknown]) => {
            const data = surveyData as { Questions?: Record<string, SurveyQuestion> };
            if (data.Questions) {
              Object.assign(allSurveyQuestions, data.Questions);
            }
          });
          setSurveyQuestions(Object.keys(allSurveyQuestions).length > 0 ? allSurveyQuestions : null);
        } else {
          setSurveyQuestions(null);
        }
        setCurrentModuleId(moduleId);
        setShowTestModal(true);
      }
    } catch (error) {
      console.error('Error fetching test:', error);
      setNotification({ message: 'Failed to load test and survey.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSurveyAnswerSelect = (questionId: string, answer: string) => {
    setSurveyAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleTestSubmit = async (moduleId: number) => {
    try {
      const payload = {
        testAnswers: answers,
        surveyAnswers: surveyQuestions ? surveyAnswers : undefined,
      };
      const response = await submitCourseTest(moduleId, payload, memberCode, siteKey);
      if (response.Success) {
        setTestResult(response.Msg[0]);
        setNotification({ message: 'Test and survey submitted successfully!', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
        const updatedModules = await getCourseModules(selectedCourse, memberCode, siteKey);
        if (updatedModules.Success && updatedModules.Msg?.data) {
          setCourseModules(updatedModules.Msg.data);
        }
      } else {
        setNotification({ message: 'Failed to submit test and survey.', type: 'error' });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      setNotification({ message: 'An error occurred while submitting.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const parseIntroToHtml = (intro: string): React.ReactNode => {
    if (!intro) return 'No introduction available';
    const lines = intro.split('. ').map((line) => `<p>${line}</p>`).join('');
    return parse(lines);
  };

  const parseQuestionToHtml = (question: string): React.ReactNode => {
    if (!question) return 'No question available';
    const lines = question.split('. ').map((line) => `${line}`).join('');
    return parse(lines);
  };

  const parseAnswerToHtml = (question: string): React.ReactNode => {
    if (!question) return 'No answer available';
    const lines = question.split('. ').map((line) => `<p>${line}</p>`).join('');
    return parse(lines);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0d203b] font-[var(--font-family-heading)]">
              Online Courses
            </h1>
            <p className="text-gray-600 mt-2">Access our comprehensive online learning platform</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            {notification && (
              <div
                className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 ${
                  notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {notification.message}
              </div>
            )}

            {(selectedCourse === 6 && !showChapters) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className={`p-6 rounded-lg border-2 ${
                      course.restricted && !hasAccess
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer hover:border-blue-500'
                    } ${selectedCourse === course.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => handleCourseSelect(course.id)}
                  >
                    <h3 className="font-semibold mb-2 text-[#0d203b]">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.description}</p>
                    {course.restricted && !hasAccess && (
                      <p className="text-xs text-red-500 mt-2">Requires premium membership</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : (
              <>
                {selectedCourse === 6 && !showChapters ? (
                  <div className="space-y-6 text-center">
                    <p>Join NOW and get started!</p>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-red-600">RETIRE EARLIER & WEALTHIER</h3>
                      <img
                        src="https://backoffice.treoc.com/data/archive/documents/images/5fa798abeb2c1.jpg"
                        alt="Wealth Mastery Online Course"
                        className="mx-auto my-4"
                        style={{ width: '390px', height: '205px' }}
                      />
                    </div>
                    <div className="bg-gray-800 text-white p-8 text-center">
                      <h5 className="text-sm uppercase mb-4">
                        Our seminars, webinars and main online course are now all integrated in one<br />
                        Super Online Training Course
                      </h5>
                      <h1 className="text-3xl font-bold mb-4">WEALTH MASTERY ONLINE COURSE</h1>
                      <h5 className="text-sm uppercase">Supported by ALL MAJOR BANKS</h5>
                    </div>
                    <h3 className="text-xl font-bold text-[#0d203b]">MEMBERSHIP</h3>
                    <p>We are excited to guide you along your wealth creation journey.</p>
                    <p>
                      New Family Memberships are exclusively available to anyone who attends our full-day in-person Seminar in a city near you. If you are unable to attend, please send us an email request to{' '}
                      <a href="mailto:services@wealthmastersclub.com" className="text-blue-600">
                        services@wealthmastersclub.com
                      </a>{' '}
                      for more information.
                    </p>
                    <p>
                      By joining our exclusive <strong>INVESTOR CLUB</strong>, Est.1996, you are investing in yourself. You will get access to the ancient secrets and methods of the real rich.
                    </p>
                    <p>This will undoubtedly be the best investment of your life, so be prepared for spectacular returns on this investment.</p>
                    <img
                      src="https://backoffice.treoc.com/data/archive/documents/images/5faa0ce7c7b83.png"
                      alt="Wealth Mastery Online Course"
                      className="mx-auto"
                      style={{ width: '275px', height: '275px' }}
                    />
                    <p className="bg-yellow-200 p-2">
                      <strong>
                        If you are not 100% satisfied after your consultation with our Wealth Officer, then you can request a full refund of your membership fee, no questions asked – valid for 30 days after signing up.
                      </strong>
                    </p>
                    <p>
                      <strong>DON'T FORGET:</strong>
                    </p>
                    <p>A PORTION OF THE MONTHLY FEES IS PAID BACK TO YOU IN CLUB UNITS EVERY MONTH AS A LOYALTY REWARD!</p>
                    <p>
                      Members can redeem their Club Units in cash if they wish.<br />
                      (Terms and Conditions apply)
                    </p>
                    <br />
                    <p>
                      By joining our exclusive <strong>INVESTOR CLUB</strong>, Est.1996, you are investing in yourself. You will get access to the ancient secrets and methods of the real rich.
                    </p>
                    <p>
                      In addition to the multitude of benefits listed below, you will also get services to the value of almost <strong>R19,000</strong> at no cost just by signing up today. Scroll to the bottom of this page for more info.
                    </p>
                    <p>
                      Our <strong>Wealth Mastery Events</strong> will teach you how to purchase houses with other people's money, as well as utilising tenants for the purpose of repayment. You will also learn how to protect and manage this wealth directly in a specialised Trust structure.
                    </p>
                    <h3 className="text-xl font-bold text-[#0d203b]">AFTER SIGNING UP AS A MEMBER, LOG IN ON THIS WEBSITE AND PROCEED TO THE COURSE</h3>
                    <h2>
                      <a
                        href="#"
                        id="open-course-button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenCourse();
                        }}
                        className="text-2xl font-bold text-blue-900 bg-yellow-300 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
                      >
                        HERE
                      </a>
                    </h2>
                  </div>
                ) : selectedCourse === 6 && showChapters ? (
                  <div className="space-y-6">
                    <button
                      onClick={() => setShowChapters(false)}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back to Courses
                    </button>
                    <h2 className="text-2xl font-bold text-[#0d203b]">
                      {courses.find(c => c.id === selectedCourse)?.title}
                    </h2>
                    <div className="space-y-4">
                      {courseModules.map((module) => (
                        <div key={module.ModuleId} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-[#0d203b]">{parseIntroToHtml(module.Caption)}</h3>
                              <p className="text-sm text-gray-600">{parseIntroToHtml(module.Intro)}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewDocumentation(module.ModuleId)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                              >
                                View Documentation
                              </button>
                              <button
                                onClick={() => handleTestClick(module.ModuleId)}
                                disabled={!canAccessTest(module.ModuleId)}
                                className={`px-4 py-2 rounded transition ${
                                  module.TestPassed
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : canAccessTest(module.ModuleId)
                                    ? 'bg-yellow-500 hover:bg-yellow-600'
                                    : 'bg-gray-400 cursor-not-allowed'
                                } text-white`}
                              >
                                {module.TestPassed ? 'Test Passed' : 'Test'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <button
                      onClick={() => {
                        setSelectedCourse(6);
                        setShowChapters(false);
                        setCourseModules([]);
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back to Courses
                    </button>
                    <h2 className="text-2xl font-bold text-[#0d203b]">
                      {courses.find(c => c.id === selectedCourse)?.title}
                    </h2>
                    <div className="space-y-4">
                    {courseModules.map((module) => (
                      <div key={module.ModuleId} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-[#0d203b]">{module.Caption}</h3>
                            <p className="text-sm text-gray-600">{module.Intro}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewDocumentation(module.ModuleId)}
                              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                              View Documentation
                            </button>
                            <button
                              onClick={() => handleTestClick(module.ModuleId)}
                              disabled={!canAccessTest(module.ModuleId)}
                              className={`px-4 py-2 rounded transition ${
                                module.TestPassed
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : canAccessTest(module.ModuleId)
                                  ? 'bg-yellow-500 hover:bg-yellow-600'
                                  : 'bg-gray-400 cursor-not-allowed'
                              } text-white`}
                            >
                              {module.TestPassed ? 'Test Passed' : 'Test'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Documentation Modal */}
            {showDetailsModal && selectedModule && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-[#0d203b]">{selectedModule.Caption}</h3>
                    <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  {selectedModule.data.map((file, index) => (
                    <div key={index} className="mb-4">
                      <p className="mb-2">{file.FileName}</p>
                      <div className="flex space-x-2">
                        <a
                          href={file.Url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          View Document
                        </a>
                        <button
                          onClick={() => handleEmailChapter(selectedModule.OnlineCourseModuleId)}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                          Email Chapter to Me
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test Modal */}
            {showTestModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-[#0d203b]">Chapter Test</h3>
                    <button onClick={() => setShowTestModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  {testResult ? (
                    <div dangerouslySetInnerHTML={{ __html: testResult }} />
                  ) : (
                    <>
                      {/* Test Questions */}
                      {testQuestions.map((question) => (
                        <div key={question.Id} className="mb-6" style={{ padding: '0px 0' }}>
                          <p className="font-medium mb-2">
                            <b>{question.Number}. {parseQuestionToHtml(question.Question)}</b>
                          </p>
                          <div className="space-y-2">
                            <input
                              type="radio"
                              id={`answer_${question.Id}_0`}
                              name={`question-${question.Id}`}
                              value="0"
                              checked={answers[question.Id] === undefined || answers[question.Id] === 0}
                              onChange={() => handleAnswerSelect(question.Id, 0)}
                              className="hidden"
                            />
                            {question.PossibleAnswers.map((answer, k) => {
                              const answerIndex = k + 1;
                              const isLatestAnswer = parseInt(String(question.LatestTestAnswer)) === answerIndex;
                              const colorClass =
                                parseInt(String(question.LatestTestAnswer)) > 0 && isLatestAnswer
                                  ? parseInt(String(question.AnswerPassed)) > 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                  : 'text-blue-600';

                              return (
                                <label key={k} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id={`answer_${question.Id}_${answerIndex}`}
                                    name={`question-${question.Id}`}
                                    value={answerIndex}
                                    checked={answers[question.Id] === answerIndex}
                                    onChange={() => handleAnswerSelect(question.Id, answerIndex)}
                                    className="form-radio h-5 mt-0"
                                  />
                                  <span className={`${colorClass} pl-4`}>{parseAnswerToHtml(answer)}</span>
                                </label>
                              );
                            })}
                          </div>
                          <br />
                          <br />
                        </div>
                      ))}

                      {/* Survey Section */}
                      {surveyQuestions && (
                        <div className="mt-8 border-t pt-6">
                          <h4 className="text-lg font-semibold mb-4 text-[#0d203b]">Course Survey</h4>
                          {Object.entries(surveyQuestions).map(([id, q]: [string, SurveyQuestion]) => (
                            <div key={id} className="mb-6">
                              <p className="font-medium mb-2">{q.Question}</p>
                              {q.TypeCode === 'SURV-MC' && q.Options ? (
                                <div className="space-y-2">
                                  {Object.entries(q.Options).map(([key, value]) => (
                                    <label key={key} className="flex items-center space-x-2">
                                      <input
                                        type="radio"
                                        name={`survey-${id}`}
                                        checked={surveyAnswers[id] === value}
                                        onChange={() => handleSurveyAnswerSelect(id, value)}
                                        className="form-radio"
                                      />
                                      <span>{value}</span>
                                    </label>
                                  ))}
                                </div>
                              ) : q.TypeCode === 'SURV-SUGG' ? (
                                <textarea
                                  className="w-full p-2 border rounded"
                                  rows={4}
                                  value={surveyAnswers[id] || ''}
                                  onChange={(e) => handleSurveyAnswerSelect(id, e.target.value)}
                                  placeholder="Write your opinion here..."
                                />
                              ) : null}
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => handleTestSubmit(currentModuleId!)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Submit Test
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default OnlineCourses;
