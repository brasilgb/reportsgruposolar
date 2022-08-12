import React, { useContext, useEffect, useState } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { AuthContext } from '../../../contexts/auth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';

const CompraTab = createMaterialTopTabNavigator();

import CCompDiario from './CompDiario';
import CPerformance from './Performance';
import CPerformanceAss from './PerformanceAss';
import CPerformanceMes from './PerformanceMes';
import { BoxHome, TabContainer } from '../../style';
import api from '../../../services/api';

export default function SCompras() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [sComTotais, setSComTotais] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
          async function getSComTotais() {
              await api.get(`scomtotais/${dtFormatada(dataFiltro)}`)
                  .then(scomtotais => {
                    setSComTotais(scomtotais.data);
                  })
                  .catch(err => {
                      console.log(err);
                  })
          }
          getSComTotais();
      }, [dataFiltro]);

  return (
    <BoxHome>
      <HeaderPage
        startColor="#FF710F"
        endColor="#f26000"
        textColor="#FFF"
        bgStatus="#f26000"
        title="Supermercados"
        subTitle="Compras"
        dtatu={moment(sComTotais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
      />

      <TabContainer>
        <CompraTab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            // tabBarItemStyle: { width: 125 },
            tabBarStyle: { backgroundColor: '#fdfdfd' },
            tabBarIndicatorStyle: {backgroundColor: '#0A3B7E'},
            tabBarPressColor: '#014D9B'
          }}
        >
          <CompraTab.Screen name="Compar. Diário" component={CCompDiario} />
          <CompraTab.Screen name="Perform." component={CPerformance} />
          <CompraTab.Screen name="Perform. Ass." component={CPerformanceAss} />
          <CompraTab.Screen name="Perform. Mês" component={CPerformanceMes} />
        </CompraTab.Navigator>
      </TabContainer>

    </BoxHome>
  );
}