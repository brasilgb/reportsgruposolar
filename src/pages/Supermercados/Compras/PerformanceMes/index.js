import React, { useContext, useEffect, useState } from 'react';
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
  const [sComTotais, setSComTotais] = useState([]);
  const [sComPerfMes, setSComPerfMes] = useState([]);

  useEffect(() => {

    async function getSComPerfMes() {
      setLoading(true);
      await api.get(`scomperfmes/${dtFormatada(dataFiltro)}`)
        .then(scomperfmes => {
          setSComPerfMes(scomperfmes.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSComPerfMes();
  }, [dataFiltro]);

  useEffect(() => {
    async function getSComTotais() {
      setLoading(true);
      await api.get(`scomtotais/${dtFormatada(dataFiltro)}`)
        .then(scomtotais => {
          setSComTotais(scomtotais.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSComTotais();
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
              <DataTable.Title style={styles.colgrandePrimary}>Mês/Ano.</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Média Compras</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Prazo Médio</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>

              {sComTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MediaCompraPerfMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepPerfMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{parseInt(tot.PrazoMedioPerfMes)}</DataTable.Cell>
                </DataTable.Row>
              ))}

              {sComPerfMes
                .sort((a, b) => (parseFloat(a.AnoMesNum) < parseFloat(b.AnoMesNum)) ? 1 : -1)
                .map((fat, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={styles.colgrandePrimary}>{fat.MesAno}</DataTable.Cell>
                    <DataTable.Cell style={styles.colmedia}>
                      <Text
                        style={((fat.MediaCompra) * 1) < ((sComTotais[0]?.MediaCompraPerfMes) * 1) ? { color: 'green' } : { color: 'red' }}
                      >
                        {<MoneyPTBR number={((fat.MediaCompra) * 1)} /> }
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
    borderRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});