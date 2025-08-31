import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, TrendingDown, Percent } from "lucide-react";
import { motion } from "framer-motion";

export default function ComparisonSummary({ results }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    if (!results) return null;

    const { consorcio } = results;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-xl overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Trophy className="w-7 h-7 text-yellow-400" />
                            <h2 className="text-xl sm:text-2xl font-bold">Consórcio é a Melhor Opção</h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-3 gap-4 text-center mt-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <TrendingDown className="w-7 h-7 mx-auto mb-2 text-green-400" />
                                <div className="text-xl sm:text-2xl font-bold mb-1">
                                    {formatCurrency(consorcio.economia)}
                                </div>
                                <div className="text-gray-300 text-xs sm:text-sm">
                                    Economia Total
                                </div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <Percent className="w-7 h-7 mx-auto mb-2 text-green-400" />
                                <div className="text-xl sm:text-2xl font-bold mb-1">
                                    {consorcio.economiaPercentual.toFixed(1)}%
                                </div>
                                <div className="text-gray-300 text-xs sm:text-sm">
                                    Mais Barato
                                </div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-yellow-400 text-xl sm:text-2xl font-bold mb-2 pt-2">0%</div>
                                <div className="text-gray-300 text-xs sm:text-sm">
                                    de Juros
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}