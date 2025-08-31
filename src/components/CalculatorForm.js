
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, DollarSign, Calendar, Percent, TrendingUp, Target, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function CalculatorForm({ formData, setFormData }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const parseCurrency = (value) => {
        return Number(String(value).replace(/\D/g, '')) / 100 || 0;
    };

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
        >
            <Card className="shadow-lg border-gray-200">
                <CardHeader className="bg-red-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3">
                        <Settings className="w-5 h-5" />
                        Parâmetros da Simulação
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="valorCredito" className="flex items-center gap-2 font-semibold text-red-600 text-sm">
                            <DollarSign className="w-4 h-4" /> VALOR CRÉDITO
                        </Label>
                        <Input
                            id="valorCredito"
                            value={formatCurrency(formData.valorCredito)}
                            onChange={(e) => handleInputChange('valorCredito', parseCurrency(e.target.value))}
                            className="text-base font-semibold border-red-200 focus:border-red-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 font-semibold text-red-600 text-sm">
                            <Calendar className="w-4 h-4" /> PRAZO
                        </Label>
                        <Select onValueChange={(value) => handleInputChange('prazo', Number(value))} value={String(formData.prazo)}>
                            <SelectTrigger className="text-base border-red-200 focus:border-red-400">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="200">200 meses</SelectItem>
                                <SelectItem value="220">220 meses</SelectItem>
                                <SelectItem value="240">240 meses</SelectItem>
                                <SelectItem value="100">100 meses (Auto)</SelectItem>
                                <SelectItem value="40">40 meses (Serviços)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="taxaAdm" className="font-semibold text-red-600 text-xs">
                                TAXA ADM (%)
                            </Label>
                            <Input
                                id="taxaAdm"
                                type="number"
                                step="0.01"
                                value={formData.taxaAdm}
                                onChange={(e) => handleInputChange('taxaAdm', parseFloat(e.target.value) || 0)}
                                className="text-sm font-semibold border-red-200"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="fundoReserva" className="font-semibold text-red-600 text-xs">
                                FUNDO RESERVA (%)
                            </Label>
                            <Input
                                id="fundoReserva"
                                type="number"
                                step="0.01"
                                value={formData.fundoReserva}
                                onChange={(e) => handleInputChange('fundoReserva', parseFloat(e.target.value) || 0)}
                                className="text-sm font-semibold border-red-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="taxaAdesao" className="flex items-center gap-2 font-semibold text-red-600 text-sm">
                            <CreditCard className="w-4 h-4" /> TAXA DE ADESÃO (%)
                        </Label>
                        <Input
                            id="taxaAdesao"
                            type="number"
                            step="0.1"
                            value={formData.taxaAdesao}
                            onChange={(e) => handleInputChange('taxaAdesao', parseFloat(e.target.value) || 0)}
                            className="text-base font-semibold border-red-200 focus:border-red-400"
                            placeholder="1,2% ou 2%"
                        />
                        <div className="text-xs text-gray-600">
                            Diluída nas 12 primeiras parcelas
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="antecipacao1" className="font-semibold text-red-600 text-xs">
                                ANTEC. 1ª PARC. (%)
                            </Label>
                            <Input
                                id="antecipacao1"
                                type="number"
                                step="0.01"
                                value={formData.antecipacao1}
                                onChange={(e) => handleInputChange('antecipacao1', parseFloat(e.target.value) || 0)}
                                className="text-sm font-semibold border-red-200"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="antecipacao2a12" className="font-semibold text-red-600 text-xs">
                                ANTEC. 2ª-12ª (%)
                            </Label>
                            <Input
                                id="antecipacao2a12"
                                type="number"
                                step="0.01"
                                value={formData.antecipacao2a12}
                                onChange={(e) => handleInputChange('antecipacao2a12', parseFloat(e.target.value) || 0)}
                                className="text-sm font-semibold border-red-200"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="lanceEmbutido" className="font-semibold text-red-600 text-xs">
                                LANCE EMBUTIDO (%)
                            </Label>
                            <Input
                                id="lanceEmbutido"
                                type="number"
                                step="0.01"
                                value={formData.lanceEmbutido}
                                onChange={(e) => handleInputChange('lanceEmbutido', parseFloat(e.target.value) || 0)}
                                className="text-sm font-semibold border-red-200"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="lanceProprio" className="font-semibold text-red-600 text-xs">
                                LANCE PRÓPRIO (%)
                            </Label>
                            <Input
                                id="lanceProprio"
                                type="number"
                                step="0.01"
                                value={formData.lanceProprio}
                                onChange={(e) => handleInputChange('lanceProprio', parseFloat(e.target.value) || 0)}
                                className="text-sm font-semibold border-red-200"
                            />
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                        * Lance próprio abate do saldo devedor pós-contemplação
                    </div>

                    {/* Comparação Financiamento */}
                    <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-700 mb-3 text-sm">Para Comparação - Financiamento</h4>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label htmlFor="entrada" className="font-semibold text-blue-600 text-xs">
                                    Entrada
                                </Label>
                                <Input
                                    id="entrada"
                                    value={formatCurrency(formData.entrada)}
                                    onChange={(e) => handleInputChange('entrada', parseCurrency(e.target.value))}
                                    className="text-sm font-semibold"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="taxaJuros" className="font-semibold text-blue-600 text-xs">
                                    Juros (% a.m.)
                                </Label>
                                <Input
                                    id="taxaJuros"
                                    type="number"
                                    step="0.01"
                                    value={formData.taxaJuros}
                                    onChange={(e) => handleInputChange('taxaJuros', parseFloat(e.target.value) || 0)}
                                    className="text-sm font-semibold"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
