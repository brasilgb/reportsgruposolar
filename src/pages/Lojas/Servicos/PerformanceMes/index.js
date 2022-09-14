import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import AP from './AP';
import EP from './EP';
import GE from './GE';
import Mes from './Mes';
import PP from './PP';
import Loading from '../../../../components/Loading';
import api from '../../../../services/api';

export default function SPerformanceMes() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [serTotais, setSerTotais] = useState([]);

  // Extração de dados resumos totais
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
        <Fragment>
          <DataTable.Row style={styles.titleTable}>
            <DataTable.Cell>
              <Text style={styles.titleText}>Performance Mês GE, PP, AP e EP</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Mes data={serTotais} />
            </View>
            <View>
              <GE data={serTotais} />
            </View>
            <View>
              <PP data={serTotais} />
            </View>
            <View>
              <AP data={serTotais} />
            </View>
            <View>
              <EP data={serTotais} />
            </View>
          </ScrollView>
        </Fragment>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
    paddingTop: 10
  },
  titleTable: {
    backgroundColor: "#29ABE2",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});