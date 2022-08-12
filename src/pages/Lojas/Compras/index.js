import React, { useContext, useState, useEffect } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { AuthContext } from '../../../contexts/auth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import CCompDiario from './CompDiario';
import CPerformance from './Performance';
import CPerformanceAss from './PerformanceAss';
import CPerformanceMes from './PerformanceMes';
import { BoxHome, TabContainer } from '../../style';
import api from '../../../services/api';

const CompraTab = createMaterialTopTabNavigator();

export default function LCompras() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [comTotais, setComTotais] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
          async function getComTotais() {
              await api.get(`comtotais/${dtFormatada(dataFiltro)}`)
                  .then(comtotais => {
                    setComTotais(comtotais.data);
                  })
                  .catch(err => {
                      console.log(err);
                  })
          }
          getComTotais();
      }, [dataFiltro]);

  return (
    <BoxHome>
      <HeaderPage
        startColor="#014D9B"
        endColor="#0A3B7E"
        textColor="#FFF"
        title="Lojas Solar"
        subTitle="Compras"
        dtatu={moment(comTotais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
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