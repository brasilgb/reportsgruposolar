import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function PerformanceAssociacao() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [sFatTotais, setSFatTotais] = useState([]);
  const [sFatPerfAssoc, setSFatPerfAssoc] = useState([]);

  useEffect(() => {

    async function getSFatPerfAssoc() {
      setLoading(true);
      await api.get(`sfatperfassoc/${dtFormatada(dataFiltro)}`)
        .then(sfatperfassoc => {
          setSFatPerfAssoc(sfatperfassoc.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSFatPerfAssoc();
  }, [dataFiltro]);

  useEffect(() => {
    async function getSFatTotais() {
      setLoading(true);
      await api.get(`sfattotais/${dtFormatada(dataFiltro)}`)
        .then(sfattotais => {
          setSFatTotais(sfattotais.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSFatTotais();
  }, [dataFiltro]);

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading color="#DC2626"/>
        :
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <DataTable>
            <DataTable.Header style={{ backgroundColor: '#eee' }}>
              <DataTable.Title style={styles.colgrandePrimary}>Ass.</DataTable.Title>
              <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Margem</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep. Fat.</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Estoque</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Giro</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.Est.</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {sFatTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.FatuPerfAssoc) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{((tot.MargemPerfAssoc) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepFatPerfAssoc) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.EstoquePerfAssoc) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{(parseFloat(tot.GiroPerfAssoc)).toFixed()}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepEstoquePerfAssoc) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
              {sFatPerfAssoc
                .sort((a, b) => (parseFloat(a.Faturamento) < parseFloat(b.Faturamento)) ? 1 : -1)
                .map((ass, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={styles.colgrandePrimary}>{ass.Associacao}</DataTable.Cell>
                    <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((ass.Faturamento) * 1)} />}</DataTable.Cell>
                    <DataTable.Cell style={styles.colmedia}>{((ass.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}>{((ass.RepFat) * 100).toFixed(2)}%</DataTable.Cell>
                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((ass.Estoque) * 1)} />}</DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}>{(parseFloat(ass.Giro)).toFixed()}</DataTable.Cell>
                    <DataTable.Cell style={styles.colpequena}>{((ass.RepEstoque) * 100).toFixed(2)}%</DataTable.Cell>
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
      width: 70,
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