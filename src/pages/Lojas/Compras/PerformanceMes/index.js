import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function CPerformanceMes() {
  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [comPerfMes, setComPerfMes] = useState([]);
  const [comTotais, setComTotais] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getComPerfMes() {
      setLoading(true);
      await api.get(`comperfmes/${dtFormatada(dataFiltro)}`)
        .then(comperfmes => {
          setComPerfMes(comperfmes.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getComPerfMes();
  }, [dataFiltro]);

  useEffect(() => {
    async function getComTotais() {
      setLoading(true);
      await api.get(`comtotais/${dtFormatada(dataFiltro)}`)
        .then(comtotais => {
          setComTotais(comtotais.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getComTotais();

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
              <DataTable.Title style={styles.colgrandePrimary}>Mês/Ano.</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Média Compras</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Prazo Médio</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {comTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MediaCompraMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{parseInt(tot.PrazoMedioMes)}</DataTable.Cell>
                </DataTable.Row>
              ))}
              {comPerfMes.map((fat, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{fat.MesAno}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((fat.MediaCompra) * 1) > ((fat.ColorMedia) * 1) ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((fat.MediaCompra) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fat.Rep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{parseInt(fat.PrazoMedio)}</DataTable.Cell>
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
      width: 90,
      paddingHorizontal: 2,
      justifyContent: 'flex-start'
  },
  colgrande: {
    width: 180,
    paddingHorizontal: 2,
    justifyContent: 'flex-end'
  },
  colmedia: {
    width: 150,
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
  titleTable: {
    backgroundColor: "#29ABE2",
    borderRadius: 6,
    justifyContent: 'flex-end'
  },
  titleText: {
    color: "#FFF"
  }
});