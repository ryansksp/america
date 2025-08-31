import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, TrendingUp, DollarSign, Calendar, Percent } from "lucide-react";

export default function FinancingResults({ data, formData }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    if (!data) return null;

    return (
        <Card className="h-full shadow-lg border-t-4 border-t-red-500 bg-white">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-red-600" />
                        <span className="text-gray-800 text-lg">Financiamento</span>
                    </div>
                    <Badge variant="outline" className="border-red-300 text-red-700 text-xs">Tradicional</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
                {/* Parcela Mensal */}
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-red-800 text-sm">PARCELA MENSAL</span>
                    </div>
                    <div className="text-xl font-bold text-red-600">
                        {formatCurrency(data.parcelaMensal)}
                    </div>
                </div>

                {/* Informações detalhadas */}
                <div className="space-y-2">
                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-600">VALOR FINANCIADO</div>
                        <div className="text-lg font-bold text-gray-800">
                            {formatCurrency(data.valorFinanciado)}
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-600">ENTRADA</div>
                        <div className="text-lg font-bold text-gray-800">
                            {formatCurrency(formData.entrada)}
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-600">TAXA DE JUROS</div>
                        <div className="text-lg font-bold text-gray-800">
                            {formData.taxaJuros.toFixed(2)}% a.m.
                        </div>
                    </div>
                </div>

                {/* Custos adicionais */}
                <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Prazo:</span>
                        <span className="font-semibold">{formData.prazo} meses</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Total de Juros:</span>
                        <span className="font-semibold text-red-600">{formatCurrency(data.jurosPagos)}</span>
                    </div>
                </div>

                {/* Características */}
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                        <Percent className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-orange-800">CARACTERÍSTICAS</span>
                    </div>
                    <ul className="text-xs text-orange-700 space-y-1">
                        <li>• Juros compostos aplicados</li>
                        <li>• Liberação imediata do bem</li>
                        <li>• Análise de crédito rigorosa</li>
                        <li>• Parcelas fixas mensais</li>
                    </ul>
                </div>

                {/* Custo Total */}
                <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-sm">Custo Total</span>
                        <span className="font-bold text-lg text-gray-800">
                            {formatCurrency(data.custoTotal)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}