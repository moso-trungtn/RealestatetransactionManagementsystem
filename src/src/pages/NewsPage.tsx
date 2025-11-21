import { useState } from 'react';
import { Navbar, NavItem } from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Calendar, User, TrendingUp, Building2, DollarSign } from 'lucide-react';
import { useWebsiteConfig } from '../../contexts/WebsiteConfigContext';

interface NewsPageProps {
  onNavigate: (view: string) => void;
  onViewProfile: () => void;
}

interface NewsArticle {
  id: string;
  title: string;
  category: 'Market Update' | 'Industry News' | 'Tips & Tricks' | 'Company News';
  date: string;
  author: string;
  excerpt: string;
  image: string;
  readTime: string;
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'California Housing Market Shows Strong Growth in Q4 2024',
    category: 'Market Update',
    date: 'Nov 20, 2024',
    author: 'Sarah Johnson',
    excerpt: 'The California real estate market continues to show resilience with a 12% increase in median home prices compared to last quarter...',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbWFya2V0fGVufDF8fHx8MTc2MTY3NTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: '10 Tips for First-Time Home Buyers in 2024',
    category: 'Tips & Tricks',
    date: 'Nov 18, 2024',
    author: 'Michael Chen',
    excerpt: 'Navigating the home buying process can be overwhelming. Here are essential tips to help first-time buyers make informed decisions...',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxob21lJTIwYnV5aW5nfGVufDF8fHx8MTc2MTY3NTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'New Mortgage Rates: What You Need to Know',
    category: 'Industry News',
    date: 'Nov 15, 2024',
    author: 'Jennifer Martinez',
    excerpt: 'Federal Reserve announces new policy changes affecting mortgage rates. Learn how this impacts your home financing options...',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3J0Z2FnZSUyMGZpbmFuY2V8ZW58MXx8fHwxNzYxNjc1MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '4 min read'
  },
  {
    id: '4',
    title: 'LoanFactory Expands Services to Northern California',
    category: 'Company News',
    date: 'Nov 12, 2024',
    author: 'David Thompson',
    excerpt: 'We are excited to announce our expansion into Northern California, bringing our award-winning services to more communities...',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjE2NzUzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '3 min read'
  },
  {
    id: '5',
    title: 'Understanding Property Valuation in Today\'s Market',
    category: 'Tips & Tricks',
    date: 'Nov 10, 2024',
    author: 'Emily Rodriguez',
    excerpt: 'Learn the key factors that determine property values and how to accurately assess your home\'s worth in the current market...',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMHZhbHVhdGlvbnxlbnwxfHx8fDE3NjE2NzUzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '6 min read'
  },
  {
    id: '6',
    title: 'Commercial Real Estate Trends for 2025',
    category: 'Market Update',
    date: 'Nov 8, 2024',
    author: 'Robert Kim',
    excerpt: 'Industry experts predict major shifts in commercial real estate. Discover the trends that will shape the market in 2025...',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb21tZXJjaWFsJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxNjc1MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '8 min read'
  }
];

export function NewsPage({ onNavigate, onViewProfile }: NewsPageProps) {
  const { config } = useWebsiteConfig();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleNavigation = (item: NavItem) => {
    if (item === 'home') {
      onNavigate('dashboard');
    } else if (item === 'transactions') {
      onNavigate('dashboard');
    } else if (item === 'news') {
      // Already on news page
    } else if (item === 'demoform') {
      onNavigate('demoform');
    } else if (item === 'settings') {
      onNavigate('settings');
    } else if (item === 'templates') {
      // Handle templates navigation
    }
  };

  const categories = ['all', 'Market Update', 'Industry News', 'Tips & Tricks', 'Company News'];

  const filteredNews = selectedCategory === 'all' 
    ? mockNews 
    : mockNews.filter(article => article.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Market Update':
        return <TrendingUp className="h-4 w-4" />;
      case 'Industry News':
        return <Building2 className="h-4 w-4" />;
      case 'Company News':
        return <Building2 className="h-4 w-4" />;
      case 'Tips & Tricks':
        return <DollarSign className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Market Update':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Industry News':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'Company News':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Tips & Tricks':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeItem="news"
        onNavigate={handleNavigation}
        onProfileClick={onViewProfile}
        notificationCount={3}
      />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">News & Updates</h1>
          <p className="text-gray-600">Stay informed with the latest real estate news, market updates, and industry insights</p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
              style={
                selectedCategory === category
                  ? { backgroundColor: config.primaryColor }
                  : {}
              }
            >
              {category === 'all' ? 'All News' : category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="secondary" 
                    className={`${getCategoryColor(article.category)} flex items-center gap-1`}
                  >
                    {getCategoryIcon(article.category)}
                    {article.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2 text-lg">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {article.author}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}
