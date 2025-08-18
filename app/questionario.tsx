import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Estrutura de dados com todas as perguntas e opções
const DADOS_QUESTIONARIO = [
  {
    id: 1,
    pergunta: 'Como a procrastinação afeta seu bem-estar?',
    tipo: 'multi', // multi-seleção
    opcoes: [
      'Sinto-me sobrecarregado(a) e/ou preocupado(a)',
      'Não atinjo as metas/objetivos que estabeleci para mim mesmo',
      'Minha autoestima é afetada',
      'Tenho problemas de sono',
      'Tenho tendência a perder prazos',
      'Perco boas oportunidades',
      'Outros',
    ],
  },
  {
    id: 2,
    pergunta: 'Qual é a maior razão para você adiar tarefas?',
    tipo: 'single', // seleção única
    opcoes: [
      'Estou esperando um esforço de última hora',
      'Assumo tarefas demais ao mesmo tempo',
      'Não quero seguir as regras dos outros',
      'Me preocupo com os riscos',
      'Me perco em ideias',
      'Preciso que tudo esteja perfeito',
      'Nenhuma das anteriores',
    ],
  },
    {
    id: 3,
    pergunta: 'O que te motiva a completar tarefas?',
    tipo: 'multi',
    opcoes: [
      'Pressão externa',
      'Medo das consequências',
      'Objetivos pessoais',
      'Apoio de outras pessoas',
      'Recompensas ou incentivos',
      'Nenhuma das anteriores',
    ],
  },
  {
    id: 4,
    pergunta: 'Há quanto tempo você sente essas dificuldades?',
    tipo: 'single',
    opcoes: [
        'Nos últimos meses',
        'Há alguns anos',
        'Durante toda a minha vida',
        'Não tenho certeza',
    ],
  },
  {
    id: 5,
    pergunta: 'Quais sintomas físicos você sente quando procrastina?',
    tipo: 'multi',
    opcoes: [
      'Dores de cabeça',
      'Falta de energia',
      'Músculos tensos',
      'Inquietação',
      'Problemas de sono',
      'Desconforto no estômago',
      'Nenhum dos anteriores',
    ],
  },
];

export default function QuestionarioScreen() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<number>(1);
  const [respostas, setRespostas] = useState<Record<number, string[]>>({});

  const perguntaAtual = DADOS_QUESTIONARIO[etapa - 1];

  const handleSelect = (opcao: string) => {
    const respostasAtuais = respostas[etapa] || [];
    if (perguntaAtual.tipo === 'single') {
      setRespostas({ ...respostas, [etapa]: [opcao] });
    } else { // multi
      if (respostasAtuais.includes(opcao)) {
        // Desmarcar: remove a opção da lista
        setRespostas({
          ...respostas,
          [etapa]: respostasAtuais.filter((item: string) => item !== opcao),
        });
      } else {
        // Marcar: adiciona a opção na lista
        setRespostas({
          ...respostas,
          [etapa]: [...respostasAtuais, opcao],
        });
      }
    }
  };

  const handleProximo = () => {
    if (etapa < DADOS_QUESTIONARIO.length) {
      setEtapa(etapa + 1);
    } else {
  // Fim do questionário
  console.log('Respostas Finais:', respostas);
  // ANTES: router.replace('/(tabs)/home');
  // DEPOIS:
  router.replace('/(tabs)/agenda'); // Navega para a nova tela de agenda
    }
  };

  const handleAnterior = () => {
    if (etapa > 1) {
      setEtapa(etapa - 1);
    } else {
      router.back(); // Volta para a tela de login
    }
  };
  
  const progresso = (etapa / DADOS_QUESTIONARIO.length) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho com botão de voltar e progresso */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleAnterior}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.progressoTexto}>{etapa} de {DADOS_QUESTIONARIO.length}</Text>
        </View>

        {/* Barra de Progresso */}
        <View style={styles.barraProgressoContainer}>
            <View style={[styles.barraProgresso, { width: `${progresso}%` }]} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Pergunta */}
            <Text style={styles.pergunta}>{perguntaAtual.pergunta}</Text>

            {/* Opções de Resposta */}
            <View style={styles.opcoesContainer}>
            {perguntaAtual.opcoes.map((opcao: string, index: number) => {
                const isSelected = respostas[etapa]?.includes(opcao);
                return (
                <TouchableOpacity
                    key={index}
                    style={[styles.opcao, isSelected && styles.opcaoSelecionada]}
                    onPress={() => handleSelect(opcao)}
                >
                    <View style={[styles.radioCheck, isSelected && styles.radioCheckSelecionado]}>
                    {/* Para multi-seleção, podemos adicionar um check, mas o círculo preenchido já é um bom indicador */}
                    </View>
                    <Text style={styles.textoOpcao}>{opcao}</Text>
                </TouchableOpacity>
                );
            })}
            </View>
        </ScrollView>

        {/* Botão de Continuar */}
        <TouchableOpacity style={styles.botaoContinuar} onPress={handleProximo}>
          <Text style={styles.textoBotaoContinuar}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    fontSize: 28,
    color: '#333',
  },
  progressoTexto: {
    fontSize: 16,
    color: '#666',
  },
  barraProgressoContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    width: '100%',
    marginBottom: 30,
  },
  barraProgresso: {
      height: '100%',
      backgroundColor: '#007BFF',
      borderRadius: 4,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  pergunta: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  opcoesContainer: {
    width: '100%',
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  opcaoSelecionada: {
    borderColor: '#007BFF',
    backgroundColor: '#E9F5FF',
  },
  radioCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    marginRight: 15,
  },
  radioCheckSelecionado: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  textoOpcao: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  botaoContinuar: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoContinuar: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});