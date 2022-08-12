import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../../../components/Loading';
import api from '../../../../services/api';

export default function SCompDiario() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [comComparaDia, setComComparaDia] = useState([]);
  const [comTotais, setComTotais] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
      async function getComComparaDia() {
        setLoading(true);
        await api.get(`comcomparadia/${dtFormatada(dataFiltro)}`)
          .then(comcomparadia => {
            setComComparaDia(comcomparadia.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getComComparaDia();
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
              <DataTable.Title style={styles.colgrandePrimary}>Ass.</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Compra dia {comTotais[0]?.DiaAtual}</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Compra dia  {comTotais[0]?.DiaAnterior}</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Compra Semana</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Compra Mês</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Prazo Médio</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {comTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraAnterior) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraSemana) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.Rep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{parseInt(tot.PrazoMedio)}</DataTable.Cell>
                </DataTable.Row>
              ))}
              {comComparaDia
              .sort((a, b) => parseInt(a.CompraMes) < parseInt(b.CompraMes) ? 1 : -1)
              .map((fat, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{fat.Assoc}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraAnterior) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraSemana) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>
                    <Text
                      style={((fat.ColorRep) * 100).toFixed() > 0 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((fat.Rep) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>
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
    width: 70,
    paddingHorizontal: 2,
    justifyContent: 'flex-end'
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2,
    justifyContent: 'flex-end'
  }
});