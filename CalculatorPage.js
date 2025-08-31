
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import CalculatorForm from "../components/calculator/CalculatorForm";
import ConsortiumResults from "../components/calculator/ConsortiumResults";
import FinancingResults from "../components/calculator/FinancingResults";
import ComparisonSummary from "../components/calculator/ComparisonSummary";

export default function CalculatorPage() {
    const [formData, setFormData] = useState({
        valorCredito: 120000,
        prazo: 240,
        taxaAdm: 26.80,
        fundoReserva: 2.00,
        antecipacao1: 0.10,
        antecipacao2a12: 0.10,
        lanceEmbutido: 25.00,
        lanceProprio: 25.00,
        // Financiamento
        entrada: 20000,
        taxaJuros: 1.2
    });

    const [results, setResults] = useState(null);

    const calculateResults = useCallback(() => {
        const {
            valorCredito,
            prazo,
            taxaAdm,
            fundoReserva,
            antecipacao1,
            antecipacao2a12,
            lanceEmbutido,
            lanceProprio,
            entrada,
            taxaJuros
        } = formData;

        // Proteção contra valores inválidos
        if (valorCredito <= 0 || prazo <= 0) {
            setResults(null);
            return;
        }

        // --- Cálculos do Consórcio (baseados na planilha) ---
        const taxaAdmDec = taxaAdm / 100;
        const fundoReservaDec = fundoReserva / 100;
        const antecipacao1Dec = antecipacao1 / 100;
        const antecipacao2a12Dec = antecipacao2a12 / 100;
        const lanceEmbutidoDec = lanceEmbutido / 100;

        const valorTaxaAdm = valorCredito * taxaAdmDec;
        const valorFundoReserva = valorCredito * fundoReservaDec;
        const valorAntecipacao1 = valorCredito * antecipacao1Dec;
        const valorAntecipacao2a12 = valorCredito * antecipacao2a12Dec;
        const valorLanceEmbutido = valorCredito * lanceEmbutidoDec;
        const valorLanceProprio = (valorCredito * lanceProprio) / 100;

        // Crédito liberado = Valor do crédito - Lance embutido (conforme planilha)
        const creditoLiberado = valorCredito - valorLanceEmbutido;

        // Fórmula da "Demais Parcelas" da planilha: (Valor Crédito + Valor Taxa Adm + 50% Valor Fundo Reserva - 50% Valor Crédito) / Prazo
        const demaisParcelas = (valorCredito + valorTaxaAdm + (0.5 * valorFundoReserva) - (0.5 * valorCredito)) / prazo;
        
        const primeiraParcela = demaisParcelas + valorAntecipacao1;
        const segundaA12Parcela = demaisParcelas + valorAntecipacao2a12;

        // Custo total do consórcio
        const custoTotalConsorcio = primeiraParcela + (segundaA12Parcela * 11) + (demaisParcelas * (prazo - 12));
        
        // Custo a.m. da planilha: (Taxa Adm Total / Prazo)
        const custoAoMes = (taxaAdm / prazo); // ex: 26.80 / 240 = 0.1116...

        // --- Cálculos do Financiamento ---
        const valorFinanciado = valorCredito - entrada;
        const taxaMensal = taxaJuros / 100;
        
        let parcelaFinanciamento = 0;
        if (valorFinanciado > 0 && taxaMensal > 0) {
            parcelaFinanciamento = (valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -prazo));
        } else if (valorFinanciado > 0) {
            parcelaFinanciamento = valorFinanciado / prazo;
        }
        
        const custoTotalFinanciamento = (parcelaFinanciamento * prazo) + entrada;
        const jurosTotais = valorFinanciado > 0 ? custoTotalFinanciamento - valorCredito : 0;

        setResults({
            consorcio: {
                valorCredito,
                creditoLiberado,
                primeiraParcela,
                segundaA12Parcela,
                demaisParcelas,
                custoTotal: custoTotalConsorcio,
                custoAoMes,
                valorTaxaAdm,
                valorFundoReserva,
                valorLanceProprio,
                economia: custoTotalFinanciamento - custoTotalConsorcio,
                economiaPercentual: custoTotalFinanciamento > 0 ? ((custoTotalFinanciamento - custoTotalConsorcio) / custoTotalFinanciamento) * 100 : 100,
            },
            financiamento: {
                valorFinanciado,
                parcelaMensal: parcelaFinanciamento,
                custoTotal: custoTotalFinanciamento,
                jurosPagos: jurosTotais
            }
        });
    }, [formData]);

    useEffect(() => {
        calculateResults();
    }, [calculateResults]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/57ef2a02a_baixados.jpg" 
                            alt="América Financeira" 
                            className="w-16 h-16 object-contain rounded-md"
                        />
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                                Calculadora América Financeira
                            </h1>
                            <p className="text-gray-500 mt-1 text-sm sm:text-base">
                                Compare consórcio e financiamento
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <CalculatorForm 
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        {results ? (
                            <motion.div
                                key={JSON.stringify(results)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <ComparisonSummary results={results} />
                                <div className="grid md:grid-cols-2 gap-6">
                                    <ConsortiumResults data={results.consorcio} />
                                    <FinancingResults data={results.financiamento} formData={formData} />
                                </div>
                            </motion.div>
                        ) : (
                             <div className="text-center p-8 text-gray-500">Aguardando dados válidos...</div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                     <h3 className="font-bold text-xl mb-2">América Financeira</h3>
                    <p className="text-gray-300 mb-4">
                        Realizando seus sonhos com as melhores condições do mercado.
                    </p>
                     <h4 className="font-semibold mb-2">Contato (WhatsApp)</h4>
                    <div className="flex justify-center gap-4 text-gray-200">
                        <p>(16) 99651-0984</p>
                        <p>(11) 93022-4318</p>
                    </div>
                    <div className="border-t border-gray-700 mt-6 pt-6 text-gray-400 text-sm">
                        <p>&copy; 2024 América Financeira. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
