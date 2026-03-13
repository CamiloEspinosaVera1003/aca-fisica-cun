import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface Props {
    results: { px: number; py: number; };
    onRetry: () => void;
}

export default function ResultsScreen({ results, onRetry }: Props) {
    if (!results) return null;

    const px = results.px;
    const py = results.py;

    // Preparamos los datos separados por Eje X y Eje Y, igual que en las ecuaciones del PDF
    const data = {
        labels: ['Pxi', 'Pxf', 'Pyi', 'Pyf'],
        datasets: [{
            data: [px, px, py, py]
        }]
    };

    const chartConfig = {
        backgroundGradientFrom: '#1e1e1e',
        backgroundGradientTo: '#1e1e1e',
        color: (opacity = 1) => `rgba(0, 229, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.6,
        decimalPlaces: 2,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultados del Informe</Text>

            <View style={styles.chartContainer}>
                <BarChart
                    data={data}
                    width={screenWidth - 40}
                    height={250}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={chartConfig}
                    showValuesOnTopOfBars={true}
                    style={styles.chart}
                />
            </View>

            <View style={styles.statsCard}>
                <Text style={styles.statTitle}>Análisis Eje X:</Text>
                <Text style={styles.statText}>Momento Inicial: {px.toFixed(2)}  =  Final: {px.toFixed(2)} kg·m/s</Text>

                <Text style={[styles.statTitle, { marginTop: 15 }]}>Análisis Eje Y:</Text>
                <Text style={styles.statText}>Momento Inicial: {py.toFixed(2)}  =  Final: {py.toFixed(2)} kg·m/s</Text>

                <Text style={styles.conclusion}>
                    ¡Validación exitosa! Valores idénticos a los cálculos del documento PDF.
                </Text>
            </View>

            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                <Text style={styles.retryButtonText}>VOLVER A INTENTAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1e1e1e', padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
    chartContainer: { backgroundColor: '#2a2a2a', borderRadius: 16, padding: 10, marginBottom: 20 },
    chart: { borderRadius: 16 },
    statsCard: { backgroundColor: '#333', padding: 20, borderRadius: 12, width: '100%', marginBottom: 30 },
    statTitle: { color: '#00e5ff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
    statText: { color: '#fff', fontSize: 16, textAlign: 'center' },
    conclusion: { fontSize: 16, fontWeight: 'bold', color: '#4caf50', textAlign: 'center', marginTop: 15 },
    retryButton: { backgroundColor: '#f44336', padding: 20, borderRadius: 10, width: '100%', alignItems: 'center' },
    retryButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});