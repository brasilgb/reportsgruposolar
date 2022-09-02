import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import Loading from '../../../../components/Loading';
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
import { Svg, G } from 'react-native-svg';

export default function NPerformance() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [nfatuTotais, setNfatuTotais] = useState([]);
  const [nfatuGrafico, setNfatuGrafico] = useState([]);

  useEffect(() => {
    async function getNfatuGrafico() {
      setLoading(true);
      await api.get(`nfatugrafico/${dtFormatada(dataFiltro)}`)
        .then(nfatugrafico => {
          setNfatuGrafico(nfatugrafico.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNfatuGrafico();
  }, [dataFiltro]);

  useEffect(() => {
    async function getNfatuTotais() {
      setLoading(true);
      await api.get(`nfatutotais/${dtFormatada(dataFiltro)}`)
        .then(nfatutotais => {
          setNfatuTotais(nfatutotais.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNfatuTotais();

  }, [dataFiltro]);


  const datavendas = nfatuGrafico.map((gr) => {
    return {
      x: gr.DiaSemana,
      y: gr.Vendas,
      z: ((gr.Margem * 100) * 20000)
    };
  });

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading color="#F5AB00"/>
        :
        <ScrollView>
          <DataTable style={{ marginBottom: 10 }}>
            <DataTable.Header style={styles.titleTable}>
              <DataTable.Title><Text style={styles.titleText}>Média</Text></DataTable.Title>
            </DataTable.Header>
            {nfatuTotais.map((fatmes, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{<MoneyPTBR number={((fatmes.MediaDia) * 1)} />}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          {nfatuGrafico &&
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
                    { name: "Vendas", symbol: { fill: "#025AA6", type: "square" } },
                    { name: "Margem", symbol: { fill: "#F5AB00", type: "minus" } }
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
                  data={datavendas}
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

                <VictoryLine
                  style={{ data: { stroke: "#F5AB00", strokeWidth: 2 } }}
                  data={datavendas}
                  y="z"
                />

              </VictoryChart>

              <Svg style={{ height: 60, width: '100%', left: 0, top: 485, position: 'absolute' }}>
                <G transform={"translate(0, 40)"}>
                  <VictoryAxis
                    height={40}
                    offsetY={60}
                    standalone={false}
                    theme={VictoryTheme.material}
                    orientation="bottom"
                    domain={[0, 120]}
                    // tickValues={[0, 20, 40, 60, 80, 100, 120]}
                    tickFormat={(t) => `${Math.round(t)}%`}
                    style={{
                      axis: { stroke: "#F5AB00" },
                      axisLabel: { fontSize: 10 },
                      grid: { stroke: "none" },
                      ticks: { stroke: "gray", size: 5 },
                      tickLabels: { fontSize: 12 }
                    }}
                  />
                </G>
              </Svg>
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
    backgroundColor: "#F5AB00",
    color: "#333",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#333"
  }
});