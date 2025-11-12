"use client";

import { useState } from "react";
import { BookOpen, Download, Star, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Manual {
  id: number;
  title: string;
  brand: string;
  model: string;
  category: string;
  pages: number;
  size: string;
  downloadUrl: string;
  isFavorite: boolean;
  thumbnail: string;
}

export default function Manuais() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Base de dados de manuais
  const [manuais, setManuais] = useState<Manual[]>([
    {
      id: 1,
      title: "Manual de Serviço - Split Inverter",
      brand: "LG",
      model: "S4-W12JA3AA",
      category: "Split",
      pages: 45,
      size: "2.3 MB",
      downloadUrl: "#",
      isFavorite: false,
      thumbnail: "https://images.unsplash.com/photo-1631545806609-4b0e1b0b1b0a?w=200&h=280&fit=crop",
    },
    {
      id: 2,
      title: "Manual Técnico - Multi Split",
      brand: "Samsung",
      model: "AR09MVSPBGMNAZ",
      category: "Multi Split",
      pages: 68,
      size: "3.8 MB",
      downloadUrl: "#",
      isFavorite: true,
      thumbnail: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=200&h=280&fit=crop",
    },
    {
      id: 3,
      title: "Guia de Instalação e Manutenção",
      brand: "Midea",
      model: "Springer 12000 BTU",
      category: "Split",
      pages: 32,
      size: "1.9 MB",
      downloadUrl: "#",
      isFavorite: false,
      thumbnail: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=200&h=280&fit=crop",
    },
    {
      id: 4,
      title: "Manual de Serviço - VRF",
      brand: "Daikin",
      model: "VRV IV-S Series",
      category: "VRF",
      pages: 124,
      size: "8.5 MB",
      downloadUrl: "#",
      isFavorite: true,
      thumbnail: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200&h=280&fit=crop",
    },
    {
      id: 5,
      title: "Manual Técnico - Cassete",
      brand: "Carrier",
      model: "40KWCA036515LC",
      category: "Cassete",
      pages: 56,
      size: "3.2 MB",
      downloadUrl: "#",
      isFavorite: false,
      thumbnail: "https://images.unsplash.com/photo-1635674894249-0e92a0bc8d6f?w=200&h=280&fit=crop",
    },
    {
      id: 6,
      title: "Guia de Troubleshooting",
      brand: "Gree",
      model: "Eco Garden Inverter",
      category: "Split",
      pages: 28,
      size: "1.5 MB",
      downloadUrl: "#",
      isFavorite: false,
      thumbnail: "https://images.unsplash.com/photo-1631545806609-4b0e1b0b1b0a?w=200&h=280&fit=crop",
    },
    {
      id: 7,
      title: "Manual de Instalação - Piso Teto",
      brand: "Electrolux",
      model: "PI18F/PE18R",
      category: "Piso Teto",
      pages: 42,
      size: "2.7 MB",
      downloadUrl: "#",
      isFavorite: true,
      thumbnail: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=200&h=280&fit=crop",
    },
    {
      id: 8,
      title: "Manual Técnico Completo",
      brand: "Fujitsu",
      model: "AOBG30LBTA4",
      category: "Multi Split",
      pages: 89,
      size: "5.1 MB",
      downloadUrl: "#",
      isFavorite: false,
      thumbnail: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=200&h=280&fit=crop",
    },
    {
      id: 9,
      title: "Guia de Manutenção Preventiva",
      brand: "Hitachi",
      model: "RAS-18CLH",
      category: "Split",
      pages: 35,
      size: "2.1 MB",
      downloadUrl: "#",
      isFavorite: false,
      thumbnail: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200&h=280&fit=crop",
    },
    {
      id: 10,
      title: "Manual de Serviço - Chiller",
      brand: "Carrier",
      model: "30RB-302",
      category: "Chiller",
      pages: 156,
      size: "12.3 MB",
      downloadUrl: "#",
      isFavorite: true,
      thumbnail: "https://images.unsplash.com/photo-1635674894249-0e92a0bc8d6f?w=200&h=280&fit=crop",
    },
  ]);

  const brands = ["all", ...Array.from(new Set(manuais.map((m) => m.brand)))];
  const categories = ["all", ...Array.from(new Set(manuais.map((m) => m.category)))];

  const filteredManuais = manuais.filter((manual) => {
    const matchesSearch =
      manual.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manual.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manual.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand = selectedBrand === "all" || manual.brand === selectedBrand;
    const matchesCategory = selectedCategory === "all" || manual.category === selectedCategory;

    return matchesSearch && matchesBrand && matchesCategory;
  });

  const favoritos = manuais.filter((m) => m.isFavorite);

  const toggleFavorite = (id: number) => {
    setManuais(
      manuais.map((manual) =>
        manual.id === id ? { ...manual, isFavorite: !manual.isFavorite } : manual
      )
    );
  };

  const handleDownload = (manual: Manual) => {
    // Simulação de download - em produção, fazer download real do PDF
    alert(`Baixando: ${manual.title}\nTamanho: ${manual.size}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Manuais Técnicos</h1>
        <p className="text-gray-600">
          Biblioteca completa de manuais técnicos para download e consulta offline
        </p>
      </div>

      {/* Filtros e Pesquisa */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Manuais</CardTitle>
          <CardDescription>
            Pesquise por marca, modelo ou tipo de equipamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar manuais..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as marcas</SelectItem>
                {brands.slice(1).map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Manuais Favoritos */}
      {favoritos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Meus Favoritos ({favoritos.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {favoritos.map((manual) => (
              <Card
                key={manual.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={manual.thumbnail}
                    alt={manual.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => toggleFavorite(manual.id)}
                  >
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <Badge className="mb-2 text-xs">{manual.brand}</Badge>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                    {manual.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{manual.model}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{manual.pages} pgs</span>
                    <span>{manual.size}</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => handleDownload(manual)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Baixar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Todos os Manuais */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Todos os Manuais ({filteredManuais.length})
        </h2>

        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pr-4">
            {filteredManuais.map((manual) => (
              <Card
                key={manual.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={manual.thumbnail}
                    alt={manual.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => toggleFavorite(manual.id)}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        manual.isFavorite
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>
                  <Badge className="absolute bottom-2 left-2 text-xs">
                    {manual.category}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {manual.brand}
                  </Badge>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                    {manual.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{manual.model}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{manual.pages} páginas</span>
                    <span>{manual.size}</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleDownload(manual)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Baixar PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {filteredManuais.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 text-lg">
                Nenhum manual encontrado com os filtros aplicados.
              </p>
              <p className="text-gray-400 mt-2">
                Tente ajustar sua pesquisa ou filtros.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Informações sobre Download Offline */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Acesso Offline Disponível
              </h3>
              <p className="text-sm text-blue-800">
                Todos os manuais baixados ficam disponíveis para consulta offline. Marque
                seus favoritos para acesso rápido e organize sua biblioteca pessoal de
                documentação técnica.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
