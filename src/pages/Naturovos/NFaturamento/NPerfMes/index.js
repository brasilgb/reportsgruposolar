import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function NPerformanceMes() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [nfatuPerfMes, setNfatuPerfMes] = useState([]);
  const [nfatuTotais, setNfatuTotais] = useState([]);

  useEffect(() => {
    async function getNfatuPerfMes() {
      setLoading(true);
      await api.get(`nfatuperfmes/${dtFormatada(dataFiltro)}`)
        .then(nfatuperfmes => {
          setNfatuPerfMes(nfatuperfmes.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNfatuPerfMes();
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
            <DataTable.Header style={{ backgroundColor: '#eee' }}>
              <DataTable.Title style={styles.colgrandePrimary}>Mês/Ano</DataTable.Title>
              <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Preço Médio Kg/Liq</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {nfatuTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.PMesFaturamento) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PMesMargem) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PMesRepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.PMesPrecoMedioKg) * 1)} />}</DataTable.Cell>
                </DataTable.Row>
              ))}
              {nfatuPerfMes.map((mes, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{mes.MesAno}</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>
                    <Text
                      style={((mes.Faturamento) * 1) > ((nfatuTotais[0]?.PMesFaturamento) * 1) ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((mes.Faturamento) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((mes.PrecoMedioKg) * 1)} />}</DataTable.Cell>
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
      width: 80,
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