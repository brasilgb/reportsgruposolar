import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../../components/MoneyPTBR';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../../../../contexts/auth';
import api from '../../../../../services/api';
import Loading from '../../../../../components/Loading';

export default function ResGrupo({ grupoName }) {

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [nfatuAssoc, setNfatuAssoc] = useState([]);
    const [loading, setLoading] = useState(false);

    // Extração de dados resumos totais
    useEffect(() => {
        async function getNfatuAssoc() {
            setLoading(true);
            await api.get(`nfatuassoc/${dtFormatada(dataFiltro)}`)
                .then(nfatuassoc => {
                    const naft = nfatuassoc.data.filter((filg) => (filg.Grupo == grupoName));
                    setNfatuAssoc(naft);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNfatuAssoc();
    }, [dataFiltro, grupoName]);

    return (
        <View style={styles.container}>
            {loading
                ?
                <Loading color="#F5AB00"/>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <DataTable style={{ marginBottom: 10, height: 700}}>
                        <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                            <DataTable.Title style={styles.colgrandePrimary}>Assoc.</DataTable.Title>

                            <DataTable.Title style={styles.colmedia}>Venda Dia</DataTable.Title>
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

                            {nfatuAssoc
                                .sort((a, b) => (parseFloat(a.VendaMes) < parseFloat(b.VendaMes)) ? 1 : -1)
                                .map((fat, index) => (

                                    <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                        <DataTable.Cell style={styles.colgrandePrimary}>
                                            <Text>{fat.Associacao}</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    colgrandePrimary: {
        width: 60,
        paddingHorizontal: 2,
        justifyContent: 'flex-start'
    },
    colgrande: {
        width: 180,
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
    }
});