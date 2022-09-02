import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

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

export default function Performance() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [sFatTotais, setSFatTotais] = useState([]);
  const [sFatGrafico, setSFatGrafico] = useState([]);

  useEffect(() => {

    async function getSFatGrafico() {
      setLoading(true);
      await api.get(`sfatgrafico/${dtFormatada(dataFiltro)}`)
        .then(sfatgrafico => {
          setSFatGrafico(sfatgrafico.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSFatGrafico();
  }, [dataFiltro]);

  useEffect(() => {
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

  const datavendas = sFatGrafico.map((gr) => {
    return {
      x: gr.DiaSemana,
      y: gr.Vendas,
      z: (gr.Margem * 98000)
    };
  });

  const metaUnique = sFatTotais.map((m) => (m.PerfDiaMeta));

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading color="#DC2626"/>
        :
        <ScrollView>
          <DataTable.Row style={styles.titleTable}>
            <DataTable.Cell><Text style={styles.titleText}>Performance do Mês</Text></DataTable.Cell>
          </DataTable.Row>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

            <DataTable style={{ marginBottom: 10 }}>
              <DataTable.Header style={{ backgroundColor: '#eee' }}>
                <DataTable.Title style={styles.colmedia}>Meta</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Venda</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Falta Vender</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Meta Parcial</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Atingido</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Perf.Atual</DataTable.Title>
              </DataTable.Header>
              {sFatTotais.map((fatmes, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatmes.PerfMesMeta) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatmes.PerfMesVenda) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((fatmes.PerfMesFaltVender) * 1) > 0 ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((fatmes.PerfMesFaltVender) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fatmes.PerfMesMetaParcial) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fatmes.PerfMesAtingido) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>
                    <Text
                      style={((fatmes.PerfMesPerf) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((fatmes.PerfMesPerf) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>

          <DataTable.Row style={styles.titleTable}>
            <DataTable.Cell style={styles.titleText}><Text style={styles.titleText}>Performance do Dia {sFatTotais[0]?.DiaAtual}</Text></DataTable.Cell>
          </DataTable.Row>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <DataTable style={{ marginBottom: 20 }}>

              <DataTable.Header style={{ backgroundColor: '#eee' }}>
                <DataTable.Title style={styles.colmedia}>Meta Dia</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Venda Dia</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Falta Vender</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Perf. Dia</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Média Dia</DataTable.Title>
              </DataTable.Header>
              {sFatTotais.map((fatdia, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatdia.PerfDiaMeta) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatdia.PerfDiaVenda) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((fatdia.PerfDiaFaltaVender) * 1) > 0 ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((fatdia.PerfDiaFaltaVender) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>
                    <Text
                      style={((fatdia.PerfDiaPerf) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((fatdia.PerfDiaPerf) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>{<MoneyPTBR number={((fatdia.MediaDia) * 1)} />}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
          {sFatGrafico &&
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
                    { name: "Meta", symbol: { fill: "#158000", type: "minus" } },
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
                  style={{ data: { stroke: "#158000", strokeWidth: 2 } }}
                  y={() => metaUnique}
                />
                <VictoryLine
                  style={{ data: { stroke: "#F5AB00", strokeWidth: 2 } }}
                  data={datavendas}
                  y="z"
                />
              </VictoryChart>

              <Svg style={{ height: 160, width: '100%', left: 0, top: 619, position: 'absolute' }}>
                <G transform={"translate(0, 40)"}>
                  <VictoryAxis
                    // width={690}
                    height={120}
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
    backgroundColor: "#f26000",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});