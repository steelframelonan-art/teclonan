"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CodigosErro() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");

  // Base de dados expandida de códigos de erro
  const errorCodes = [
    {
      brand: "LG",
      code: "CH01",
      description: "Erro no sensor de temperatura interna",
      causes: [
        "Sensor de temperatura danificado ou desconectado",
        "Conexão solta no chicote elétrico",
        "Curto-circuito no cabo do sensor",
        "Placa eletrônica com defeito",
      ],
      solutions: [
        "Verificar conexões do sensor",
        "Testar resistência do sensor (deve estar entre 5-20kΩ)",
        "Substituir sensor se necessário",
        "Verificar placa eletrônica",
      ],
      image: "https://images.unsplash.com/photo-1631545806609-4b0e1b0b1b0a?w=400&h=300&fit=crop",
    },
    {
      brand: "LG",
      code: "CH02",
      description: "Erro no sensor de temperatura externa",
      causes: [
        "Sensor exposto ao sol direto",
        "Sensor danificado por umidade",
        "Conexão oxidada",
      ],
      solutions: [
        "Proteger sensor da exposição solar",
        "Limpar conexões oxidadas",
        "Substituir sensor",
      ],
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=300&fit=crop",
    },
    {
      brand: "Samsung",
      code: "E1",
      description: "Erro de comunicação entre unidades",
      causes: [
        "Cabo de comunicação danificado ou mal conectado",
        "Interferência elétrica na linha de comunicação",
        "Placa eletrônica com defeito",
        "Distância entre unidades muito grande",
      ],
      solutions: [
        "Verificar e reconectar cabos de comunicação",
        "Usar cabo blindado para evitar interferências",
        "Verificar se a distância está dentro do especificado",
        "Testar placas eletrônicas",
      ],
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=300&fit=crop",
    },
    {
      brand: "Samsung",
      code: "E2",
      description: "Proteção de congelamento",
      causes: [
        "Filtro de ar sujo",
        "Baixo fluxo de ar",
        "Falta de gás refrigerante",
        "Ventilador interno com defeito",
      ],
      solutions: [
        "Limpar ou substituir filtro de ar",
        "Verificar obstruções no fluxo de ar",
        "Verificar carga de gás",
        "Testar motor do ventilador",
      ],
      image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=400&h=300&fit=crop",
    },
    {
      brand: "Midea",
      code: "E3",
      description: "Proteção de alta pressão",
      causes: [
        "Condensador sujo ou obstruído",
        "Ventilador externo com defeito ou parado",
        "Excesso de gás refrigerante no sistema",
        "Temperatura ambiente muito alta",
      ],
      solutions: [
        "Limpar condensador com água e detergente neutro",
        "Verificar funcionamento do ventilador externo",
        "Verificar carga de gás (pode estar em excesso)",
        "Verificar se há sombreamento adequado da unidade externa",
      ],
      image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=400&h=300&fit=crop",
    },
    {
      brand: "Midea",
      code: "E4",
      description: "Proteção de baixa pressão",
      causes: [
        "Falta de gás refrigerante",
        "Vazamento no sistema",
        "Filtro secador entupido",
        "Válvula de expansão com defeito",
      ],
      solutions: [
        "Localizar e reparar vazamentos",
        "Completar carga de gás",
        "Substituir filtro secador",
        "Verificar válvula de expansão",
      ],
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    },
    {
      brand: "Daikin",
      code: "A3",
      description: "Nível de drenagem anormal",
      causes: [
        "Dreno entupido por sujeira ou lodo",
        "Bomba de drenagem com defeito",
        "Sensor de nível danificado",
        "Mangueira de dreno mal instalada",
      ],
      solutions: [
        "Limpar dreno com água e ar comprimido",
        "Testar bomba de drenagem",
        "Verificar sensor de nível",
        "Corrigir instalação da mangueira de dreno",
      ],
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    },
    {
      brand: "Daikin",
      code: "A6",
      description: "Erro no motor do ventilador",
      causes: [
        "Motor travado ou com rolamento defeituoso",
        "Capacitor do motor queimado",
        "Placa eletrônica com defeito",
      ],
      solutions: [
        "Verificar se o motor gira livremente",
        "Testar e substituir capacitor",
        "Verificar alimentação elétrica do motor",
      ],
      image: "https://images.unsplash.com/photo-1635674894249-0e92a0bc8d6f?w=400&h=300&fit=crop",
    },
    {
      brand: "Carrier",
      code: "F0",
      description: "Erro no sensor de temperatura externa",
      causes: [
        "Sensor desconectado ou com mau contato",
        "Sensor em curto-circuito",
        "Fiação danificada por roedores ou intempéries",
        "Sensor descalibrado",
      ],
      solutions: [
        "Verificar conexões e chicote elétrico",
        "Testar resistência do sensor",
        "Substituir sensor se necessário",
        "Proteger fiação contra danos externos",
      ],
      image: "https://images.unsplash.com/photo-1635674894249-0e92a0bc8d6f?w=400&h=300&fit=crop",
    },
    {
      brand: "Carrier",
      code: "F1",
      description: "Erro no sensor de temperatura do evaporador",
      causes: [
        "Sensor mal posicionado",
        "Sensor danificado por gelo",
        "Conexão oxidada",
      ],
      solutions: [
        "Reposicionar sensor corretamente",
        "Limpar e secar sensor",
        "Substituir se necessário",
      ],
      image: "https://images.unsplash.com/photo-1631545806609-4b0e1b0b1b0a?w=400&h=300&fit=crop",
    },
    {
      brand: "Gree",
      code: "E6",
      description: "Erro de comunicação interna",
      causes: [
        "Interferência eletromagnética",
        "Cabo de comunicação danificado",
        "Placa eletrônica com defeito",
      ],
      solutions: [
        "Afastar cabos de fontes de interferência",
        "Verificar integridade dos cabos",
        "Testar placas eletrônicas",
      ],
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=300&fit=crop",
    },
    {
      brand: "Gree",
      code: "F0",
      description: "Proteção do compressor",
      causes: [
        "Sobrecarga elétrica",
        "Compressor travado",
        "Falta de fase",
        "Tensão inadequada",
      ],
      solutions: [
        "Verificar tensão de alimentação",
        "Testar compressor",
        "Verificar protetor térmico",
        "Verificar capacitor de partida",
      ],
      image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=400&h=300&fit=crop",
    },
    {
      brand: "Electrolux",
      code: "E0",
      description: "Erro no sensor de temperatura ambiente",
      causes: [
        "Sensor desconectado",
        "Sensor em curto",
        "Placa eletrônica defeituosa",
      ],
      solutions: [
        "Verificar conexões",
        "Testar sensor com multímetro",
        "Substituir sensor ou placa",
      ],
      image: "https://images.unsplash.com/photo-1631545806609-4b0e1b0b1b0a?w=400&h=300&fit=crop",
    },
    {
      brand: "Electrolux",
      code: "E5",
      description: "Proteção de sobrecorrente",
      causes: [
        "Compressor com defeito",
        "Tensão inadequada",
        "Curto-circuito no sistema",
      ],
      solutions: [
        "Verificar corrente do compressor",
        "Medir tensão de alimentação",
        "Verificar isolamento elétrico",
      ],
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    },
    {
      brand: "Fujitsu",
      code: "E6",
      description: "Erro de comunicação",
      causes: [
        "Cabo de comunicação invertido",
        "Interferência elétrica",
        "Placa com defeito",
      ],
      solutions: [
        "Verificar polaridade dos cabos",
        "Usar cabo blindado",
        "Testar placas",
      ],
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=300&fit=crop",
    },
  ];

  const brands = ["all", ...Array.from(new Set(errorCodes.map((e) => e.brand)))];

  const filteredErrors = errorCodes.filter((error) => {
    const matchesSearch =
      error.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand = selectedBrand === "all" || error.brand === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Códigos de Erro</h1>
        <p className="text-gray-600">
          Base completa de códigos de erro de todas as marcas com soluções detalhadas
        </p>
      </div>

      {/* Filtros e Pesquisa */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Código de Erro</CardTitle>
          <CardDescription>
            Pesquise por código, marca ou descrição do problema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Ex: E1, CH01, sensor temperatura..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full md:w-[200px]">
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
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {filteredErrors.length} resultado(s) encontrado(s)
          </h2>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4 pr-4">
            {filteredErrors.map((error, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row">
                  {/* Imagem */}
                  <div className="lg:w-64 h-48 lg:h-auto">
                    <img
                      src={error.image}
                      alt={error.code}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge className="mb-2 bg-blue-600">{error.brand}</Badge>
                        <h3 className="text-2xl font-bold text-blue-600">{error.code}</h3>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 text-lg">{error.description}</p>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="causes">
                        <AccordionTrigger className="text-left">
                          <span className="font-semibold">Possíveis Causas</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside space-y-2">
                            {error.causes.map((cause, i) => (
                              <li key={i} className="text-gray-600">
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="solutions">
                        <AccordionTrigger className="text-left">
                          <span className="font-semibold text-green-600">
                            Soluções Recomendadas
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ol className="list-decimal list-inside space-y-2">
                            {error.solutions.map((solution, i) => (
                              <li key={i} className="text-gray-600">
                                {solution}
                              </li>
                            ))}
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </Card>
            ))}

            {filteredErrors.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500 text-lg">
                    Nenhum código de erro encontrado com os filtros aplicados.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Tente ajustar sua pesquisa ou filtros.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
