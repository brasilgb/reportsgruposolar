import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function SCompDiario() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [serResumoDia, setSerResumoDia] = useState([]);
  const [serTotais, setSerTotais] = useState([]);

  // Extração de dados serviços lojas
  useEffect(() => {
      async function getSerResumoDia() {
        setLoading(true);
        await api.get(`serresumodia/${dtFormatada(dataFiltro)}`)
          .then(serresumodia => {
            setSerResumoDia(serresumodia.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getSerResumoDia();
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
              <DataTable.Title style={styles.colgrandePrimary}>Regional</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>GE Dia {serTotais[0]?.DiaAtual}</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>PP dia  {serTotais[0]?.DiaAtual}</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>GE Sem.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>PP Sem.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>GE Mês</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>PP Mês</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>AP Mês</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Total Serviços</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>

            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {serTotais.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.GEDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.PPDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.GESemana) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.PPSemana) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.GEMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.GEMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.PPMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.PPMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.APMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.APMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.TotServicos) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.TotRep) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
              {serResumoDia
              .sort((a, b) => parseInt(a.TotServicos) < parseInt(b.TotServicos) ? 1 : -1)
              .map((fat, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colgrandePrimary}>{fat.Supervisor}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.GEDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PPDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.GESemana) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PPSemana) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.GEMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fat.GEMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PPMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fat.PPMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.APMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fat.APMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.TotServicos) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fat.TotRep) * 100).toFixed(2)}%</DataTable.Cell>
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
    width: 100,
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