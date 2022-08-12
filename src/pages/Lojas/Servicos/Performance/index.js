import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';
export default function PerformanceMes() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [serPerform, setSerPerform] = useState([]);
  const [serTotais, setSerTotais] = useState([]);

  // Extração de dados resumos Faturamento e gráfico de evolução
  useEffect(() => {
      async function getSerPerform() {
        setLoading(true);
        await api.get(`serperform/${dtFormatada(dataFiltro)}`)
          .then(serperform => {
            setSerPerform(serperform.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getSerPerform();
    }, [dataFiltro]);

    useEffect(() => {
      async function getSerTotais() {
        setLoading(true);
        await api.get(`sertotais/${dtFormatada(dataFiltro)}`)
          .then(sertotais => {
            setSerTotais(sertotais.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getSerTotais();

    }, [dataFiltro]);

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading color="#0A3B7E"/>
        :
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <DataTable>
            <DataTable.Header style={{ backgroundColor: '#eee' }}>
              <DataTable.Title style={styles.colgrandePrimary}>Mês/Ano</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Valor GE</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Meta</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Valor PP.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Meta</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Valor AP.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Meta</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Valor EP</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {serTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.PerfValorGE) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PerfRepGE) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PerfMetaGE) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.PerfValorPP) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PerfRepPP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PerfMetaPP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.PerfValorAP) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PerfRepAP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PerfMetaAP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{((tot.PerfValorEP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PerfRepEP) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
              {serPerform
              .sort((a, b) => parseInt(a.AnoMesNum) < parseInt(b.AnoMesNum) ? 1 : -1)
              .map((mes, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{mes.PerfMesAno}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((mes.PerfValorGE) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.PerfRepGE) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.PerfMetaGE) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((mes.PerfValorPP) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.PerfRepPP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.PerfMetaPP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((mes.PerfValorAP) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.PerfRepAP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.PerfMetaAP) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((mes.PerfValorEP) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.PerfRepEP) * 100).toFixed(2)}%</DataTable.Cell>
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