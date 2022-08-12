import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function PerformanceMes() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [sFatTotais, setSFatTotais] = useState([]);
  const [sFatPerfMes, setSFatPerfMes] = useState([]);

  useEffect(() => {

    async function getSFatPerfMes() {
      setLoading(true);
      await api.get(`sfatperfmes/${dtFormatada(dataFiltro)}`)
        .then(sfatperfmes => {
          setSFatPerfMes(sfatperfmes.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSFatPerfMes();
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
              <DataTable.Title style={styles.colgrandePrimary}>Mês/Ano</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Média Fat.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.Fat.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Meta</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {sFatTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MediaFatuPerfMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.MargemFatuPerfMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepFatuPerfMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.MetaFatuPerfMes) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
              {sFatPerfMes.map((mes, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{mes.MesAno}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((mes.MediaFat) * 1) > ((sFatTotais[0]?.MediaFatuPerfMes) * 1) ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((mes.MediaFat) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.Rep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>
                    <Text
                      style={((mes.Meta) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((mes.Meta) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>
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