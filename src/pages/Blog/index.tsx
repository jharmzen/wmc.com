import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import { getLatestTenArticles } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter, Loader } from '../../components';
import { generateArticleSlug } from '../../lib/utils';
import type { Article } from '../../types';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      console.log('Blog: Starting fetchArticles', { memberData: state.memberData });

      try {
        setLoading(true);
        const siteKey = import.meta.env.VITE_SITE_KEY || '';
        const memberCode = state.memberData?.MemberCode || '';
        console.log('Blog: Calling getLatestTenArticles', { siteKey, memberCode });
        const fetchedArticles = await getLatestTenArticles(siteKey, memberCode);
        console.log('Blog: Received articles', fetchedArticles);
        setArticles(fetchedArticles);
        setFilteredArticles(fetchedArticles);
      } catch (err) {
        console.error('Blog: Error fetching articles', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [state.memberData]);

  // Filter articles based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.ShortExcerpt && article.ShortExcerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredArticles(filtered);
    }
  }, [searchTerm, articles]);

  const handleArticleClick = (article: Article) => {
    const slug = generateArticleSlug(article.Title);
    navigate(`/article/${slug}`);
  };

  const extractImageFromBody = (body: string): string | null => {
    const imgMatch = body.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch && imgMatch[1]) {
      // Fix relative paths
      let imgSrc = imgMatch[1];
      if (imgSrc.startsWith('../..')) {
        const apiRootDomain = import.meta.env.VITE_API_ROOT_DOMAIN || '';
        imgSrc = imgSrc.replace('../..', apiRootDomain);
      }
      return imgSrc;
    }
    return null;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        </div>
        <WMCFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Articles</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
        <WMCFooter />
      </div>
    );
  }

  const fallbackImage = "https://backoffice.treoc.com/data/archive/images/default-article.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0d203b] mb-4 font-[var(--font-family-heading)]">
            Latest Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Stay informed with the latest insights on wealth building, investment strategies, and financial planning.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No articles found matching your search.' : 'No articles available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const imageUrl = article.OgImage || extractImageFromBody(article.Body);

              return (
                <article
                  key={article.ArticleId}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col h-full"
                  onClick={() => handleArticleClick(article)}
                >
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageUrl || fallbackImage}
                      alt={article.Title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors font-[var(--font-family-heading)]">
                      {article.Title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                      {article.ShortExcerpt || article.LongExcerpt?.replace(/<[^>]+>/g, '').substring(0, 150) + '...'}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{article.Author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(article.CreateDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{getReadingTime(article.Body)} min read</span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Read Article
                      </span>
                      <ArrowRight className="h-5 w-5 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <WMCFooter />
    </div>
  );
};

export default Blog;
