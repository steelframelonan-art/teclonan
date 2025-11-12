"use client";

import { useState } from "react";
import { Calculator as CalcIcon, Droplet, Ruler, ArrowRightLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Calculadora() {
  // Estados para Carga de Gás
  const [capacidadeBTU, setCapacidadeBTU] = useState("");
  const [tipoGas, setTipoGas] = useState("R410A");
  const [distanciaTubulacao, setDistanciaTubulacao] = useState("");
  const [cargaGasResult, setCargaGasResult] = useState<string | null>(null);

  // Estados para Perda de Carga
  const [diametroTubo, setDiametroTubo] = useState("");
  const [comprimentoTubo, setComprimentoTubo] = useState("");
  const [numeroCurvas, setNumeroCurvas] = useState("");
  const [perdaCargaResult, setPerdaCargaResult] = useState<string | null>(null);

  // Estados para Conversão de Unidades
  const [valorConversao, setValorConversao] = useState("");
  const [tipoConversao, setTipoConversao] = useState("psi-bar");
  const [conversaoResult, setConversaoResult] = useState<string | null>(null);

  // Cálculo de Carga de Gás
  const calcularCargaGas = () => {
    const btu = parseFloat(capacidadeBTU);
    const distancia = parseFloat(distanciaTubulacao);

    if (isNaN(btu) || isNaN(distancia)) {
      setCargaGasResult("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Fórmula simplificada: carga base + adicional por metro
    let cargaBase = 0;
    let adicionalPorMetro = 0;

    switch (tipoGas) {
      case "R410A":
        cargaBase = btu / 1000; // kg
        adicionalPorMetro = 0.02; // kg/m
        break;
      case "R22":
        cargaBase = btu / 1200;
        adicionalPorMetro = 0.015;
        break;
      case "R32":
        cargaBase = btu / 1100;
        adicionalPorMetro = 0.018;
        break;
      default:
        cargaBase = btu / 1000;
        adicionalPorMetro = 0.02;
    }

    const cargaAdicional = distancia * adicionalPorMetro;
    const cargaTotal = cargaBase + cargaAdicional;

    setCargaGasResult(
      `Carga Total Estimada: ${cargaTotal.toFixed(2)} kg\n` +
        `Carga Base: ${cargaBase.toFixed(2)} kg\n` +
        `Adicional por Tubulação: ${cargaAdicional.toFixed(2)} kg\n` +
        `Gás: ${tipoGas}`
    );
  };

  // Cálculo de Perda de Carga
  const calcularPerdaCarga = () => {
    const diametro = parseFloat(diametroTubo);
    const comprimento = parseFloat(comprimentoTubo);
    const curvas = parseFloat(numeroCurvas);

    if (isNaN(diametro) || isNaN(comprimento) || isNaN(curvas)) {
      setPerdaCargaResult("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Fórmula simplificada de perda de carga
    const perdaPorMetro = 0.1 * (1 / diametro); // PSI/m
    const perdaCurvas = curvas * 0.5; // PSI por curva
    const perdaTotal = comprimento * perdaPorMetro + perdaCurvas;

    setPerdaCargaResult(
      `Perda de Carga Total: ${perdaTotal.toFixed(2)} PSI\n` +
        `Perda Linear: ${(comprimento * perdaPorMetro).toFixed(2)} PSI\n` +
        `Perda em Curvas: ${perdaCurvas.toFixed(2)} PSI\n` +
        `Comprimento: ${comprimento}m | Diâmetro: ${diametro}mm | Curvas: ${curvas}`
    );
  };

  // Conversão de Unidades
  const converterUnidades = () => {
    const valor = parseFloat(valorConversao);

    if (isNaN(valor)) {
      setConversaoResult("Por favor, insira um valor válido.");
      return;
    }

    let resultado = "";

    switch (tipoConversao) {
      case "psi-bar":
        resultado = `${valor} PSI = ${(valor * 0.0689476).toFixed(4)} Bar`;
        break;
      case "bar-psi":
        resultado = `${valor} Bar = ${(valor * 14.5038).toFixed(2)} PSI`;
        break;
      case "btu-watts":
        resultado = `${valor} BTU/h = ${(valor * 0.293071).toFixed(2)} Watts`;
        break;
      case "watts-btu":
        resultado = `${valor} Watts = ${(valor * 3.41214).toFixed(2)} BTU/h`;
        break;
      case "celsius-fahrenheit":
        resultado = `${valor}°C = ${(valor * 9 / 5 + 32).toFixed(2)}°F`;
        break;
      case "fahrenheit-celsius":
        resultado = `${valor}°F = ${((valor - 32) * 5 / 9).toFixed(2)}°C`;
        break;
      case "kg-lb":
        resultado = `${valor} kg = ${(valor * 2.20462).toFixed(2)} lb`;
        break;
      case "lb-kg":
        resultado = `${valor} lb = ${(valor * 0.453592).toFixed(2)} kg`;
        break;
      default:
        resultado = "Conversão não disponível.";
    }

    setConversaoResult(resultado);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Calculadora Técnica</h1>
        <p className="text-gray-600">
          Ferramentas de cálculo para facilitar seu trabalho no campo
        </p>
      </div>

      {/* Tabs de Calculadoras */}
      <Tabs defaultValue="gas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gas">
            <Droplet className="w-4 h-4 mr-2" />
            Carga de Gás
          </TabsTrigger>
          <TabsTrigger value="perda">
            <Ruler className="w-4 h-4 mr-2" />
            Perda de Carga
          </TabsTrigger>
          <TabsTrigger value="conversao">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Conversão
          </TabsTrigger>
        </TabsList>

        {/* Calculadora de Carga de Gás */}
        <TabsContent value="gas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-blue-600" />
                Cálculo de Carga de Gás Refrigerante
              </CardTitle>
              <CardDescription>
                Calcule a quantidade necessária de gás baseada na capacidade do equipamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacidade-btu">Capacidade do Equipamento (BTU/h)</Label>
                  <Input
                    id="capacidade-btu"
                    type="number"
                    placeholder="Ex: 12000"
                    value={capacidadeBTU}
                    onChange={(e) => setCapacidadeBTU(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo-gas">Tipo de Gás Refrigerante</Label>
                  <Select value={tipoGas} onValueChange={setTipoGas}>
                    <SelectTrigger id="tipo-gas">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="R410A">R410A</SelectItem>
                      <SelectItem value="R22">R22</SelectItem>
                      <SelectItem value="R32">R32</SelectItem>
                      <SelectItem value="R134A">R134A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distancia-tubulacao">
                    Distância da Tubulação (metros)
                  </Label>
                  <Input
                    id="distancia-tubulacao"
                    type="number"
                    placeholder="Ex: 5"
                    value={distanciaTubulacao}
                    onChange={(e) => setDistanciaTubulacao(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calcularCargaGas} className="w-full" size="lg">
                <CalcIcon className="w-4 h-4 mr-2" />
                Calcular Carga de Gás
              </Button>

              {cargaGasResult && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2 text-blue-900">Resultado:</h3>
                    <pre className="whitespace-pre-wrap text-blue-800 font-mono text-sm">
                      {cargaGasResult}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calculadora de Perda de Carga */}
        <TabsContent value="perda">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-purple-600" />
                Cálculo de Perda de Carga em Tubulações
              </CardTitle>
              <CardDescription>
                Calcule a perda de pressão em tubulações de refrigeração
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diametro-tubo">Diâmetro do Tubo (mm)</Label>
                  <Input
                    id="diametro-tubo"
                    type="number"
                    placeholder="Ex: 15.88"
                    value={diametroTubo}
                    onChange={(e) => setDiametroTubo(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comprimento-tubo">Comprimento Total (metros)</Label>
                  <Input
                    id="comprimento-tubo"
                    type="number"
                    placeholder="Ex: 10"
                    value={comprimentoTubo}
                    onChange={(e) => setComprimentoTubo(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numero-curvas">Número de Curvas 90°</Label>
                  <Input
                    id="numero-curvas"
                    type="number"
                    placeholder="Ex: 4"
                    value={numeroCurvas}
                    onChange={(e) => setNumeroCurvas(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calcularPerdaCarga} className="w-full" size="lg">
                <CalcIcon className="w-4 h-4 mr-2" />
                Calcular Perda de Carga
              </Button>

              {perdaCargaResult && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2 text-purple-900">Resultado:</h3>
                    <pre className="whitespace-pre-wrap text-purple-800 font-mono text-sm">
                      {perdaCargaResult}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversor de Unidades */}
        <TabsContent value="conversao">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-green-600" />
                Conversão de Unidades
              </CardTitle>
              <CardDescription>
                Converta entre diferentes unidades de medida usadas em refrigeração
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor-conversao">Valor a Converter</Label>
                  <Input
                    id="valor-conversao"
                    type="number"
                    placeholder="Ex: 100"
                    value={valorConversao}
                    onChange={(e) => setValorConversao(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo-conversao">Tipo de Conversão</Label>
                  <Select value={tipoConversao} onValueChange={setTipoConversao}>
                    <SelectTrigger id="tipo-conversao">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="psi-bar">PSI → Bar</SelectItem>
                      <SelectItem value="bar-psi">Bar → PSI</SelectItem>
                      <SelectItem value="btu-watts">BTU/h → Watts</SelectItem>
                      <SelectItem value="watts-btu">Watts → BTU/h</SelectItem>
                      <SelectItem value="celsius-fahrenheit">°C → °F</SelectItem>
                      <SelectItem value="fahrenheit-celsius">°F → °C</SelectItem>
                      <SelectItem value="kg-lb">kg → lb</SelectItem>
                      <SelectItem value="lb-kg">lb → kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={converterUnidades} className="w-full" size="lg">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Converter
              </Button>

              {conversaoResult && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2 text-green-900">Resultado:</h3>
                    <p className="text-green-800 font-mono text-xl">{conversaoResult}</p>
                  </CardContent>
                </Card>
              )}

              {/* Tabela de Referência Rápida */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-sm">Referência Rápida</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-semibold">Pressão:</p>
                      <p className="text-gray-600">1 Bar = 14.5 PSI</p>
                    </div>
                    <div>
                      <p className="font-semibold">Potência:</p>
                      <p className="text-gray-600">1 kW = 3412 BTU/h</p>
                    </div>
                    <div>
                      <p className="font-semibold">Temperatura:</p>
                      <p className="text-gray-600">0°C = 32°F</p>
                    </div>
                    <div>
                      <p className="font-semibold">Massa:</p>
                      <p className="text-gray-600">1 kg = 2.2 lb</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
