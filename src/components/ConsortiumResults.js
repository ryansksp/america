
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, CheckCircle, TrendingUp } from "lucide-react"; // Removed Calendar import as it's no longer used

export default function ConsortiumResults({ data }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    if (!data) return null;

    return (
        <Card className="h-full shadow-lg border-t-4 border-t-green-500 bg-white">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PiggyBank className="w-5 h-5 text-green-600" />
                        <span className="text-gray-800 text-lg">Consórcio</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border border-green-200 text-xs">Recomendado</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
                {/* Crédito Liberado */}
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800 text-sm">CRÉDITO LIBERADO</span>
                    </div>
                    <div className="text-xl font-bold text-green-600">
                        {formatCurrency(data.creditoLiberado)}
                    </div>
                </div>

                {/* Parcelas */}
                <div className="space-y-2">
                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-600">1ª PARCELA</div>
                        <div className="text-lg font-bold text-gray-800">
                            {formatCurrency(data.primeiraParcela)}
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-600">2ª à 12ª PARCELA</div>
                        <div className="text-lg font-bold text-gray-800">
                            {formatCurrency(data.segundaA12Parcela)}
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-600">DEMAIS PARCELAS</div>
                        <div className="text-lg font-bold text-gray-800">
                            {formatCurrency(data.demaisParcelas)}
                        </div>
                    </div>
                </div>

                {/* Informações adicionais */}
                <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Lance Próprio:</span>
                        <span className="font-semibold">{formatCurrency(data.valorLanceProprio)}</span>
                    </div>
                    <div className="text-xs text-gray-500 italic">
                        * Lance próprio abate saldo devedor pós-contemplação
                    </div>
                </div>

                {/* Custo a.m. */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">CUSTO a.m.</span>
                    </div>
                    <div className="text-lg font-bold text-gray-600">
                        {data.custoAoMes.toFixed(2)}%
                    </div>
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
