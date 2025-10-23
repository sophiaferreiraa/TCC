import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Perfil() {
  // Estados do usuário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);

  // Funções de ação
  const salvarAlteracoes = () => {
    Alert.alert("Sucesso", "As alterações foram salvas!");
    console.log("Nome:", nome, "E-mail:", email);
  };

  const alterarFoto = () => {
    Alert.alert("Alterar Foto", "Aqui você poderá selecionar uma nova foto.");
  };

  const alterarSenha = () => {
    Alert.alert("Alterar Senha", "Funcionalidade de alterar senha ativada!");
  };

  const gerenciarContas = () => {
    Alert.alert("Contas Conectadas", "Funcionalidade de gerenciar contas ativada!");
  };

  const sair = () => Alert.alert("Sair", "Você foi desconectado.");

  // Cores dinâmicas para modo claro/escuro
  const colors = {
    background: modoEscuro ? "#0D1B2A" : "#FFF", // Azul-marinho no modo escuro
    text: modoEscuro ? "#E0E0E0" : "#333", // Texto claro no modo escuro
    inputBackground: modoEscuro ? "#1B2A44" : "#FFF", // Inputs levemente mais claros
    borderColor: modoEscuro ? "#334756" : "#CCC", // Bordas dos inputs
    blueButton: "#007BFF", // Azul padrão dos toggles e links
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Ícone da Foto */}
      <View style={styles.topSection}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: modoEscuro ? "#334756" : "#DDD" },
          ]}
        >
          <Text style={[styles.iconText, { color: colors.text }]}></Text>
        </View>

        {/* Botão Alterar Foto */}
        <TouchableOpacity onPress={alterarFoto} style={{ marginTop: 10 }}>
          <Text style={{ color: colors.blueButton, fontSize: 14, fontWeight: "500" }}>
            Alterar Foto
          </Text>
        </TouchableOpacity>

        {/* Campos Nome e E-mail lado a lado */}
        <View style={styles.inputsRow}>
          <View style={styles.inputWrapper}>
            <Text style={[styles.label, { color: colors.text }]}>Nome</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.borderColor,
                  color: colors.text,
                },
              ]}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
              placeholderTextColor={modoEscuro ? "#AAA" : "#999"}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={[styles.label, { color: colors.text }]}>E-mail</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.borderColor,
                  color: colors.text,
                },
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              placeholderTextColor={modoEscuro ? "#AAA" : "#999"}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.blueButton }]}
          onPress={salvarAlteracoes}
        >
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>

      {/* Minha Conta */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Minha Conta</Text>
        <View style={[styles.divider, { backgroundColor: colors.borderColor }]} />
        <TouchableOpacity style={styles.row} onPress={alterarSenha}>
          <Text style={[styles.rowText, { color: colors.text }]}>Alterar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={gerenciarContas}>
          <Text style={[styles.rowText, { color: colors.text }]}>Contas Conectadas</Text>
        </TouchableOpacity>
      </View>

      {/* Configurações do Aplicativo */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Configurações do Aplicativo</Text>
        <View style={styles.row}>
          <Text style={[styles.rowText, { color: colors.text }]}>Notificações Push</Text>
          <Switch
            value={notificacoes}
            onValueChange={setNotificacoes}
            trackColor={{ false: "#555", true: colors.blueButton }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.rowText, { color: colors.text }]}>Modo Escuro</Text>
          <Switch
            value={modoEscuro}
            onValueChange={setModoEscuro}
            trackColor={{ false: "#CCC", true: colors.blueButton }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Ações da Conta */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.row, { backgroundColor: "transparent" }]}
          onPress={sair}
        >
          <Text style={[styles.rowText, { color: colors.blueButton }]}>Sair / Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 36,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: "90%",
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  rowText: {
    fontSize: 16,
  },
});
