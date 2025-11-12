"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, MessageCircle, Plus, Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ForumPost {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  votes: number;
  replies: number;
  date: string;
  tags: string[];
}

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  votes: number;
  date: string;
}

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("duvida");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Dados de exemplo de posts do fórum
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: 1,
      author: "Carlos Silva",
      avatar: "CS",
      title: "Compressor não liga após troca de capacitor",
      content:
        "Pessoal, troquei o capacitor de um split 12000 BTUs mas o compressor continua sem ligar. O ventilador funciona normalmente. Já testei a tensão e está ok. Alguém já passou por isso?",
      category: "Dúvida Técnica",
      votes: 15,
      replies: 8,
      date: "2024-01-15",
      tags: ["compressor", "capacitor", "split"],
    },
    {
      id: 2,
      author: "Maria Santos",
      avatar: "MS",
      title: "Dica: Como identificar vazamento em evaporador",
      content:
        "Compartilho aqui uma técnica que aprendi: usar detergente neutro com água em spray. Aplique nas soldas e observe se forma bolhas. Funciona muito bem para vazamentos pequenos!",
      category: "Dica",
      votes: 42,
      replies: 12,
      date: "2024-01-14",
      tags: ["vazamento", "evaporador", "dica"],
    },
    {
      id: 3,
      author: "João Oliveira",
      avatar: "JO",
      title: "Erro E6 em Gree - Solução definitiva",
      content:
        "Depois de muito pesquisar, descobri que o erro E6 em aparelhos Gree geralmente é causado por interferência eletromagnética. A solução é afastar os cabos de comunicação de fontes de interferência e usar cabo blindado.",
      category: "Solução",
      votes: 38,
      replies: 15,
      date: "2024-01-13",
      tags: ["gree", "erro-e6", "comunicacao"],
    },
    {
      id: 4,
      author: "Pedro Costa",
      avatar: "PC",
      title: "Qual a melhor bomba de vácuo para iniciantes?",
      content:
        "Estou montando meu kit de ferramentas e preciso comprar uma bomba de vácuo. Qual vocês recomendam para quem está começando? Orçamento até R$ 1500.",
      category: "Dúvida Técnica",
      votes: 23,
      replies: 20,
      date: "2024-01-12",
      tags: ["ferramentas", "bomba-vacuo", "iniciante"],
    },
    {
      id: 5,
      author: "Ana Paula",
      avatar: "AP",
      title: "Condensador congelando - O que pode ser?",
      content:
        "Atendi um chamado onde o condensador estava totalmente congelado. Já limpei o filtro, verifiquei o gás e está normal. O que mais pode causar isso?",
      category: "Dúvida Técnica",
      votes: 18,
      replies: 10,
      date: "2024-01-11",
      tags: ["condensador", "congelamento", "diagnostico"],
    },
  ]);

  // Respostas de exemplo
  const replies: Reply[] = [
    {
      id: 1,
      author: "Roberto Alves",
      avatar: "RA",
      content:
        "Verifique se o protetor térmico do compressor não está acionado. Às vezes ele demora para resetar. Deixe o aparelho desligado por 30 minutos e teste novamente.",
      votes: 8,
      date: "2024-01-15",
    },
    {
      id: 2,
      author: "Fernanda Lima",
      avatar: "FL",
      content:
        "Pode ser o relé de partida também. Teste com um multímetro para ver se há continuidade. Se não houver, precisa trocar.",
      votes: 12,
      date: "2024-01-15",
    },
    {
      id: 3,
      author: "Lucas Mendes",
      avatar: "LM",
      content:
        "Tive um caso parecido e era a placa eletrônica que não estava enviando sinal para o compressor. Verifique se há tensão chegando no compressor quando liga o aparelho.",
      votes: 15,
      date: "2024-01-15",
    },
  ];

  const filteredPosts = forumPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreatePost = () => {
    if (newPostTitle && newPostContent) {
      const newPost: ForumPost = {
        id: forumPosts.length + 1,
        author: "Você",
        avatar: "VC",
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory === "duvida" ? "Dúvida Técnica" : newPostCategory === "dica" ? "Dica" : "Solução",
        votes: 0,
        replies: 0,
        date: new Date().toISOString().split("T")[0],
        tags: [],
      };

      setForumPosts([newPost, ...forumPosts]);
      setNewPostTitle("");
      setNewPostContent("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fórum Técnico</h1>
          <p className="text-gray-600">
            Compartilhe experiências e tire dúvidas com outros técnicos
          </p>
        </div>

        {/* Botão Nova Discussão */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Nova Discussão
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Discussão</DialogTitle>
              <DialogDescription>
                Compartilhe sua dúvida, dica ou solução com a comunidade
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Título</Label>
                <Input
                  id="post-title"
                  placeholder="Ex: Como resolver erro E1 em Samsung?"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-category">Categoria</Label>
                <select
                  id="post-category"
                  className="w-full p-2 border rounded-md"
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                >
                  <option value="duvida">Dúvida Técnica</option>
                  <option value="dica">Dica</option>
                  <option value="solucao">Solução</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-content">Conteúdo</Label>
                <Textarea
                  id="post-content"
                  placeholder="Descreva sua dúvida, dica ou solução em detalhes..."
                  rows={6}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreatePost}>Publicar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Barra de Pesquisa */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar discussões, tags ou palavras-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{forumPosts.length}</p>
                <p className="text-sm text-gray-600">Discussões Ativas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {forumPosts.reduce((acc, post) => acc + post.replies, 0)}
                </p>
                <p className="text-sm text-gray-600">Respostas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-sm text-gray-600">Membros Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts */}
        <div className="lg:col-span-2">
          <ScrollArea className="h-[700px]">
            <div className="space-y-4 pr-4">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedPost(post)}
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>

                      {/* Conteúdo */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg hover:text-blue-600">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              por {post.author} • {post.date}
                            </p>
                          </div>
                          <Badge
                            variant={
                              post.category === "Dúvida Técnica"
                                ? "default"
                                : post.category === "Dica"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {post.category}
                          </Badge>
                        </div>

                        <p className="text-gray-700 mb-3 line-clamp-2">{post.content}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Estatísticas */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.votes} votos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.replies} respostas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Painel Lateral - Post Selecionado */}
        <div className="lg:col-span-1">
          {selectedPost ? (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">{selectedPost.title}</CardTitle>
                <CardDescription>
                  por {selectedPost.author} • {selectedPost.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {/* Post Original */}
                    <div>
                      <p className="text-gray-700 mb-4">{selectedPost.content}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {selectedPost.votes}
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Responder
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Respostas */}
                    <div>
                      <h4 className="font-semibold mb-4">
                        {selectedPost.replies} Respostas
                      </h4>
                      <div className="space-y-4">
                        {replies.map((reply) => (
                          <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                            <div className="flex items-start gap-3 mb-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-gray-600 text-white text-xs">
                                  {reply.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-semibold text-sm">{reply.author}</p>
                                <p className="text-xs text-gray-600">{reply.date}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {reply.votes}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Campo de Resposta */}
                    <div className="space-y-2">
                      <Textarea placeholder="Escreva sua resposta..." rows={3} />
                      <Button className="w-full">Enviar Resposta</Button>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24">
              <CardContent className="pt-6 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Selecione uma discussão para ver os detalhes e respostas</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
