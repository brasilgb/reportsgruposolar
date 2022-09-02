import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../../../components/Loading';

import { AuthContext } from '../../../../contexts/auth';
import api from '../../../../services/api';

import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend
} from "victory-native";

export default function CPerformance() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [sComGrafico, setSComGrafico] = useState([]);

  useEffect(() => {

    async function getSComGrafico() {
      setLoading(true);
      await api.get(`scomgrafico/${dtFormatada(dataFiltro)}`)
        .then(scomgrafico => {
          setSComGrafico(scomgrafico.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSComGrafico();

  }, [dataFiltro]);

  const datacompras = sComGrafico.map((gr) => {
    return {
      x: gr.DiaSemana,
      y: gr.Compras
    };
  });

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading color="#DC2626"/>
        :
        <ScrollView>
          {sComGrafico &&
            <Fragment>
              <VictoryChart
                height={450}
                // width={350}
                horizontal
                responsive={false}
                domainPadding={{ x: [10, 10], y: 60 }}
                theme={VictoryTheme.material}
              >
                <VictoryLegend
                  x={0}
                  y={0}
                  title=""
                  centerTitle
                  orientation="horizontal"
                  gutter={20}
                  style={{ title: { fontSize: 10 } }}
                  data={[
                    { name: "Compras", symbol: { fill: "#025AA6", type: "square" } }
                  ]}
                />
                <VictoryAxis
                  style={{
                    axis: { stroke: "gray" },
                    axisLabel: { fontSize: 10, padding: 0 },
                    grid: { stroke: "none" },
                    ticks: { stroke: "black", size: 2 },
                    tickLabels: { fontSize: 10, padding: 5, angle: -45 }
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  orientation="top"
                  style={{
                    width: '100%'
                  }}
                />

                <VictoryBar
                  data={datacompras}
                  labels={({ datum }) => `R$ ${datum.y}`}
                  barWidth={10}
                  barRatio={1}
                  cornerRadius={6}
                  alignment="middle"
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                  style={{
                    data: {
                      fill: "#025AA6",
                      stroke: '#025AA6'
                      // width: 20,
                    }
                  }}
                />

              </VictoryChart>
            </Fragment>
          }
        </ScrollView>
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
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});