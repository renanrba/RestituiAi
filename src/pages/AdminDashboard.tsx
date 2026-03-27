import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  Calendar, 
  Phone, 
  Mail, 
  Stethoscope, 
  Wallet,
  X,
  ArrowLeft,
  Download,
  RefreshCw,
  LogOut,
  AlertCircle,
  FileText,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Clock,
  Sun,
  Moon
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../components/ThemeProvider';
import { BlogPostForm } from '../components/BlogPostForm';
import { Button } from '../components/ui/button';

interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  beneficio: string;
  doenca: string;
  source: string;
  status: string;
}

interface Post {
  id: string;
  created_at: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  read_time: string;
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'blog'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    } else {
      fetchPosts();
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin/login');
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  async function fetchLeads() {
    if (!supabase) {
      console.warn('Supabase not configured.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setLeads(data || []);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setError(err.message || 'Erro ao carregar leads.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchPosts() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setPosts(data || []);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Erro ao carregar posts.');
    } finally {
      setLoading(false);
    }
  }

  const confirmDeletePost = (id: string) => {
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };

  async function handleDeletePost() {
    if (!postToDelete) return;
    
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postToDelete);
      if (error) throw error;
      setPosts(posts.filter(p => p.id !== postToDelete));
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
    } catch (err: any) {
      setError('Erro ao excluir post: ' + err.message);
      setIsDeleteModalOpen(false);
    }
  }

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.doenca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050814] transition-colors duration-300">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#050814]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="https://i.imgur.com/FsiYz4M.jpeg" 
                alt="RestituiAI" 
                className="h-8 w-auto rounded-md" 
                onError={(e) => (e.currentTarget.src = 'https://i.imgur.com/8xC4BlJ.png')}
              />
              <span className="font-bold text-slate-900 dark:text-white hidden sm:inline-block">Admin Panel</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1 ml-8">
              <button 
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'leads' ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
              >
                <Users className="w-4 h-4" /> Leads
              </button>
              <button 
                onClick={() => setActiveTab('blog')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'blog' ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
              >
                <FileText className="w-4 h-4" /> Blogs
              </button>
            </nav>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl mx-2">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`p-2 rounded-lg transition-all ${activeTab === 'leads' ? 'bg-white dark:bg-white/10 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              title="Leads"
            >
              <Users className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={`p-2 rounded-lg transition-all ${activeTab === 'blog' ? 'bg-white dark:bg-white/10 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              title="Blogs"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-slate-600 dark:text-slate-400"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <div className="h-6 w-px bg-slate-200 dark:border-white/10 mx-2" />
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container px-4 mx-auto max-w-7xl pt-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm uppercase tracking-wider mb-1">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {activeTab === 'leads' ? 'Gerenciamento de Leads' : 'Gerenciamento do Blog'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={activeTab === 'leads' ? fetchLeads : fetchPosts}
              className="p-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
              title="Atualizar"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            {activeTab === 'blog' && (
              <button 
                onClick={() => {
                  setEditingPost(null);
                  setIsPostModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Artigo
              </button>
            )}

            {activeTab === 'leads' && (
              <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-colors">
                <Download className="w-4 h-4" /> Exportar CSV
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
                {activeTab === 'leads' ? <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" /> : <FileText className="w-6 h-6 text-brand-600 dark:text-brand-400" />}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{activeTab === 'leads' ? 'Total de Leads' : 'Total de Artigos'}</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{activeTab === 'leads' ? leads.length : posts.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Hoje</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {activeTab === 'leads' 
                    ? leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length
                    : posts.filter(p => new Date(p.created_at).toDateString() === new Date().toDateString()).length
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{activeTab === 'leads' ? 'Taxa de Conversão' : 'Visualizações'}</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{activeTab === 'leads' ? '100%' : '---'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-3xl shadow-sm mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder={activeTab === 'leads' ? "Buscar por nome, email ou doença..." : "Buscar por título ou categoria..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-5 h-5" /> Filtros
          </button>
        </div>

        {activeTab === 'leads' ? (
          /* Leads Table */
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden">
            {!supabase && (
              <div className="p-8 bg-amber-50 dark:bg-amber-500/10 border-b border-amber-100 dark:border-amber-500/20">
                <p className="text-amber-800 dark:text-amber-400 text-sm font-medium text-center">
                  ⚠️ Supabase não configurado. Adicione as variáveis de ambiente <strong>VITE_SUPABASE_URL</strong> e <strong>VITE_SUPABASE_ANON_KEY</strong> para visualizar os dados reais.
                </p>
              </div>
            )}
            {error && (
              <div className="p-8 bg-red-50 dark:bg-red-500/10 border-b border-red-100 dark:border-red-500/20">
                <p className="text-red-800 dark:text-red-400 text-sm font-medium text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-5 h-5" /> {error}
                </p>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-white/5">
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Doença</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Benefício</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
                          <span className="text-slate-500 dark:text-slate-400 font-medium">Carregando leads...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Users className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                          <span className="text-slate-500 dark:text-slate-400 font-medium">Nenhum lead encontrado.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr 
                        key={lead.id} 
                        className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500">
                            {new Date(lead.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{lead.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-500">{lead.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-bold border border-brand-100 dark:border-brand-500/20">
                            {lead.doenca}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">{lead.beneficio}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-slate-400 group-hover:text-brand-500 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Blog Table */
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-white/5">
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Artigo</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
                          <span className="text-slate-500 dark:text-slate-400 font-medium">Carregando artigos...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                          <span className="text-slate-500 dark:text-slate-400 font-medium">Nenhum artigo encontrado.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={post.image} alt="" className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                            <div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{post.title}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-500">{post.read_time} de leitura</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-bold">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 dark:text-slate-400">{post.date}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => {
                                setEditingPost(post);
                                setIsPostModalOpen(true);
                              }}
                              className="p-2 text-slate-400 hover:text-brand-500 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => confirmDeletePost(post.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Post Editor Modal */}
      <AnimatePresence>
        {isPostModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPostModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingPost ? 'Editar Artigo' : 'Novo Artigo'}
                </h2>
                <button 
                  onClick={() => setIsPostModalOpen(false)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-900 dark:text-white" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <BlogPostForm 
                  post={editingPost} 
                  onSuccess={() => {
                    setIsPostModalOpen(false);
                    fetchPosts();
                  }} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 p-8"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mb-4">
                  <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Excluir Artigo</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.
                </p>
                
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-grow py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleDeletePost}
                    className="flex-grow py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Detalhes do Lead</h2>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-900 dark:text-white" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedLead.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400">Recebido em {new Date(selectedLead.created_at).toLocaleString('pt-BR')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                      <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Telefone</div>
                        <a href={`tel:${selectedLead.phone}`} className="text-slate-900 dark:text-white font-bold hover:text-brand-600 transition-colors">
                          {selectedLead.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                      <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</div>
                        <a href={`mailto:${selectedLead.email}`} className="text-slate-900 dark:text-white font-bold hover:text-brand-600 transition-colors">
                          {selectedLead.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                      <Stethoscope className="w-5 h-5 text-brand-500 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Doença</div>
                        <div className="text-slate-900 dark:text-white font-bold">{selectedLead.doenca}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                      <Wallet className="w-5 h-5 text-brand-500 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Benefício</div>
                        <div className="text-slate-900 dark:text-white font-bold">{selectedLead.beneficio}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a 
                    href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl transition-colors"
                  >
                    <Phone className="w-5 h-5" /> Entrar em contato via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
