import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import ConfigScreen from './src/screens/ConfigScreen';
import SimScreen from './src/screens/SimScreen';
import ResultsScreen from './src/screens/ResultsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'config' | 'sim' | 'results'>('config');

  // Estado global de la simulación
  const [mass1, setMass1] = useState<string>('0.50');
  const [mass2, setMass2] = useState<string>('0.20');
  const [scenario, setScenario] = useState<number>(1);
  const [results, setResults] = useState<any>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'config':
      default:
        return (
          <ConfigScreen
            mass1={mass1} setMass1={setMass1}
            mass2={mass2} setMass2={setMass2}
            scenario={scenario} setScenario={setScenario}
            onStart={() => setCurrentScreen('sim')}
          />
        );
      case 'sim':
        return (
          <SimScreen
            mass1={mass1} mass2={mass2} scenario={scenario}
            onFinish={(data) => {
              setResults(data);
              setCurrentScreen('results');
            }}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            results={results}
            onRetry={() => {
              setResults(null);
              setCurrentScreen('config');
            }}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
});