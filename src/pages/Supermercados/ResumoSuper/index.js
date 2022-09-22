import React, { useContext, useEffect, useState } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const ResumoTab = createMaterialTopTabNavigator();

import Filiais from './Filial';
import Segmento from './Segmento';
import { AuthContext } from '../../../contexts/auth';
import moment from 'moment';
import api from '../../../services/api';

export default function ResumoSuper() {
  
  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [totais, setTotais] = useState([]);

  useEffect(() => {

      async function getTotais() {
          await api.get(`totais/${dtFormatada(dataFiltro)}`)
              .then(totais => {
                  const tot = totais.data.filter((dep) => (dep.Departamento === 2)); 
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
        startColor="#FF710F"
        endColor="#f26000"
        textColor="#FFF"
        title="Supermercados"
        subTitle="Resumo de Faturamento"
        dtatu={moment(totais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
        bgStatus="#f26000"
        barStyle="light"
      />
      <TabContainer>
        <ResumoTab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14 },
            // tabBarItemStyle: { width: 125 },
            tabBarStyle: { backgroundColor: '#f1f1f1' },
            tabBarIndicatorStyle: {backgroundColor: '#f26000'},
            tabBarPressColor: '#FF710F' 
          }}
        >
          <ResumoTab.Screen name="Filial" component={Filiais} />
          <ResumoTab.Screen name="Segmento" component={Segmento} />
        </ResumoTab.Navigator>
      </TabContainer>

    </BoxHome>
  );
}