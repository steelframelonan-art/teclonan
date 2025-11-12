"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Wrench,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  dataCadastro: string;
  ultimoServico: string;
  totalServicos: number;
  equipamentos: string[];
}

interface Servico {
  id: number;
  clienteId: number;
  data: string;
  tipo: string;
  equipamento: string;
  descricao: string;
  valor: string;
  status: "Concluído" | "Pendente" | "Agendado";
}

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Formulário de novo cliente
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    cidade: "",
  });

  // Base de dados de clientes
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao.silva@email.com",
      endereco: "Rua das Flores, 123",
      cidade: "São Paulo - SP",
      dataCadastro: "2023-06-15",
      ultimoServico: "2024-01-10",
      totalServicos: 5,
      equipamentos: ["Split 12000 BTU LG", "Split 9000 BTU Samsung"],
    },
    {
      id: 2,
      nome: "Maria Santos",
      telefone: "(11) 97654-3210",
      email: "maria.santos@email.com",
      endereco: "Av. Paulista, 1000",
      cidade: "São Paulo - SP",
      dataCadastro: "2023-08-22",
      ultimoServico: "2024-01-08",
      totalServicos: 3,
      equipamentos: ["Cassete 18000 BTU Carrier"],
    },
    {
      id: 3,
      nome: "Pedro Oliveira",
      telefone: "(11) 96543-2109",
      email: "pedro.oliveira@email.com",
      endereco: "Rua Augusta, 456",
      cidade: "São Paulo - SP",
      dataCadastro: "2023-09-10",
      ultimoServico: "2024-01-05",
      totalServicos: 8,
      equipamentos: ["VRF Daikin 48000 BTU", "Split 12000 BTU Midea"],
    },
    {
      id: 4,
      nome: "Ana Costa",
      telefone: "(11) 95432-1098",
      email: "ana.costa@email.com",
      endereco: "Rua Oscar Freire, 789",
      cidade: "São Paulo - SP",
      dataCadastro: "2023-10-05",
      ultimoServico: "2023-12-20",
      totalServicos: 2,
      equipamentos: ["Split 9000 BTU Gree"],
    },
    {
      id: 5,
      nome: "Carlos Mendes",
      telefone: "(11) 94321-0987",
      email: "carlos.mendes@email.com",
      endereco: "Av. Faria Lima, 2000",
      cidade: "São Paulo - SP",
      dataCadastro: "2023-11-12",
      ultimoServico: "2024-01-12",
      totalServicos: 6,
      equipamentos: ["Piso Teto 24000 BTU Electrolux", "Split 18000 BTU LG"],
    },
  ]);

  // Histórico de serviços
  const servicos: Servico[] = [
    {
      id: 1,
      clienteId: 1,
      data: "2024-01-10",
      tipo: "Manutenção Preventiva",
      equipamento: "Split 12000 BTU LG",
      descricao: "Limpeza completa, troca de filtros e verificação de gás",
      valor: "R$ 150,00",
      status: "Concluído",
    },
    {
      id: 2,
      clienteId: 1,
      data: "2023-12-05",
      tipo: "Reparo",
      equipamento: "Split 9000 BTU Samsung",
      descricao: "Troca de capacitor e limpeza do condensador",
      valor: "R$ 280,00",
      status: "Concluído",
    },
    {
      id: 3,
      clienteId: 1,
      data: "2024-02-15",
      tipo: "Instalação",
      equipamento: "Split 12000 BTU LG",
      descricao: "Instalação de novo equipamento",
      valor: "R$ 450,00",
      status: "Agendado",
    },
  ];

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCliente = () => {
    if (novoCliente.nome && novoCliente.telefone) {
      const newCliente: Cliente = {
        id: clientes.length + 1,
        ...novoCliente,
        dataCadastro: new Date().toISOString().split("T")[0],
        ultimoServico: "-",
        totalServicos: 0,
        equipamentos: [],
      };

      setClientes([...clientes, newCliente]);
      setNovoCliente({
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
        cidade: "",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleViewCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsViewDialogOpen(true);
  };

  const handleDeleteCliente = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão de Clientes</h1>
          <p className="text-gray-600">
            Gerencie seus clientes e histórico de serviços
          </p>
        </div>

        {/* Botão Adicionar Cliente */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do cliente para adicionar ao sistema
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    placeholder="Ex: João Silva"
                    value={novoCliente.nome}
                    onChange={(e) =>
                      setNovoCliente({ ...novoCliente, nome: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    placeholder="(11) 98765-4321"
                    value={novoCliente.telefone}
                    onChange={(e) =>
                      setNovoCliente({ ...novoCliente, telefone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="cliente@email.com"
                    value={novoCliente.email}
                    onChange={(e) =>
                      setNovoCliente({ ...novoCliente, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    placeholder="São Paulo - SP"
                    value={novoCliente.cidade}
                    onChange={(e) =>
                      setNovoCliente({ ...novoCliente, cidade: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Textarea
                  id="endereco"
                  placeholder="Rua, número, complemento, bairro"
                  rows={3}
                  value={novoCliente.endereco}
                  onChange={(e) =>
                    setNovoCliente({ ...novoCliente, endereco: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddCliente}>Cadastrar Cliente</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{clientes.length}</p>
                <p className="text-sm text-gray-600">Total de Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Wrench className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {clientes.reduce((acc, c) => acc + c.totalServicos, 0)}
                </p>
                <p className="text-sm text-gray-600">Serviços Realizados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Serviços Este Mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-600">Cidades Atendidas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Pesquisa */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar por nome, telefone, e-mail ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Cadastrados ({filteredClientes.length})</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os seus clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4 pr-4">
              {filteredClientes.map((cliente) => (
                <Card key={cliente.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-blue-600 text-white text-xl">
                          {cliente.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Informações */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{cliente.nome}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {cliente.telefone}
                              </span>
                              {cliente.email && (
                                <span className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" />
                                  {cliente.email}
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge>{cliente.totalServicos} serviços</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {cliente.endereco}, {cliente.cidade}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Último serviço: {cliente.ultimoServico}
                          </span>
                        </div>

                        {/* Equipamentos */}
                        {cliente.equipamentos.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-semibold mb-1">Equipamentos:</p>
                            <div className="flex flex-wrap gap-2">
                              {cliente.equipamentos.map((eq, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {eq}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Ações */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewCliente(cliente)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver Detalhes
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Plus className="w-4 h-4 mr-1" />
                            Novo Serviço
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteCliente(cliente.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes do Cliente */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedCliente && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCliente.nome}</DialogTitle>
                <DialogDescription>
                  Cliente desde {selectedCliente.dataCadastro}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Informações de Contato */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span>{selectedCliente.telefone}</span>
                    </div>
                    {selectedCliente.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        <span>{selectedCliente.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span>
                        {selectedCliente.endereco}, {selectedCliente.cidade}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Histórico de Serviços */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Histórico de Serviços</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Equipamento</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {servicos
                          .filter((s) => s.clienteId === selectedCliente.id)
                          .map((servico) => (
                            <TableRow key={servico.id}>
                              <TableCell>{servico.data}</TableCell>
                              <TableCell>{servico.tipo}</TableCell>
                              <TableCell>{servico.equipamento}</TableCell>
                              <TableCell>{servico.valor}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    servico.status === "Concluído"
                                      ? "default"
                                      : servico.status === "Agendado"
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {servico.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
