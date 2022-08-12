import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import ResGrupo from './ResGrupo';
import Icon from '@expo/vector-icons/Ionicons';
import Loading from '../../../../components/Loading';
import api from '../../../../services/api';
import Modals from '../../../../components/Modals';

export default function NResumo() {

    const modalizeRef = useRef(null);
    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [nfatuSetor, setNfatuSetor] = useState([]);
    const [nfatuTotais, setNfatuTotais] = useState([]);

    const [setorName, setSetorName] = useState('');

    const openGrupo = () => {
        modalizeRef.current?.open();
    };

    const nameSetor = (setor) => {
        setSetorName(setor);
    };

    // Extração de dados resumos Faturamento e gráfico de evolução
    useEffect(() => {
        async function getNfatuSetor() {
            setLoading(true);
            await api.get(`nfatusetor/${dtFormatada(dataFiltro)}`)
                .then(nfatusetor => {
                    setNfatuSetor(nfatusetor.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNfatuSetor();
    }, [dataFiltro]);

    useEffect(() => {
        async function getNfatuTotais() {
            setLoading(true);
            await api.get(`nfatutotais/${dtFormatada(dataFiltro)}`)
                .then(nfatutotais => {
                    setNfatuTotais(nfatutotais.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNfatuTotais();

    }, [dataFiltro]);

    return (
        <View style={styles.container}>
            {loading
                ?
                <Loading color="#F5AB00" />
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <DataTable>
                        <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                            <DataTable.Title style={styles.colgrandePrimary}>Setor</DataTable.Title>

                            <DataTable.Title style={styles.colmedia}>Venda Dia {nfatuTotais[0]?.DiaAtual}</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>

                            <DataTable.Title style={styles.colmedia}>Venda Semana</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>

                            <DataTable.Title style={styles.colmedia}>Venda Mês</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>

                            <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}></DataTable.Title>

                            <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}></DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Preç. Méd. Kg</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}></DataTable.Title>
                        </DataTable.Header>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {nfatuTotais.map((fat, index) => (
                                <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>

                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.DiaVendaDia) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.DiaMargemDia) * 100).toFixed(2)}%</DataTable.Cell>

                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.DiaVendaSemana) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.DiaMargemSemana) * 100).toFixed(2)}%</DataTable.Cell>

                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.DiaVendaMes) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.DiaMargemMes) * 100).toFixed(2)}%</DataTable.Cell>

                                    <DataTable.Cell style={styles.colpequena}>{((fat.DiaRepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>

                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>

                                </DataTable.Row>
                            ))}
                            {nfatuSetor.sort((a, b) => (parseFloat(a.VendaMes) < parseFloat(b.VendaMes)) ? 1 : -1)
                                .map((fat, index) => (

                                    <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                        <DataTable.Cell style={styles.colgrandePrimary}>
                                            <TouchableOpacity onPress={() => { openGrupo(); nameSetor(fat.Setor) }} style={styles.btnModal}>
                                                <Icon style={{ marginRight: 2, paddingTop: 3 }} name="ios-arrow-redo" size={14} color="#333" />
                                                <Text style={{ color: '#333' }}>{fat.Setor}</Text>
                                            </TouchableOpacity>

                                        </DataTable.Cell>

                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaDia) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.MargemDia) * 100).toFixed(2)}%</DataTable.Cell>

                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaSemana) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.MargemSemana) * 100).toFixed(2)}%</DataTable.Cell>

                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaMes) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.MargemMes) * 100).toFixed(2)}%</DataTable.Cell>

                                        <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>
                                            <Text
                                                style={((fat.RepAno) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                            >
                                                {((fat.RepAno) * 100).toFixed(2)}%
                                            </Text>
                                        </DataTable.Cell>

                                        <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedio) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>
                                            <Text
                                                style={((fat.RepPrecoMedio) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                            >
                                                {((fat.RepPrecoMedio) * 100).toFixed(2)}%
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedioKg) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.RepPrecoMedioKg) * 100).toFixed(2)}%</DataTable.Cell>

                                    </DataTable.Row>
                                ))}
                        </ScrollView>

                    </DataTable>
                </ScrollView>
            }
            <Modals
                modalizeRef={modalizeRef}
                title="Faturamento por Grupo"
            >
                <ResGrupo setorName={setorName} />
            </Modals>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    colgrandePrimary: {
        width: 150,
        paddingHorizontal: 2,
        justifyContent: 'flex-start'
    },
    colgrande: {
        width: 150,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'
    },
    colmedia: {
        width: 120,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'
    },
    colpequena: {
        width: 80,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'
    },
    colmin: {
        width: 50,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'

    },
    btnModal: {
        width: 130,
        flexDirection: "row",
        backgroundColor: "#fcbc32",
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#F5AB00'
    }
});