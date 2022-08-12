import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';
import { parse } from 'react-native-svg';

export default function CPerformanceAss() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [comPerfAssoc, setComPerfAssoc] = useState([]);
  const [comTotais, setComTotais] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
      async function getComPerfAssoc() {
        setLoading(true);
        await api.get(`comperfassoc/${dtFormatada(dataFiltro)}`)
          .then(comperfassoc => {
            setComPerfAssoc(comperfassoc.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getComPerfAssoc();
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
              <DataTable.Title style={styles.colmedia}>Compras</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Prazo Médio</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {comTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.ComprasAssoc) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepAssoc) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{parseInt(tot.PrazoMedioAssoc)}</DataTable.Cell>
                </DataTable.Row>
              ))}
              {comPerfAssoc
              .sort((a, b) => parseInt(a.Compras) < parseInt(b.Compras) ? 1 : -1)
              .map((fat, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{fat.Assoc}</DataTable.Cell>
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