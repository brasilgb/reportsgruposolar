import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../../../components/Loading';
import api from '../../../../services/api';
export default function PerformanceAssociacao() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [fatuTotPerfLojas, setFatuTotPerfLojas] = useState([]);
  const [fatuPerfAssocLojas, setFatuPerfAssocLojas] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
      async function getFatuPerfAssocLojas() {
        setLoading(true);
        await api.get(`fatuperfassoclojas/${dtFormatada(dataFiltro)}`)
          .then(fatuperfassoclojas => {
            setFatuPerfAssocLojas(fatuperfassoclojas.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getFatuPerfAssocLojas();
    }, [dataFiltro]);

    useEffect(() => {
      async function getFatuTotPerfLojas() {
        setLoading(true);
        await api.get(`fatutotperflojas/${dtFormatada(dataFiltro)}`)
          .then(fatutotperflojas => {
            setFatuTotPerfLojas(fatutotperflojas.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getFatuTotPerfLojas();

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
              <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep. Fat.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Jur.S/Fat.</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Rep.Juros</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Estoque</DataTable.Title>
              <DataTable.Title style={styles.colmin}>Giro</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.Est.</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {fatuTotPerfLojas.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.FaturamentoAss) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.MargemAss) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepFatAss) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepJurosAss) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.JurSFatAss) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepJurosAss) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.EstoqueAss) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmin}>{parseInt(tot.GiroAss)}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepEstoqueAss) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
              {fatuPerfAssocLojas
              .sort((a, b) => parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1)
              .map((ass, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{ass.Assoc}</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((ass.Faturamento) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((ass.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((ass.RepFat) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((ass.RepJuros) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((ass.JurSFat) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((ass.RepJuros) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((ass.Estoque) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmin}>{parseInt(ass.Giro)}</DataTable.Cell>
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
      width: 50,
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