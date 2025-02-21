import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, Bookmark, Share2, Moon, Sun,
  Clock, Heart, MessageSquare, ArrowUpRight,
  BookOpen, Star, Share, Calendar, BookMarked, X
} from 'lucide-react';

const magazineData = {
  title: "Science Explorer",
  issue: "July 2025",
  featured: [
    {
      id: 1,
      name: "Alan Turing",
      title: "Father of Modern Computer Science",
      field: "computer",
      quote: "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human.",
      inventions: ["Turing machines", "Cryptanalysis of enigma", "The Turing test"],
      applications: ["Modern computing", "Secure banking", "AI development"],
      readTime: 8,
      likes: 1240,
      comments: 89,
      shares: 456,
      featured: true,
      publishDate: "2025-07-01",
      abstract: "Exploring the revolutionary contributions of Alan Turing to computer science and artificial intelligence."
    },
    {
      id: 2,
      name: "Nikola Tesla",
      title: "The Father of Modern Electricity",
      field: "electricity",
      quote: "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration.",
      inventions: ["AC power", "Tesla coil", "Radio foundations"],
      applications: ["Electric motors", "Radio", "Wireless tech"],
      readTime: 6,
      likes: 890,
      comments: 67,
      shares: 234,
      featured: true,
      publishDate: "2025-07-02",
      abstract: "Discovering the genius of Nikola Tesla and his contributions to modern electrical systems."
    }
  ],
  latest: [
    {
      id: 3,
      name: "Marie Curie",
      title: "Pioneer of Radioactivity Research",
      field: "physics",
      quote: "Nothing in life is to be feared, it is only to be understood.",
      inventions: ["Radium isolation", "Mobile X-ray units", "Radioactivity theory"],
      applications: ["Cancer treatment", "X-ray technology", "Nuclear medicine"],
      readTime: 7,
      likes: 756,
      comments: 45,
      shares: 178,
      featured: false,
      publishDate: "2025-07-03",
      abstract: "Understanding the groundbreaking research of Marie Curie in radioactivity and its modern applications."
    }
  ]
};

const ArticleCard = ({ article, onBookmark, isBookmarked, onShare, onExpand, isExpanded }) => (
  <Card className="transform transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {article.name}
            </h2>
            {article.featured && (
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {article.title}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(article.id)}
          >
            {isBookmarked ? (
              <BookMarked className="h-5 w-5 text-yellow-500" />
            ) : (
              <Bookmark className="h-5 w-5 text-gray-400" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(article)}
          >
            <Share className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
      </div>

      <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {article.field}
      </Badge>

      <blockquote className="my-4 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 italic">
        {article.quote}
      </blockquote>

      <div className={`space-y-4 transition-all duration-300 ${
        isExpanded ? 'block' : 'hidden'
      }`}>
        <div>
          <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Key Inventions
          </h3>
          <ul className="mt-2 space-y-1">
            {article.inventions.map((invention, idx) => (
              <li key={idx} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                {invention}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Applications
          </h3>
          <ul className="mt-2 space-y-1">
            {article.applications.map((application, idx) => (
              <li key={idx} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                {application}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime}m
            </span>
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1 text-red-500" />
              {article.likes}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
              {article.comments}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExpand(article.id)}
            className="flex items-center gap-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

export default function InteractiveMagazine() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('featured');
  const [bookmarks, setBookmarks] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [notifications, setNotifications] = useState([]);

  const showNotification = (title, description) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, title, description }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(id) 
        ? prev.filter(b => b !== id)
        : [...prev, id];
      showNotification(
        prev.includes(id) ? "Removed from bookmarks" : "Added to bookmarks",
        prev.includes(id) ? "Article removed from your bookmarks" : "Article saved to your bookmarks"
      );
      return newBookmarks;
    });
  };

  const handleShare = (article) => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Link copied!", "Article link copied to clipboard");
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredArticles = useMemo(() => {
    let articles = [];
    switch (activeTab) {
      case 'featured':
        articles = magazineData.featured;
        break;
      case 'latest':
        articles = magazineData.latest;
        break;
      case 'bookmarks':
        articles = [...magazineData.featured, ...magazineData.latest]
          .filter(article => bookmarks.includes(article.id));
        break;
      default:
        articles = [...magazineData.featured, ...magazineData.latest];
    }

    if (searchQuery) {
      articles = articles.filter(article =>
        article.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return articles;
  }, [activeTab, searchQuery, bookmarks]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <Alert key={notification.id} className="w-96">
            <AlertTitle>{notification.title}</AlertTitle>
            <AlertDescription>{notification.description}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {magazineData.title}
              </h1>
              <Badge variant="outline">
                {magazineData.issue}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="mt-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList>
                <TabsTrigger value="featured">
                  Featured
                </TabsTrigger>
                <TabsTrigger value="latest">
                  Latest
                </TabsTrigger>
                <TabsTrigger value="bookmarks">
                  Bookmarks ({bookmarks.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onBookmark={toggleBookmark}
              isBookmarked={bookmarks.includes(article.id)}
              onShare={handleShare}
              onExpand={toggleExpand}
              isExpanded={expanded[article.id]}
            />
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <Alert>
            <AlertTitle>No articles found</AlertTitle>
            <AlertDescription>
              Try adjusting your search or filters to find more articles.
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}
