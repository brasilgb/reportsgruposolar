import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../../components/MoneyPTBR';
import { ScrollView } from 'react-native-gesture-handler';

export default function Dia({ data }) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

      <DataTable>
        <DataTable.Header style={{ backgroundColor: '#eee', marginTop: 0 }}>
          <DataTable.Title style={styles.colmedia}>Meta Dia</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Venda Dia</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Média Dia</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Perform. Dia</DataTable.Title>
        </DataTable.Header>

        {data.map((tot, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MetaDia) * 1)} />}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.VendaDia) * 1)} />}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MediaDia) * 1)} />}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>
              <Text
                style={((tot.PerfDia) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
              >
                {((tot.PerfDia) * 100).toFixed(2)}%
              </Text>
            </DataTable.Cell>
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
    width: 100,
    paddingHorizontal: 2
  }
});