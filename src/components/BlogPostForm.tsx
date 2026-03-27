import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Loader2, 
  Save, 
  ImageIcon, 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Quote, 
  Undo, 
  Redo,
  Plus,
  Type
} from 'lucide-react';
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Custom Font Size Extension
const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }: any) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      unsetFontSize: () => ({ chain }: any) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      },
    } as any
  },
});

interface Post {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  read_time: string;
}

interface BlogPostFormProps {
  post?: Post | null;
  onSuccess: () => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '30px'];
  const colors = ['#000000', '#2563eb', '#dc2626', '#16a34a', '#ca8a04'];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 dark:bg-slate-900 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Negrito"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Itálico"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('underline') ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Sublinhado"
      >
        <Type className="w-4 h-4 underline" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('strike') ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Tachado"
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1 self-center" />

      <select
        onChange={(e) => {
          if (e.target.value === "") {
            editor.chain().focus().unsetFontSize().run();
          } else {
            editor.chain().focus().setFontSize(e.target.value).run();
          }
        }}
        className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded px-1 text-xs text-gray-600 dark:text-gray-400 outline-none"
        title="Tamanho da Fonte"
        value={editor.getAttributes('textStyle').fontSize || ""}
      >
        <option value="">Normal</option>
        {fontSizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>

      <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Título 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Título 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Lista com Marcadores"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Lista Numerada"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Citação"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1 self-center" />

      <div className="flex items-center gap-1 px-1">
        {colors.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => editor.chain().focus().setColor(color).run()}
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
            title={`Cor: ${color}`}
          />
        ))}
      </div>

      <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('highlight') ? 'bg-gray-200 dark:bg-slate-800 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
        title="Destaque"
      >
        <div className="w-4 h-4 bg-yellow-200 border border-gray-400" />
      </button>

      <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors"
        title="Desfazer"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors"
        title="Refazer"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export function BlogPostForm({ post, onSuccess }: BlogPostFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['Isenção', 'Restituição', 'Direitos', 'Guia']);
  
  const [formData, setFormData] = useState<Post>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Isenção',
    date: format(new Date(), 'yyyy-MM-dd'),
    read_time: '5 min'
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      TextStyle,
      Color,
      Highlight,
      FontFamily,
      FontSize,
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (post) {
      // Try to parse the date if it's in "27 Mar 2026" format to "yyyy-MM-dd"
      let formattedDate = post.date;
      try {
        if (post.date && post.date.includes(' ')) {
          // Attempt to parse "dd MMM yyyy" format
          const parsedDate = parse(post.date, 'dd MMM yyyy', new Date(), { locale: ptBR });
          if (!isNaN(parsedDate.getTime())) {
            formattedDate = format(parsedDate, 'yyyy-MM-dd');
          }
        }
      } catch (e) {
        console.warn('Error parsing date:', e);
      }

      setFormData({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        image: post.image || '',
        category: post.category || 'Isenção',
        date: formattedDate || format(new Date(), 'yyyy-MM-dd'),
        read_time: post.read_time || '5 min'
      });
      
      if (editor && post.content) {
        editor.commands.setContent(post.content);
      }
      
      if (post.category && !categories.includes(post.category)) {
        setCategories(prev => [...prev, post.category]);
      }
    }
  }, [post, editor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Format date back to display format for the database if needed, 
    // but usually keeping YYYY-MM-DD is better for sorting.
    // The previous app used "27 Mar 2026". Let's convert it.
    const displayDate = format(new Date(formData.date), 'dd MMM yyyy', { locale: ptBR });
    
    const dataToSave = {
      ...formData,
      date: displayDate
    };

    try {
      if (post?.id) {
        const { error: updateError } = await supabase
          .from('posts')
          .update(dataToSave)
          .eq('id', post.id);
        
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('posts')
          .insert([dataToSave]);
        
        if (insertError) throw insertError;
      }

      onSuccess();
    } catch (err: any) {
      console.error('Error saving post:', err);
      setError(err.message || 'Erro ao salvar o artigo');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory]);
      setFormData(prev => ({ ...prev, category: newCategory }));
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
            placeholder="Ex: Como solicitar isenção de IR"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Categoria</label>
          <div className="flex gap-2">
            {!isAddingCategory ? (
              <>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="flex-grow px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(true)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400"
                  title="Nova Categoria"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-grow px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                  placeholder="Nova categoria..."
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm font-bold"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Resumo (Excerpt)</label>
          <textarea
            name="excerpt"
            required
            value={formData.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
            placeholder="Breve descrição do artigo..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL da Imagem</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ImageIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          {formData.image && (
            <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800')}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data de Publicação</label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tempo de Leitura</label>
          <input
            type="text"
            name="read_time"
            required
            value={formData.read_time}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
            placeholder="Ex: 5 min"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Conteúdo do Artigo</label>
          <div className="border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <MenuBar editor={editor} />
            <EditorContent 
              editor={editor} 
              className="prose dark:prose-invert max-w-none p-4 min-h-[300px] bg-white dark:bg-slate-800 outline-none"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
            Dica: Use a barra de ferramentas acima para formatar seu texto.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          {post ? 'Atualizar Artigo' : 'Publicar Artigo'}
        </button>
      </div>
    </form>
  );
}
