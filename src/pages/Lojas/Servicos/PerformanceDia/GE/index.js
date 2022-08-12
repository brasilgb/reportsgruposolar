import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default function GEDia({ data }) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

      <DataTable>
        <DataTable.Header style={{ backgroundColor: '#eee', marginTop: 15 }}>
          <DataTable.Title style={styles.colmedia}>Qtde.Venda</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>GE Elegíveis</DataTable.Title>
          <DataTable.Title style={styles.colmedia}>Conv. GE Dia</DataTable.Title>
        </DataTable.Header>

        {data.map((tot, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.colmedia}>{parseInt(tot.QtdVendaGEDia)}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>{parseInt(tot.ElegiveisGEDia)}</DataTable.Cell>
            <DataTable.Cell style={styles.colmedia}>
              <Text
                style={((tot.ConversaoGEDia) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
              >
                {((tot.ConversaoGEDia) * 100).toFixed(2)}%
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

      </DataTable>
    </ScrollView>
  );
}
/**
 * 
 * Qtde.Venda GE Elegíveis GE Conv. GE Dia
 */
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
    width: 130,
    paddingHorizontal: 2
  },
  colpequena: {
    width: 80,
    paddingHorizontal: 2
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2
  }
});