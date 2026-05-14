import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tools as defaultTools, type AiTool } from '../data/tools';
import { blogPosts as defaultBlogPosts, type BlogPost } from '../data/blog';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  socialTwitter: string;
  socialYoutube: string;
  socialInstagram: string;
  adminPassword: string;
  emailjsServiceId: string;
  emailjsTemplateContact: string;
  emailjsTemplateNewsletter: string;
  emailjsPublicKey: string;
}

interface DataContextType {
  tools: AiTool[];
  setTools: (tools: AiTool[]) => void;
  addTool: (tool: AiTool) => void;
  updateTool: (id: string, tool: AiTool) => void;
  deleteTool: (id: string) => void;
  
  blogPosts: BlogPost[];
  setBlogPosts: (posts: BlogPost[]) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;

  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
}

const defaultSettings: SiteSettings = {
  siteName: 'AI Araçları Rehberi',
  siteDescription: 'Türkiye\'nin en kapsamlı yapay zeka araçları rehberi',
  heroTitle: 'En Güçlü Yapay Zeka Araçları Tek Rehberde',
  heroSubtitle: 'İçerik üretimi, tasarım, video, kodlama ve pazarlama için en iyi AI araçlarını keşfedin.',
  contactEmail: 'info@aiaraclari.com',
  socialTwitter: 'https://twitter.com/aiaraclari',
  socialYoutube: 'https://youtube.com/@aiaraclari',
  socialInstagram: 'https://instagram.com/aiaraclari',
  adminPassword: '',  // Şifre kodda saklanmaz — ilk girişte belirlenir
  emailjsServiceId: '',
  emailjsTemplateContact: '',
  emailjsTemplateNewsletter: '',
  emailjsPublicKey: '',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Tools
  const [tools, setToolsState] = useState<AiTool[]>(() => {
    const saved = localStorage.getItem('ai_tools');
    return saved ? JSON.parse(saved) : defaultTools;
  });

  // Blog Posts
  const [blogPosts, setBlogPostsState] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blog_posts');
    return saved ? JSON.parse(saved) : defaultBlogPosts;
  });

  // Settings
  const [settings, setSettingsState] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('site_settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  // Admin state
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('ai_tools', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem('blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Favorites
  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  // Tools CRUD
  const setTools = (newTools: AiTool[]) => setToolsState(newTools);
  
  const addTool = (tool: AiTool) => {
    setToolsState((prev) => [...prev, { ...tool, id: Date.now().toString() }]);
  };
  
  const updateTool = (id: string, tool: AiTool) => {
    setToolsState((prev) => prev.map((t) => (t.id === id ? tool : t)));
  };
  
  const deleteTool = (id: string) => {
    setToolsState((prev) => prev.filter((t) => t.id !== id));
  };

  // Blog CRUD
  const setBlogPosts = (posts: BlogPost[]) => setBlogPostsState(posts);
  
  const addBlogPost = (post: BlogPost) => {
    setBlogPostsState((prev) => [...prev, { ...post, id: Date.now().toString() }]);
  };
  
  const updateBlogPost = (id: string, post: BlogPost) => {
    setBlogPostsState((prev) => prev.map((p) => (p.id === id ? post : p)));
  };
  
  const deleteBlogPost = (id: string) => {
    setBlogPostsState((prev) => prev.filter((p) => p.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  // Auth — şifre kodda saklanmaz, sadece localStorage'da
  const login = (password: string): boolean => {
    // Şifre boşsa giriş yapılamaz (ilk kurulum gerekli)
    if (!settings.adminPassword) return false;
    if (password === settings.adminPassword) {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
  };

  return (
    <DataContext.Provider
      value={{
        tools,
        setTools,
        addTool,
        updateTool,
        deleteTool,
        blogPosts,
        setBlogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        settings,
        updateSettings,
        isAdmin,
        login,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
