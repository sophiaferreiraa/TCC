import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// NOVO: Importar o useRouter para navegação
import { useRouter } from 'expo-router';

export default function TelaLogin() {
  // NOVO: Inicializar o router
  const router = useRouter();

  const handleLogin = () => {
    // NOVO: Navegar para a tela do questionário ao pressionar o botão
    router.push('/questionario'); 
  };

  return (
    <View style={styles.container}>
      {/* O resto do seu código permanece o mesmo... */}
      <StatusBar barStyle="light-content" />
      <View style={styles.statusBar}>
        <Text style={styles.hora}></Text>
        <View style={styles.statusIcons}>
          <Text style={styles.iconeStatus}></Text>
        </View>
      </View>
      <View style={styles.topBlueArea}>
        <Text style={styles.titulo}>Task Flow</Text>
        <Text style={styles.subtitulo}>Vença a procrastinação!</Text>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.bemVindo}>Bem-Vindo!</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Digite seu email" keyboardType="email-address" />
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />

        {/* NOVO: Adicionado o onPress para chamar a função de login/navegação */}
        <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <View style={styles.registroArea}>
          <Text style={styles.textoRegistro}>Não tem conta?</Text>
          <TouchableOpacity>
            <Text style={styles.linkRegistro}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Seus estilos permanecem os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 40, // Ajuste para status bar
  },
  hora: {
    color: 'white',
    fontSize: 16,
  },
  statusIcons: {
    flexDirection: 'row',
  },
  iconeStatus: {
    color: 'white',
    fontSize: 16,
  },
  topBlueArea: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitulo: {
    fontSize: 16,
    color: 'white',
  },
  bottomCard: {
    flex: 1,
    backgroundColor: '#f4f4f4ff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  bemVindo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botaoEntrar: {
    backgroundColor: '#3399FF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#3399FF',
    textAlign: 'center',
    marginTop: 10,
  },
  registroArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoRegistro: {
    marginRight: 5,
    fontSize: 14,
  },
  linkRegistro: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});