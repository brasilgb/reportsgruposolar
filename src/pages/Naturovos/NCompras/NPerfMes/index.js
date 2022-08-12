import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function NPerfMes() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [ncomPerfMes, setNcomPerfMes] = useState([]);
  const [ncomTotais, setNcomTotais] = useState([]);

  useEffect(() => {
    async function getNcomPerfMes() {
      setLoading(true);
      await api.get(`ncomperfmes/${dtFormatada(dataFiltro)}`)
        .then(ncomperfmes => {
          setNcomPerfMes(ncomperfmes.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNcomPerfMes();
  }, [dataFiltro]);

  useEffect(() => {
    async function getNcomTotais() {
      setLoading(true);
      await api.get(`ncomtotal/${dtFormatada(dataFiltro)}`)
        .then(ncomtotal => {
          setNcomTotais(ncomtotal.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNcomTotais();

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
              <DataTable.Title style={styles.colgrande}>Média Compras</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {ncomTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}><MoneyPTBR number={((tot.MesMedia) * 1)} /></DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.MesRepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
              {ncomPerfMes.map((mes, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{mes.MesAno}</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>
                    <Text
                      style={((mes.Media) * 1) > mes.ColorMedia ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((mes.Media) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
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
    width: 200,
    paddingHorizontal: 2,
    justifyContent: 'flex-end'
  },
  colmedia: {
    width: 150,
    paddingHorizontal: 2,
    justifyContent: 'flex-end'
  },
  colpequena: {
    width: 100,
    paddingHorizontal: 2,
    justifyContent: 'flex-end'
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2
  }
});