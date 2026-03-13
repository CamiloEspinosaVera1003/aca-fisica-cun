import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    mass1: string; setMass1: (val: string) => void;
    mass2: string; setMass2: (val: string) => void;
    scenario: number; setScenario: (val: number) => void;
    onStart: () => void;
}

export default function ConfigScreen({ mass1, setMass1, mass2, setMass2, scenario, setScenario, onStart }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Motor Físico: Air Hockey</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Masa del Mazo (kg):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={mass1}
                    onChangeText={setMass1}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Masa del Disco (kg):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={mass2}
                    onChangeText={setMass2}
                />
            </View>

            <Text style={styles.subtitle}>Selecciona la Prueba:</Text>
            {[
                { id: 1, name: '1. Saque Descentrado (Elástico)' },
                { id: 2, name: '2. Intercepción en Movimiento' },
                { id: 3, name: '3. Disco Pegajoso (Inelástico)' },
            ].map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={[styles.scenarioButton, scenario === item.id && styles.scenarioButtonActive]}
                    onPress={() => setScenario(item.id)}
                >
                    <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.startButton} onPress={onStart}>
                <Text style={styles.startButtonText}>INICIAR SIMULACIÓN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 30, textAlign: 'center' },
    subtitle: { fontSize: 18, color: '#aaa', marginTop: 20, marginBottom: 10 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    label: { color: '#fff', fontSize: 16, width: 160 },
    input: { backgroundColor: '#333', color: '#fff', width: 100, padding: 10, borderRadius: 5, textAlign: 'center' },
    scenarioButton: { backgroundColor: '#444', padding: 15, borderRadius: 8, width: '100%', marginBottom: 10, alignItems: 'center' },
    scenarioButtonActive: { backgroundColor: '#00bcd4', borderWidth: 2, borderColor: '#fff' },
    buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
    startButton: { backgroundColor: '#4caf50', padding: 20, borderRadius: 10, width: '100%', marginTop: 30, alignItems: 'center' },
    startButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});