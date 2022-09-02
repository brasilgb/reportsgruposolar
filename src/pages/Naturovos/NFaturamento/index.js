import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { AuthContext } from '../../../contexts/auth';
import api from '../../../services/api';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NResumo from './NResumo';
import NPerformance from './NPerformance';
import NPerfAssociacao from './NPerfAssociacao';
import NPerfMes from './NPerfMes';
const ResumoTab = createMaterialTopTabNavigator();


export default function NFaturamento() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [nfatuTotais, setNfatuTotais] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getNfatuTotais() {
      await api.get(`nfatutotais/${dtFormatada(dataFiltro)}`)
        .then(nfatutotais => {
          setNfatuTotais(nfatutotais.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNfatuTotais();
  }, [dataFiltro]);

  return (
    <BoxHome>
      <HeaderPage
        startColor="#fcbc32"
        endColor="#F5AB00"
        textColor="#333"
        title="Naturovos"
        subTitle="Faturamento"
        dtatu={moment(nfatuTotais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
        bgStatus="#F5AB00"
        barStyle='light-content'
      />
      <TabContainer>
        <ResumoTab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14 },
            // tabBarItemStyle: { width: 125 },
            tabBarStyle: { backgroundColor: '#f1f1f1' },
            tabBarIndicatorStyle: { backgroundColor: '#F5AB00' },
            tabBarPressColor: '#fcbc32'
          }}
        >
          <ResumoTab.Screen name="Resumo Diario" component={NResumo} />
          <ResumoTab.Screen name="Gráfico Perform." component={NPerformance} />
          <ResumoTab.Screen name="Perform. Assoc." component={NPerfAssociacao} />
          <ResumoTab.Screen name="Perform. Mês" component={NPerfMes} />
        </ResumoTab.Navigator>
      </TabContainer>
    </BoxHome>
  );
} 