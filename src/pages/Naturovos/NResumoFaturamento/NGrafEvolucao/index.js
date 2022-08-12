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
  VictoryLegend,
  VictoryGroup
} from "victory-native";

export default function NGrafEvolucao() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [nResGrafico, setNResGrafico] = useState([]);
  const [nResTotal, setNResTotal] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getNResGrafico() {
      setLoading(true);
      await api.get(`nresgrafico/${dtFormatada(dataFiltro)}`)
        .then(nresgrafico => {
          setNResGrafico(nresgrafico.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNResGrafico();
  }, [dataFiltro]);

  useEffect(() => {
    async function getNResTotal() {
      setLoading(true);
      await api.get(`nrestotais/${dtFormatada(dataFiltro)}`)
        .then(nrestotais => {
          setNResTotal(nrestotais.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNResTotal();

  }, [dataFiltro]);

  const dataResumo = nResGrafico.map((gr) => {
    return {
      x: gr.Dia,
      y: gr.MesAtual,
      z: gr.MesAnterior,
      w: gr.AnoMesAtual
    };
  });

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading />
        :
        <ScrollView>

          {nResTotal.map((fatmes, index) => (
            <DataTable key={index} style={{ marginBottom: 10 }}>

              <DataTable.Header style={styles.titleTable}>
                <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloProjecao}</Text></DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>{<MoneyPTBR number={((fatmes.ProjecaoFaturamento) * 1)} />}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Header style={styles.titleTable}>
                <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloDif}</Text></DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>{((fatmes.DifMesAntAtual) * 100).toFixed()}%</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Header style={styles.titleTable}>
                <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloGrafico}</Text></DataTable.Title>
              </DataTable.Header>
            </DataTable>
          ))}

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {nResGrafico &&
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
                    style={{
                      title: { fontSize: 10 }
                    }}
                    data={[
                      { name: nResTotal[0]?.RotuloGrafMesAnoAtual, symbol: { fill: "#025AA6", type: "square" } },
                      { name: nResTotal[0]?.RotuloGrafMesAnterAnoAtual, symbol: { fill: "#F5AB00", type: "minus" } },
                      { name: nResTotal[0]?.RotuloGrafAnoAnter, symbol: { fill: "#FF0000", type: "minus" } }
                    ]}
                  />

                  <VictoryAxis
                    tickValues={nResGrafico.map((gr) => (gr.Dia))}
                    style={{
                      axis: { stroke: "gray" },
                      axisLabel: { fontSize: 10, padding: 0 },
                      grid: { stroke: "#dbdbdb" },
                      ticks: { stroke: "black", size: 2 },
                      tickLabels: { fontSize: 10, padding: 5, angle: 0 }
                    }}
                  />

                  <VictoryAxis
                    dependentAxis
                    orientation="top"
                    style={{
                      width: '100%',
                      grid: { stroke: "#dbdbdb" },
                      tickLabels: { fontSize: 10, padding: 2, angle: -30 },
                      marginBottom: 50
                    }}
                  />

                  <VictoryLine
                    style={{ data: { stroke: "#025AA6", strokeWidth: 2 } }}
                    data={dataResumo}
                  />
                  <VictoryLine
                    style={{ data: { stroke: "#F5AB00", strokeWidth: 2 } }}
                    data={dataResumo}
                    y="z"
                  />
                  <VictoryLine
                    style={{ data: { stroke: "#FF0000", strokeWidth: 2 } }}
                    data={dataResumo}
                    y="w"
                  />
                </VictoryChart>
              </Fragment>
            }

          </ScrollView>
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
    color: "#FFF",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#333"
  }
});