import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FeedbacksScreen() {
  const { respostas } = useLocalSearchParams<{ respostas?: string }>();
  const respostasParseadas = respostas ? JSON.parse(respostas) : {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Relatório de Feedbacks</Text>

        {Object.keys(respostasParseadas).map((key) => (
          <View key={key} style={styles.card}>
            <Text style={styles.pergunta}>Pergunta {key}:</Text>
            <Text style={styles.resposta}>
              {respostasParseadas[Number(key)].join(', ')}
            </Text>
          </View>
        ))}

        {Object.keys(respostasParseadas).length === 0 && (
          <Text style={styles.semRespostas}>Nenhuma resposta encontrada.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  scrollContainer: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#E9F5FF', borderRadius: 12, padding: 15, marginBottom: 15 },
  pergunta: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  resposta: { fontSize: 16 },
  semRespostas: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
});
