import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import Loading from '../../../../components/Loading';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import api from '../../../../services/api';

export default function Filial() {
 
    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [totais, setTotais] = useState([]);
    const [filiais, setFiliais] = useState([]);

    // Extração de dados resumos totais
    useEffect(() => {
        async function getFiliais() {
            setLoading(true);
            await api.get(`filiais/${dtFormatada(dataFiltro)}`)
                .then(filiais => {
                    const fil = filiais.data.filter((dep) => (dep.Departamento === 5));
                    setFiliais(fil);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFiliais();
    }, [dataFiltro]);

    useEffect(() => {
        async function getTotais() {
            setLoading(true);
            await api.get(`totais/${dtFormatada(dataFiltro)}`)
                .then(totais => {
                    const tot = totais.data.filter((dep) => (dep.Departamento === 5));
                    setTotais(tot);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getTotais();

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
                            <DataTable.Title style={styles.colgrandePrimary}>Filial.</DataTable.Title>
                            <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Proj.</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Rep.Fat</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
                        </DataTable.Header>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {totais.map((tot, index) => (
                                <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>Total</DataTable.Cell>
                                    <DataTable.Cell style={styles.colgrande}><MoneyPTBR number={parseFloat(tot.Faturamento)} /></DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((tot.Projecao) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((1) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((tot.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}><MoneyPTBR number={parseFloat(tot.PrecoMedio)} /></DataTable.Cell>
                                </DataTable.Row>
                            ))}
                            {filiais.map((fil, index) => (
                                <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>{fil.Filial}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={parseFloat(fil.Faturamento)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fil.Projecao) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fil.RepFaturamento) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fil.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={parseFloat(fil.PrecoMedio)} />}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </ScrollView>
                    </DataTable>
                </ScrollView >
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 0
    },
    colgrandePrimary: {
        width: 100,
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
    }
});
