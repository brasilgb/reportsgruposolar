import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { AuthContext } from '../../../contexts/auth';
import api from '../../../services/api';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const ResumoTab = createMaterialTopTabNavigator();
import Filial from './Filial';
import Grupo from './Grupo';
import Exportacao from './Exportacao';

export default function NResumo() {
  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [totais, setTotais] = useState([]);

  useEffect(() => {

    async function getTotais() {
      await api.get(`totais/${dtFormatada(dataFiltro)}`)
        .then(totais => {
          const tot = totais.data.filter((dep) => (dep.Departamento === 5));
          setTotais(tot);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getTotais();
  }, [dataFiltro]);

  return (
    <BoxHome>
      <HeaderPage
        startColor="#fcbc32"
        endColor="#F5AB00"
        textColor="#333"
        title="Naturovos"
        subTitle="Resumo de Faturamento"
        dtatu={moment(totais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
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
          <ResumoTab.Screen name="Exportação" component={Exportacao} />
          <ResumoTab.Screen name="Filial" component={Filial} />
          <ResumoTab.Screen name="Grupo" component={Grupo} />
        </ResumoTab.Navigator>
      </TabContainer>
    </BoxHome>
  );
}