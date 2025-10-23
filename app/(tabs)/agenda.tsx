import React, { useEffect, useMemo, useState, useCallback  } from 'react';
import { Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

type Meta = {
  id: string;
  titulo: string;
};

type Tarefa = {
  id: string;
  dia: number;
  titulo: string;
  horario: string;
  cor: string;
  completa: boolean;
  metaId?: string; // 🔹 Relacionamento com Meta
};

const DICAS_DA_SEMANA = [
  "Divida tarefas grandes em partes menores para evitar a procrastinação!",
  "Comece pela tarefa mais difícil primeiro para tirar o peso das costas.",
  "Técnica Pomodoro: trabalhe por 25 minutos e descanse 5. Repita.",
  "Defina prazos realistas para cada uma de suas tarefas.",
  "Celebre pequenas vitórias ao completar cada tarefa do seu dia.",
  "Organize seu espaço de trabalho antes de começar. Um ambiente limpo ajuda a focar.",
  "Lembre-se de fazer pausas. Descansar também é produtivo."
];

const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function AgendaScreen() {
  const hoje = new Date().getDay();
  const dicaDoDia = DICAS_DA_SEMANA[hoje];

  const [diaSelecionadoIndex, setDiaSelecionadoIndex] = useState(hoje);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [metas, setMetas] = useState<Meta[]>([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [horarioTarefa, setHorarioTarefa] = useState('');
  const [metaSelecionada, setMetaSelecionada] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const salvas = await AsyncStorage.getItem('tarefas');
      if (salvas) setTarefas(JSON.parse(salvas));

      const metasSalvas = await AsyncStorage.getItem('metas');
      if (metasSalvas) setMetas(JSON.parse(metasSalvas));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const tarefasFiltradas = useMemo(() => {
    return tarefas.filter(t => t.dia === diaSelecionadoIndex);
  }, [tarefas, diaSelecionadoIndex]);

  useFocusEffect(
  useCallback(() => {
    (async () => {
      const metasSalvas = await AsyncStorage.getItem('metas');
      if (metasSalvas) setMetas(JSON.parse(metasSalvas));
    })();
  }, [])
);

  const handleAddTarefa = () => {
    if (!tituloTarefa || !horarioTarefa) {
      alert('Por favor, preencha o título e o horário.');
      return;
    }

    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      dia: diaSelecionadoIndex,
      titulo: tituloTarefa,
      horario: horarioTarefa,
      cor: ['#28a745', '#ffc107', '#007bff', '#dc3545'][Math.floor(Math.random() * 4)],
      completa: false,
      metaId: metaSelecionada,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTituloTarefa('');
    setHorarioTarefa('');
    setMetaSelecionada(undefined);
    setModalVisivel(false);
  };

  const handleMarcarCompleta = (id: string) => {
    setTarefas(tarefas.map(t => (t.id === id ? { ...t, completa: !t.completa } : t)));
  };

  const getTituloMeta = (metaId?: string) => {
    const meta = metas.find(m => m.id === metaId);
    return meta ? meta.titulo : 'Sem meta associada';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Vamos focar hoje?</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisivel(true)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.daySelector}>
          {DIAS_SEMANA.map((dia, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.day, diaSelecionadoIndex === index && styles.daySelected]}
              onPress={() => setDiaSelecionadoIndex(index)}
            >
              <Text style={[styles.dayText, diaSelecionadoIndex === index && styles.dayTextSelected]}>{dia}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.taskList}>
          {tarefasFiltradas.length > 0 ? tarefasFiltradas.map(tarefa => (
            <View key={tarefa.id} style={[styles.taskCard, tarefa.completa && styles.taskCardCompleted]}>
              <View style={[styles.taskColorBar, { backgroundColor: tarefa.cor }]} />
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{tarefa.titulo}</Text>
                <Text style={styles.taskTime}>{tarefa.horario}</Text>
                <Text style={styles.metaLabel}>Meta: {getTituloMeta(tarefa.metaId)}</Text>
              </View>
              <TouchableOpacity onPress={() => handleMarcarCompleta(tarefa.id)}>
                <View style={[styles.taskCompleteButton, { borderColor: tarefa.cor }]}>
                  {tarefa.completa && <View style={[styles.taskCompleteButtonInner, { backgroundColor: tarefa.cor }]} />}
                </View>
              </TouchableOpacity>
            </View>
          )) : (
            <Text style={styles.noTasksText}>Nenhuma tarefa para hoje.</Text>
          )}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Dica do dia</Text>
          <Text style={styles.tipText}>{dicaDoDia}</Text>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent visible={modalVisivel} onRequestClose={() => setModalVisivel(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>
            <TextInput
              placeholder="Título da tarefa"
              placeholderTextColor="#555"
              style={[styles.input, { color: '#000' }]}
              value={tituloTarefa}
              onChangeText={setTituloTarefa}
            />
            <TextInput
              placeholder="Horário (ex: 10:00 - 11:00)"
              placeholderTextColor="#555"
              style={[styles.input, { color: '#000' }]}
              value={horarioTarefa}
              onChangeText={setHorarioTarefa}
            />

            <Text style={styles.metaSelectLabel}>Associar a uma meta:</Text>
            <Picker
              selectedValue={metaSelecionada}
              onValueChange={(value) => setMetaSelecionada(value)}
              style={styles.picker}
            >
              <Picker.Item label="Nenhuma" value={undefined} />
              {metas.map(meta => (
                <Picker.Item key={meta.id} label={meta.titulo} value={meta.id} />
              ))}
            </Picker>

            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisivel(false)} color="gray" />
              <Button title="Salvar" onPress={handleAddTarefa} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F7FE' },
  container: { flex: 1 },
  header: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: 'white' },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  day: { padding: 10, borderRadius: 20 },
  daySelected: { backgroundColor: '#007BFF' },
  dayText: { color: '#000' },
  dayTextSelected: { color: 'white' },
  taskList: { padding: 20 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  taskCardCompleted: { opacity: 0.6 },
  taskColorBar: { width: 6, height: '100%', borderRadius: 3, marginRight: 10 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: 'bold' },
  taskTime: { fontSize: 14, color: 'gray' },
  metaLabel: { fontSize: 12, color: '#007BFF', marginTop: 4 },
  taskCompleteButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCompleteButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  noTasksText: { textAlign: 'center', marginTop: 20, color: 'gray' },
  tipCard: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tipTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  tipText: { color: 'gray' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '85%',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  metaSelectLabel: { fontSize: 14, marginBottom: 5 },
  picker: { width: '100%', marginBottom: 15 },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
