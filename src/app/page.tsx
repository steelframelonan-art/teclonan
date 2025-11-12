"use client";

import { useState } from "react";
import { Search, Wrench, Calculator, BookOpen, Users, MessageSquare, FileText, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import LoginPage from "./login/page";
import CodigosErro from "./codigos-erro/page";
import Calculadora from "./calculadora/page";
import Manuais from "./manuais/page";
import Clientes from "./clientes/page";
import Forum from "./forum/page";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

  // Dados de exemplo de códigos de erro
  const errorCodes = [
    {
      brand: "LG",
      code: "CH01",
      description: "Erro no sensor de temperatura interna",
      causes: ["Sensor danificado", "Conexão solta", "Curto-circuito"],
      image: "https://images.unsplash.com/photo-1631545806609-4b0e1b0b1b0a?w=400&h=300&fit=crop"
    },
    {
      brand: "Samsung",
      code: "E1",
      description: "Erro de comunicação entre unidades",
      causes: ["Cabo de comunicação danificado", "Interferência elétrica", "Placa eletrônica com defeito"],
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=300&fit=crop"
    },
    {
      brand: "Midea",
      code: "E3",
      description: "Proteção de alta pressão",
      causes: ["Condensador sujo", "Ventilador externo com defeito", "Excesso de gás refrigerante"],
      image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=400&h=300&fit=crop"
    },
    {
      brand: "Daikin",
      code: "A3",
      description: "Nível de drenagem anormal",
      causes: ["Dreno entupido", "Bomba de drenagem com defeito", "Sensor de nível danificado"],
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop"
    },
    {
      brand: "Carrier",
      code: "F0",
      description: "Erro no sensor de temperatura externa",
      causes: ["Sensor desconectado", "Sensor em curto", "Fiação danificada"],
      image: "https://images.unsplash.com/photo-1635674894249-0e92a0bc8d6f?w=400&h=300&fit=crop"
    },
  ];

  const filteredErrors = errorCodes.filter(
    (error) =>
      error.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "codigos":
        return <CodigosErro />;
      case "calculadora":
        return <Calculadora />;
      case "manuais":
        return <Manuais />;
      case "clientes":
        return <Clientes />;
      case "forum":
        return <Forum />;
      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">OI TÉCNICO</h1>
              <p className="text-lg opacity-90">
                Sua plataforma completa para diagnóstico e gestão de serviços de refrigeração
              </p>
            </div>

            {/* Barra de Pesquisa Principal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Buscar Códigos de Erro
                </CardTitle>
                <CardDescription>
                  Pesquise por código, marca ou descrição do problema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: E1, LG, sensor temperatura..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => setCurrentPage("codigos")}>
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resultados da Pesquisa */}
            {searchTerm && (
              <Card>
                <CardHeader>
                  <CardTitle>Resultados da Pesquisa</CardTitle>
                  <CardDescription>
                    {filteredErrors.length} resultado(s) encontrado(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {filteredErrors.map((error, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <img
                              src={error.image}
                              alt={error.code}
                              className="w-full md:w-48 h-48 object-cover"
                            />
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Badge className="mb-2">{error.brand}</Badge>
                                  <h3 className="text-xl font-bold text-blue-600">
                                    {error.code}
                                  </h3>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-3">{error.description}</p>
                              <div>
                                <p className="font-semibold text-sm mb-2">
                                  Possíveis Causas:
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {error.causes.map((cause, i) => (
                                    <li key={i} className="text-sm text-gray-600">
                                      {cause}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {/* Menu de Funcionalidades */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => setCurrentPage("codigos")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-600" />
                    Códigos de Erro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Acesse todos os códigos de erro de todas as marcas com ilustrações e
                    soluções detalhadas
                  </p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => setCurrentPage("forum")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    Fórum Técnico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Troque experiências, faça perguntas e compartilhe soluções com outros
                    técnicos
                  </p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => setCurrentPage("calculadora")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    Calculadora Técnica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Calcule carga de gás, perda de carga e converta unidades de medida
                  </p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => setCurrentPage("manuais")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                    Manuais Técnicos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Baixe e acesse manuais técnicos de equipamentos para consulta offline
                  </p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => setCurrentPage("clientes")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-600" />
                    Gestão de Clientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Gerencie seus clientes, histórico de serviços e chamados técnicos
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    Relatórios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Gere relatórios de serviços, estatísticas e análises de desempenho
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">500+</p>
                    <p className="text-sm text-gray-600">Códigos de Erro</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">1.2k</p>
                    <p className="text-sm text-gray-600">Técnicos Ativos</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">350+</p>
                    <p className="text-sm text-gray-600">Manuais Disponíveis</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">2.5k</p>
                    <p className="text-sm text-gray-600">Discussões no Fórum</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentPage("home")}
            >
              <Wrench className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">OI TÉCNICO</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant={currentPage === "home" ? "default" : "ghost"}
                onClick={() => setCurrentPage("home")}
              >
                Início
              </Button>
              <Button
                variant={currentPage === "codigos" ? "default" : "ghost"}
                onClick={() => setCurrentPage("codigos")}
              >
                Códigos
              </Button>
              <Button
                variant={currentPage === "forum" ? "default" : "ghost"}
                onClick={() => setCurrentPage("forum")}
              >
                Fórum
              </Button>
              <Button
                variant={currentPage === "calculadora" ? "default" : "ghost"}
                onClick={() => setCurrentPage("calculadora")}
              >
                Calculadora
              </Button>
              <Button
                variant={currentPage === "manuais" ? "default" : "ghost"}
                onClick={() => setCurrentPage("manuais")}
              >
                Manuais
              </Button>
              <Button
                variant={currentPage === "clientes" ? "default" : "ghost"}
                onClick={() => setCurrentPage("clientes")}
              >
                Clientes
              </Button>
            </nav>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{renderPage()}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 OI TÉCNICO - Plataforma para Técnicos de Refrigeração</p>
        </div>
      </footer>
    </div>
  );
}
