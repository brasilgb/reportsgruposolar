import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../../components/MoneyPTBR';
import { ScrollView } from 'react-native-gesture-handler';

export default function PP({ data }) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <DataTable>
        <DataTable.Header style={{ backgroundColor: '#eee', marginTop: 15 }}>
          <DataTable.Title style={styles.colmedia}>Meta PP</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Venda PP</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Falta Vender</DataTable.Title>
          <DataTable.Title style={styles.colpequena}>Atingido</DataTable.Title>
          <DataTable.Title style={styles.colpequena}>Qtd.Ven. PP</DataTable.Title>
          <DataTable.Title style={styles.colpequena}>Elegíveis PP</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Conversão PP</DataTable.Title>
        </DataTable.Header>

        {data.map((tot, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MetaPPMes) * 1)} />}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.VendaPPMes) * 1)} />}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>
              <Text
                style={((tot.FaltaVenderPPMes) * 1) > 0 ? { color: 'green' } : { color: 'red' }}
              >
                {<MoneyPTBR number={((tot.FaltaVenderPPMes) * 1)} />}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.colpequena}>{((tot.AtingidoPPMes) * 100).toFixed(2)}%</DataTable.Cell>
            <DataTable.Cell style={styles.colpequena}>{(parseInt(tot.QtdVendaPPMes))}</DataTable.Cell>
            <DataTable.Cell style={styles.colpequena}>{(parseInt(tot.ElegiveisPPMes))}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>{((tot.ConversaoPPMes) * 100).toFixed(2)}%</DataTable.Cell>
          </DataTable.Row>
        ))}

      </DataTable>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingTop: 10
  },
  colgrande: {
    width: 180,
    paddingHorizontal: 2
  },
  colmedia: {
    width: 120,
    paddingHorizontal: 2
  },
  colpequena: {
    width: 80,
    paddingHorizontal: 2
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2
  },
  titleTable: {
    backgroundColor: "#29ABE2",
    borderRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});