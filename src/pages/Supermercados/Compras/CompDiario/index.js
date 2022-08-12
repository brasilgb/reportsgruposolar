import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function CCompDiario() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [sFatTotais, setSFatTotais] = useState([]);
  const [sComTotais, setSComTotais] = useState([]);
  const [sComComparativo, setSComComparativo] = useState([]);

  useEffect(() => {

    async function getSComComparativo() {
      setLoading(true);
      await api.get(`scomcomparativo/${dtFormatada(dataFiltro)}`)
        .then(scomcomparativo => {
          setSComComparativo(scomcomparativo.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSComComparativo();
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
            <DataTable.Title style={styles.colgrandePrimary}>Ass.</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra dia {sFatTotais[0]?.DiaAtual}</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra dia  {sFatTotais[0]?.DiaAnterior}</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra Semana</DataTable.Title>
            <DataTable.Title style={styles.colgrande}>Compra Mês</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Prazo Médio</DataTable.Title>
          </DataTable.Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            {sComTotais.map((tot, index) => (
              <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraAnterior) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraSemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.CompraMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.RepMes) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}></DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{parseInt(tot.PrazoMedio)}</DataTable.Cell>
              </DataTable.Row>
            ))}

            {sComComparativo
              .sort((a, b) => (parseFloat(a.CompraMes) < parseFloat(b.CompraMes)) ? 1 : -1)
              .map((fat, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{fat.Associacao}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraAnterior) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraSemana) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.CompraMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fat.RepMes) * 100).toFixed(2)}%</DataTable.Cell>

                  <DataTable.Cell style={styles.colpequena}>
                    <Text
                      style={parseInt(fat.RepMesAnoColor) > 0 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((fat.RepAno) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colpequena}>
                    <Text
                      style={parseInt(fat.PrazoMedioColor) > 0 ? { color: 'green' } : { color: 'red' }}
                    >
                      {parseInt(fat.PrazoMedio)}
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
    width: 90,
    paddingHorizontal: 2,
    justifyContent: 'flex-end'
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2,
    justifyContent: 'flex-end'
  }
});