import React, { useMemo, useState } from 'react';
import { Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// MUDANÇA CRÍTICA: A propriedade 'dia' agora é um 'number' para garantir que seja única.
type Tarefa = {
  id: string;
  dia: number; // Antes era 'string', agora é 'number' (0-6)
  titulo: string;
  horario: string;
  cor: string;
  completa: boolean;
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
    const hoje = new Date().getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const dicaDoDia = DICAS_DA_SEMANA[hoje];
    
    const [diaSelecionadoIndex, setDiaSelecionadoIndex] = useState(hoje);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    
    const [modalVisivel, setModalVisivel] = useState(false);
    const [tituloTarefa, setTituloTarefa] = useState('');
    const [horarioTarefa, setHorarioTarefa] = useState('');
    
    const tarefasFiltradas = useMemo(() => {
        // MUDANÇA CRÍTICA: O filtro agora compara o índice do dia, que é único.
        return tarefas.filter(t => t.dia === diaSelecionadoIndex);
    }, [tarefas, diaSelecionadoIndex]);

    const handleMarcarCompleta = (id: string) => {
        setTarefas(tarefas.map(t => (t.id === id ? { ...t, completa: !t.completa } : t)));
    };

    const handleAddTarefa = () => {
        if (!tituloTarefa || !horarioTarefa) {
            alert('Por favor, preencha o título e o horário.');
            return;
        }
        const novaTarefa: Tarefa = {
            id: Date.now().toString(),
            // MUDANÇA CRÍTICA: Salvamos o índice do dia (número), não a letra.
            dia: diaSelecionadoIndex,
            titulo: tituloTarefa,
            horario: horarioTarefa,
            cor: ['#28a745', '#ffc107', '#007bff', '#dc3545'][Math.floor(Math.random() * 4)],
            completa: false,
        };
        setTarefas([...tarefas, novaTarefa]);
        setTituloTarefa('');
        setHorarioTarefa('');
        setModalVisivel(false);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Cabeçalho */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Vamos focar hoje?</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => setModalVisivel(true)}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Seletor de Dias */}
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

                {/* Lista de Tarefas */}
                <View style={styles.taskList}>
                    {tarefasFiltradas.length > 0 ? tarefasFiltradas.map(tarefa => (
                        <View key={tarefa.id} style={[styles.taskCard, tarefa.completa && styles.taskCardCompleted]}>
                            <View style={[styles.taskColorBar, { backgroundColor: tarefa.cor }]} />
                            <View style={styles.taskInfo}>
                                <Text style={styles.taskTitle}>{tarefa.titulo}</Text>
                                <Text style={styles.taskTime}>{tarefa.horario}</Text>
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

                {/* Dica do Dia */}
                <View style={styles.tipCard}>
                    <Text style={styles.tipTitle}>Dica do dia</Text>
                    <Text style={styles.tipText}>{dicaDoDia}</Text>
                </View>
            </ScrollView>

            {/* Modal para Adicionar Tarefa */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Nova Tarefa</Text>
                        <TextInput 
                            placeholder="Título da tarefa"
                            placeholderTextColor="#555" // Placeholder mais escuro
                            style={[styles.input, { color: '#000' }]} // Texto digitado mais escuro
                            value={tituloTarefa}
                            onChangeText={setTituloTarefa}
                        />
                         <TextInput 
                            placeholder="Horário (ex: 10:00 - 11:00)"
                            placeholderTextColor="#555" // Placeholder mais escuro
                            style={[styles.input, { color: '#000' }]} // Texto digitado mais escuro
                            value={horarioTarefa}
                            onChangeText={setHorarioTarefa}
                        />
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

// Os estilos permanecem os mesmos, exceto pelo ajuste de fonte
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
    // AJUSTE DE ESTILO: Diminuindo um pouco a fonte
    headerTitle: { fontSize: 26, fontWeight: 'bold', color: 'white' },
    addButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    daySelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        marginHorizontal: 10,
    },
    day: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    daySelected: { backgroundColor: '#007BFF' },
    dayText: { fontSize: 16, fontWeight: 'bold', color: 'gray' },
    dayTextSelected: { color: 'white' },
    taskList: { paddingHorizontal: 20, minHeight: 100 },
    taskCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    taskCardCompleted: { opacity: 0.6 },
    taskColorBar: { width: 4, height: '120%', position: 'absolute', left: 0 },
    taskInfo: { flex: 1, marginLeft: 15 },
    taskTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    taskTime: { fontSize: 14, color: 'gray', marginTop: 5 },
    taskCompleteButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskCompleteButtonInner: { width: 14, height: 14, borderRadius: 7 },
    noTasksText: { textAlign: 'center', color: 'gray', marginVertical: 20 },
    tipCard: {
        backgroundColor: '#656565ff',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    tipTitle: { fontSize: 16, fontWeight: 'bold', color: '#4d4d4dff' },
    tipText: { fontSize: 14, color: '#b1b1b1ff', marginTop: 5 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
});