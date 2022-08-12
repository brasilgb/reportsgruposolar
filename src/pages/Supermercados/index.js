import React, { useState, useContext, useEffect } from 'react';
import { BoxButtom, ButtomSetores } from '../../components/Buttons';
import HeaderHome from '../../components/Header/Home';
import moment from 'moment';
import { AreaUm, BoxHome, ButtonArea, ContainerText, GraphArea, ScreenArea } from '../style';
import { AuthContext } from '../../contexts/auth';
import MoneyPTBR from '../../components/MoneyPTBR';
import CircularProgress from 'react-native-circular-progress-indicator';
import api from '../../services/api';
import Loading from '../../components/Loading';

export default function Naturovos() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [totais, setTotais] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getTotais() {
      setLoading(true)
      await api.get(`totais/${dtFormatada(dataFiltro)}`)
        .then(totais => {
          const tot = totais.data.filter((dep) => (dep.Departamento === 2));
          setTotais(tot);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getTotais();
  }, [dataFiltro]);

  const colorValid = ((value) => {
    if (value <= 90) return "#DC2626";
    if (value <= 98) return "#F18800";
    if (value > 98) return "#10B981";
  });

  return (
    <BoxHome>
      <HeaderHome
        startColor="#FF710F"
        endColor="#f26000"
        textColor="#FFF"
        bgStatus="#f26000"
        barStyle="ligth-content"
        title="Supermercados"
        subTitle="Resumo de Faturamento"
        dtatu={moment(totais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
      />
      <ScreenArea>
        {loading
          ?
          <Loading color="#DC2626"/>
          :
          <GraphArea>
            <AreaUm height="70px" paddingTop="">
              <ContainerText>
                <ContainerText.Title color="#0e98e5">Meta</ContainerText.Title>
                <ContainerText.Value color="#0e98e5"> <MoneyPTBR number={totais[0]?.Meta ? totais[0]?.Meta : 0} /> </ContainerText.Value>
              </ContainerText>
              <ContainerText>
                <ContainerText.Title color={colorValid(totais[0]?.MetaAlcancada * 100)}>Faturamento</ContainerText.Title>
                <ContainerText.Value color={colorValid(totais[0]?.MetaAlcancada * 100)}> <MoneyPTBR number={parseFloat(totais[0]?.Faturamento ? totais[0]?.Faturamento : 0)} /> </ContainerText.Value>
              </ContainerText>
            </AreaUm>

            <AreaUm height="120px" paddingTop="10%">
              <ContainerText>
                <ContainerText.Title color="#555" style={{ fontSize: 18 }}>Ticket Médio</ContainerText.Title>
                <ContainerText.Value color="#555" style={{ fontSize: 40, fontWeight: 'bold' }}> <MoneyPTBR number={parseFloat(totais[0]?.TicketMedio ? totais[0]?.TicketMedio : 0)} /> </ContainerText.Value>
              </ContainerText>

            </AreaUm>

            <AreaUm paddingTop="30%">

              <CircularProgress
                value={totais[0]?.Margem ? (totais[0]?.Margem) * 100 : 0}
                radius={70}
                duration={2000}
                inActiveStrokeOpacity={0.4}
                progressValueColor={colorValid(totais[0]?.Margem * 100)}
                activeStrokeColor={colorValid(totais[0]?.Margem * 100)}
                activeStrokeWidth={10}
                inActiveStrokeWidth={10}
                maxValue={100}
                title={'Margem'}
                titleColor={colorValid(totais[0]?.Margem * 100)}
                titleFontSize={12}
                progressValueFontSize={30}
                titleStyle={{ fontWeight: 'bold' }}
                valueSuffixStyle={{ fontWeight: 'normal', position: 'absolute', top: 10, right: -18 }}
                valueSuffix={'%'}
              />

              <CircularProgress
                value={totais[0]?.Projecao ? (totais[0]?.Projecao) * 100 : 0}
                radius={70}
                duration={2000}
                inActiveStrokeOpacity={0.4}
                progressValueColor={colorValid(totais[0]?.Projecao * 100)}
                activeStrokeColor={colorValid(totais[0]?.Projecao * 100)}
                activeStrokeWidth={10}
                inActiveStrokeWidth={10}
                maxValue={100}
                title={'Projeção'}
                titleColor={colorValid(totais[0]?.Projecao * 100)}
                titleFontSize={12}
                progressValueFontSize={30}
                titleStyle={{ fontWeight: 'bold' }}
                valueSuffixStyle={{ fontWeight: 'normal', position: 'absolute', top: 10, right: -18 }}
                valueSuffix={'%'}
              />

            </AreaUm>

          </GraphArea>
        }
        <ButtonArea>

          <BoxButtom>

            <ButtomSetores
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="ios-list-sharp"
              title="Resumo"
              onPress="ResumoSuper"
            />

            <ButtomSetores
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="ios-logo-usd"
              title="Faturamento"
              onPress="SFaturamento"
            />

            <ButtomSetores
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="md-cart-outline"
              title="Compras"
              onPress="SCompras"
            />

          </BoxButtom>

        </ButtonArea>
      </ScreenArea>
    </BoxHome>
  );
}