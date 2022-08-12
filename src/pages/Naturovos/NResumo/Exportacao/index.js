import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import Loading from '../../../../components/Loading';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import api from '../../../../services/api';

export default function Exportacao() {
 
    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [exportacoes, setExportacoes] = useState([]);
    const [totais, setTotais] = useState([]);
  
    useEffect(() => {
  
      async function getExportacoes() {
        setLoading(true);
        await api.get(`exportacoes/${dtFormatada(dataFiltro)}`)
          .then(exportacoes => {
            setExportacoes(exportacoes.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getExportacoes();
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
                <DataTable.Title style={styles.colgrandePrimary}>País</DataTable.Title>
                <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Rep. Fat.</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
              </DataTable.Header>
  
              <ScrollView showsVerticalScrollIndicator={false}>
                {totais.map((tot, index) => (
                  <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                    <DataTable.Cell style={styles.colgrandePrimary}>Total</DataTable.Cell>
                    <DataTable.Cell style={styles.colgrande}><MoneyPTBR number={(tot.FaturamentoSemBrasil) * 1} /></DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}>{((1) * 100).toFixed(2)}%</DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}>{((tot.MargemSemBrasil) * 100).toFixed(2)}%</DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}><MoneyPTBR number={(tot.PrecoMedioSemBrasil) * 1} /></DataTable.Cell>
                  </DataTable.Row>
                ))}
                {exportacoes.map((exp, index) => (
                  <DataTable.Row key={index} >
                    <DataTable.Cell style={styles.colgrandePrimary}>{exp.Pais}</DataTable.Cell>
                    <DataTable.Cell style={styles.colgrande}><MoneyPTBR number={(exp.Faturamento) * 1} /></DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}>{((exp.RepFaturamento) * 100).toFixed(2)}%</DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}>{((exp.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}><MoneyPTBR number={(exp.PrecoMedio) * 1} /></DataTable.Cell>
                  </DataTable.Row>
                ))}
              </ScrollView>
            </DataTable>
          </ScrollView >
        }
  
      </View >
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
      paddingTop: 0
    },
    colgrandePrimary: {
        width: 80,
        paddingHorizontal: 2,
        justifyContent: 'flex-start'
    },
    colgrande: {
      width: 180,
      // backgroundColor: "#000",
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