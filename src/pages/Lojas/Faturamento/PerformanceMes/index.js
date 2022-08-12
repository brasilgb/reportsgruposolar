import React, { useEffect, useContext, useState } from 'react';
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
  const [fatuTotPerfLojas, setFatuTotPerfLojas] = useState([]);
  const [fatuPerfMesLojas, setFatuPerfMesLojas] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getFatuPerfMesLojas() {
      setLoading(true);
      await api.get(`fatuperfmeslojas/${dtFormatada(dataFiltro)}`)
        .then(fatuperfmeslojas => {
          setFatuPerfMesLojas(fatuperfmeslojas.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getFatuPerfMesLojas();
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
        <Loading />
        :
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <DataTable>
            <DataTable.Header style={{ backgroundColor: '#eee' }}>
              <DataTable.Title style={styles.colgrandePrimary}>Mês/Ano</DataTable.Title>
              <DataTable.Title style={styles.colgrande}>Meta</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Média Fat.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.Fat.</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Meta</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Med.Jur.s/Parc.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.Juros</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {fatuTotPerfLojas.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.MetaMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MediaFatuMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.MargemMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepFatuMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{((tot.MetaAlcancadaMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MedJurSParcMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.RepJurosMes) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
              {fatuPerfMesLojas.map((mes, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{mes.MesAno}</DataTable.Cell>
                  <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((mes.Meta) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((mes.MediaFatu) * 1) > ((mes.ColorMedia) * 1) ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((mes.MediaFatu) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.RepFatu) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((mes.MetaAlcancada) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((mes.MetaAlcancada) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((mes.MedJurSParc) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((mes.RepJuros) * 100).toFixed(2)}%</DataTable.Cell>
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