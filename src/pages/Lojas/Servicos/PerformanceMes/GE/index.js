import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../../components/MoneyPTBR';
import { ScrollView } from 'react-native-gesture-handler';

export default function GE({ data }) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <DataTable>
        <DataTable.Header style={{ backgroundColor: '#eee', marginTop: 15 }}>
          <DataTable.Title style={styles.colmedia}>Meta GE</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Venda GE</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Falta Vender</DataTable.Title>
          <DataTable.Title style={styles.colpequena}>Atingido</DataTable.Title>
          <DataTable.Title style={styles.colpequena}>Qtd.Ven. GE</DataTable.Title>
          <DataTable.Title style={styles.colpequena}>Elegíveis GE</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Conversão GE</DataTable.Title>
        </DataTable.Header>

        {data.map((tot, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MetaGEMes) * 1)} />}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.VendaGEMes) * 1)} />}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>
              <Text
                style={((tot.FaltaVenderGEMes) * 1) > 0 ? { color: 'green' } : { color: 'red' }}
              >
                {<MoneyPTBR number={((tot.FaltaVenderGEMes) * 1)} />}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.colpequena}>{((tot.AtingidoGEMes) * 100).toFixed(2)}%</DataTable.Cell>
            <DataTable.Cell style={styles.colpequena}>{(parseInt(tot.QtdVendaGEMes))}</DataTable.Cell>
            <DataTable.Cell style={styles.colpequena}>{(parseInt(tot.ElegiveisGEMes))}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>{((tot.ConversaoGEMes) * 100).toFixed(2)}%</DataTable.Cell>
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