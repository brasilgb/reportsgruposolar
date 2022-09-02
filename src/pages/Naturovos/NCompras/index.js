import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { AuthContext } from '../../../contexts/auth';
import api from '../../../services/api';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NPerformance from './NPerformance';
import NCompDiario from './NCompDiario';
import NPerfMes from './NPerfMes';
import NPerfAssociacao from './NPerfAssociacao';
const CompraTab = createMaterialTopTabNavigator();

export default function NCompras() {
 
  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [nComTotal, setNComTotal] = useState([]);

  useEffect(() => {
    async function getNComTotal() {
        await api.get(`ncomtotal/${dtFormatada(dataFiltro)}`)
            .then(comtotais => {
              setNComTotal(comtotais.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    getNComTotal();
}, [dataFiltro]);

  return (
    <BoxHome>
      <HeaderPage
        startColor="#fcbc32"
        endColor="#F5AB00"
        textColor="#333"
        title="Naturovos"
        subTitle="Compras"
        dtatu={moment(nComTotal[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
        bgStatus="#F5AB00"
        barStyle='light-content'
      />

      <TabContainer>
        <CompraTab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14 },
            // tabBarItemStyle: { width: 125 },
            tabBarStyle: { backgroundColor: '#f1f1f1' },
            tabBarIndicatorStyle: { backgroundColor: '#F5AB00' },
            tabBarPressColor: '#fcbc32'
          }}
        >
          <CompraTab.Screen name="Compar. Diário" component={NCompDiario} />
          <CompraTab.Screen name="Perform." component={NPerformance} />
          <CompraTab.Screen name="Perform. Mês" component={NPerfMes} />
          <CompraTab.Screen name="Perform. Tipo." component={NPerfAssociacao} />
        </CompraTab.Navigator>
      </TabContainer>
    </BoxHome>
  );
}