import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import Icon from '@expo/vector-icons/Ionicons';
import Loading from '../../../../components/Loading';
import Modals from '../../../../components/Modals';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import api from '../../../../services/api';
import ResGrupo from './ResGrupo';

export default function NPerfAssociacao() {
    const modalizeRef = useRef(null);

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [nfatuTotais, setNfatuTotais] = useState([]);
    const [nfatuPerfSetor, setNfatuPerfSetor] = useState([]);
    const [nfatuPerfGrupo, setNfatuPerfGrupo] = useState([]);

    const [setorName, setSetorName] = useState('');

    const openGrupo = () => {
        modalizeRef.current?.open();
    };

    const nameSetor = (setor) => {
        setSetorName(setor);
    };

    useEffect(() => {
        async function getNfatuPerfSetor() {
            setLoading(true);
            await api.get(`nfatuperfsetor/${dtFormatada(dataFiltro)}`)
                .then(nfatuperfsetor => {
                    setNfatuPerfSetor(nfatuperfsetor.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNfatuPerfSetor();
    }, [dataFiltro]);

    useEffect(() => {
        async function getNfatuPerfGrupo() {
            setLoading(true);
            await api.get(`nfatuperfgrupo/${dtFormatada(dataFiltro)}`)
                .then(nfatuperfgrupo => {
                    setNfatuPerfGrupo(nfatuperfgrupo.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNfatuPerfGrupo();
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
                <Loading color="#F5AB00"/>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <DataTable>
                        <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                            <DataTable.Title style={styles.colgrandePrimary}>Setor</DataTable.Title>
                            <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Preço Méd. Kg/Liq</DataTable.Title>
                            <DataTable.Title style={styles.colgrande}>Fatu. + EC</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Rep. + EC</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem + EC</DataTable.Title>
                        </DataTable.Header>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {nfatuTotais.map((fat, index) => (
                                <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                                    <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.PAssFaturamento) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.PAssMargem) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.PAssRepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.PAssPrecoMedioKg) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colgrande}><MoneyPTBR number={((fat.PAssFaturamentoEC) * 1)} /></DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.PAssRepEC) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.PAssMargemEC) * 100).toFixed(2)}%</DataTable.Cell>

                                </DataTable.Row>
                            ))}
                            {nfatuPerfSetor.sort((a, b) => (parseFloat(a.Faturamento) < parseFloat(b.Faturamento)) ? 1 : -1)
                                .map((fat, index) => (

                                    <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                        <DataTable.Cell style={styles.colgrandePrimary}>
                                            <TouchableOpacity onPress={() => { openGrupo(); nameSetor(fat.Setor) }} style={styles.btnModal}>
                                                <Icon style={{ marginRight: 2, paddingTop: 3 }} name="ios-arrow-redo" size={14} color="#333" />
                                                <Text style={{ color: '#333' }}>{fat.Setor}</Text>
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.Faturamento) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedio) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.PrecoMedioKg) * 1)} />}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.FaturamentoEC) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.RepEC) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.MargemEC) * 100).toFixed(2)}%</DataTable.Cell>

                                    </DataTable.Row>
                                ))}
                        </ScrollView>

                    </DataTable>
                </ScrollView>
            }


            <Modals
                modalizeRef={modalizeRef}
                title="Performance por Grupo"
            >
                <ResGrupo setorName={setorName} nfatuPerfGrupo={nfatuPerfGrupo} nfatuTotais={nfatuTotais} />
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