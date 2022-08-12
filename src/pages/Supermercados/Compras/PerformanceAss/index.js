import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import Loading from '../../../../components/Loading';
import api from '../../../../services/api';

export default function CPerformanceAss() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [sComTotais, setSComTotais] = useState([]);
  const [sComPerfAssoc, setSComPerfAssoc] = useState([]);

  useEffect(() => {

    async function getSComPerfAssoc() {
      setLoading(true);
      await api.get(`scomperfassoc/${dtFormatada(dataFiltro)}`)
        .then(scomperfassoc => {
          setSComPerfAssoc(scomperfassoc.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSComPerfAssoc();
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
              <DataTable.Title style={styles.colgrandePrimary}>Ass</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Compras</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Prazo Médio</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {sComTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.ComprasPerfAssoc) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepPerfAssoc) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{parseInt(tot.PrazoMedioPerfAssoc)}</DataTable.Cell>
                </DataTable.Row>
              ))}

              {sComPerfAssoc
                .sort((a, b) => (parseFloat(a.Compras) < parseFloat(b.Compras)) ? 1 : -1)
                .map((fat, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={styles.colgrandePrimary}>{fat.Associacao}</DataTable.Cell>
                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.Compras) * 1)} />}</DataTable.Cell>
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