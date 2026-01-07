import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';
import { getArticleByTitle } from '../../services/api';
import { WMCHeader, WMCFooter, Loader } from '../../components';
import type { Article } from '../../types';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!slug) {
          setError('No article specified');
          return;
        }

        // Try to fetch by slug (convert slug back to potential title)
        const titleFromSlug = slug.replace(/-/g, ' ');
        const siteKey = import.meta.env.VITE_SITE_KEY || '';
        const memberCode = '';
        const articleData = await getArticleByTitle(titleFromSlug, siteKey, memberCode);

        if (articleData) {
          setArticle(articleData);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (body: string): number => {
    const wordsPerMinute = 200;
    const wordCount = body.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Fix relative image paths in the article body and handle encoding issues
  const processArticleBody = (body: string): string => {
    const apiRootDomain = import.meta.env.VITE_API_ROOT_DOMAIN || '';

    let processedBody = body
      .replace(/..\/..\/data\/archive\//g, `${apiRootDomain}/data/archive/`)
      .replace(/href=""/g, 'href=')
      .replace(/"">/g, '">')
      // Fix common emoji encoding issues - specifically for link emoji
      .replace(/\?\?\?\?/g, '🔗')
      .replace(/ð\?\?\?/g, '🔗')
      .replace(/â\?\?\?/g, '🔗')
      .replace(/\uFFFD\uFFFD\uFFFD\uFFFD/g, '🔗')
      // Fix other common encoding issues
      .replace(/â€™/g, "'")
      .replace(/â€œ/g, '"')
      .replace(/â€\x9D/g, '"')
      .replace(/â€¦/g, '...')
      .replace(/â€"/g, '–')
      .replace(/â€"/g, '—');

    // Additional fallback: if we still see question marks before text that should be emoji
    processedBody = processedBody.replace(/\?\?\?\?\s*(Events\s*\|\s*Wealth\s*Masters)/g, '🔗 $1');

    // Sanitize HTML with DOMPurify
    return DOMPurify.sanitize(processedBody, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'div', 'span', 'table', 'thead', 'tbody', 'tr', 'td', 'th'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel', 'width', 'height'],
    });
  };

  const handleBack = () => {
    navigate('/blog');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="flex justify-center items-center min-h-[60vh] pt-20">
          <Loader />
        </div>
        <WMCFooter />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {error || 'Article not found'}
            </h2>
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </button>
          </div>
        </div>
        <WMCFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </button>

        {/* Article Header */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Article Content */}
          <div className="p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight font-[var(--font-family-heading)]">
              {article.Title}
            </h1>

            {/* Article Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{article.Author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.CreateDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{getReadingTime(article.Body)} min read</span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-[var(--font-family-heading)] prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-lg prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{
                __html: processArticleBody(article.Body)
              }}
            />

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 font-[var(--font-family-heading)]">
                  About the Author
                </h3>
                <p className="text-blue-800">
                  <strong>{article.Author}</strong> - Contributing expert at Wealth Masters Club
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-br from-[#0d203b] to-[#4782b5] rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4 font-[var(--font-family-heading)]">
            Want More Insights?
          </h3>
          <p className="text-blue-100 mb-6">
            Explore more articles and join our community of wealth builders.
          </p>
          <button
            onClick={handleBack}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Browse All Articles
          </button>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default ArticleDetail;
