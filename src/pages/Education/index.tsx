import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';
import { BookOpen, Video, Download, Info, X } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  booking_button_text: string;
  booking_link: string;
  info?: string;
}

const Education: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const memberData = state.memberData;
  const MemberStatusCode = memberData?.MemberStatusCode || '';

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      title: 'Wealth Mastery Online Course',
      description: 'Unlock the secrets to creating, protecting, and building wealth.',
      duration: '2 hours',
      level: 'Beginner',
      image: 'https://backoffice.treoc.com/data/archive/images/courses/wealth_mastery.png',
      booking_button_text: 'Start Learning',
      booking_link: 'https://portal.wealthmastersclub.com/legacy/education/course/intro',
      info: `<p>Unlock the secrets to <strong>creating, protecting, and building wealth</strong> with <strong>Edition 8</strong> of our <strong>Wealth Mastery System</strong>. This <strong>16-chapter course</strong> is designed to equip you with the essential knowledge and strategies to achieve true financial independence.</p>
                <p>With a focus on <strong>relevant and recent statistics, real-world calculations, and practical insights</strong>, you'll gain a deep understanding of:</p>
                <ul>
                  <li><strong>Mastering financial fundamentals</strong> – Cash flow, wealth protection, and smart investing</li>
                  <li><strong>Building a powerful wealth-creation structure</strong> – Business structuring, trusts, and taxation</li>
                  <li><strong>Investing in property</strong> – Market insights, financing, and portfolio management</li>
                  <li><strong>Maximising your financial growth</strong> – Advanced strategies backed by the latest data</li>
                  <li><p>Whether you're just starting or refining your financial strategy, this course is your <strong>ultimate roadmap to success</strong>.</p></li>
                </ul>
                <p><strong>Start your journey to financial freedom today!</strong></p>`
    },
    {
      id: 2,
      title: 'Business Mastery Online Course',
      description: 'A step-by-step guide to managing and growing a successful business.',
      duration: '2 hours',
      level: 'Beginner',
      image: 'https://backoffice.treoc.com/data/archive/images/courses/business_mastery.png',
      booking_button_text: 'Start Learning',
      booking_link: 'https://portal.wealthmastersclub.com/legacy/education/course/business-mastery-online-course',
      info: `<p>The Business Mastery Online Course is a step-by-step guide to managing and growing a successful business. It provides practical strategies for improving profitability, streamlining operations, and building a scalable enterprise.</p>
                <h3>What's Included:</h3>
                <ul>
                  <li>6 modules covering strategy, finance, marketing, operations, and leadership</li>
                  <li>In-depth, real-world insights equivalent to two full-length business books</li>
                  <li>Flexible learning with self-paced study</li>
                  <li>Graduation certificate upon completion</li>
                  <li>Exclusive access to the Business Masters Network for top graduates</li>
                  <li>Platinum Elite Members receive full course access and lifetime updates</li>
                </ul>
                <p>Designed for entrepreneurs, business owners, and corporate leaders, this course provides a clear roadmap to success. Start today.</p>`
    },
    {
      id: 3,
      title: 'Network Marketing Course',
      description: 'Make connections that translate into real business results.',
      duration: '4 hours',
      level: 'Intermediate',
      image: 'https://backoffice.treoc.com/data/archive/images/courses/business_networking.png',
      booking_button_text: 'Start Learning',
      booking_link: 'https://portal.wealthmastersclub.com/legacy/education/course/network-marketing-course',
      info: ''
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Land Expropriation Research Paper',
      link: '5b85f81f126ba.pdf'
    },
    {
      id: 2,
      title: 'Property Valuation Act',
      link: '5b85f7dc73a4f.pdf'
    },
    {
      id: 3,
      title: 'The ALA Method',
      link: 'https://backoffice.treoc.com/data/archive/documents/381/5b85f7a89290b.pdf'
    },
    {
      id: 4,
      title: 'TRUST PROPERTY CONTROL ACT 57 OF 1988',
      link: '5b85f73a4d52d.pdf'
    }
  ];

  const handleDocumentLinkClick = (link: string): void => {
    if (link === '#') return;

    if (MemberStatusCode.includes('Platinum') || MemberStatusCode.includes('Premium')) {
      if (link.startsWith('http')) {
        window.open(link, '_blank');
        return;
      }

      const baseURL = `https://backoffice.treoc.com/data/archive/documents/381/${link}`;
      window.open(baseURL, '_blank');
    }
  };

  const handleInfoClick = (course: Course): void => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCourseClick = (): void => {
    navigate('/online-courses');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0d203b] font-[var(--font-family-heading)]">
              Education
            </h1>
            <p className="text-gray-600 mt-2">Access our comprehensive courses and resources</p>
          </div>

          {/* Educational Resources Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-6 text-[#0d203b]">Educational Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="border rounded-lg overflow-hidden relative hover:shadow-lg transition">
                  {course.info && (
                    <button
                      onClick={() => handleInfoClick(course)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10"
                      aria-label="More Info"
                    >
                      <Info className="h-6 w-6" />
                    </button>
                  )}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-[#0d203b]">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Video className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.level}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCourseClick()}
                      className={`w-full px-4 py-2 text-white rounded-lg transition ${
                        course.booking_link === '#' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {course.booking_button_text}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources & Publications Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#0d203b]">Resources & Publications</h2>
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Download className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDocumentLinkClick(resource.link)}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl relative max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close Modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedCourse.info || '' }} />
          </div>
        </div>
      )}

      <WMCFooter />
    </div>
  );
};

export default Education;
