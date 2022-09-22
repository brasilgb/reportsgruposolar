import React, { Fragment, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import Loading from '../../../../components/Loading';
import MoneyPTBR from '../../../../components/MoneyPTBR';

export default function FluxoTotal({ fluxototal, loading }) {
    const [showFluxoTwo, setShowFluxoTwo] = useState(false);
    const [showFluxoThree, setShowFluxoThree] = useState(false);
    const [codigoFluxoTwo, setCodigoFluxoTwo] = useState();
    const [codigoFluxoThree, setCodigoFluxoThree] = useState();

    const toggleFluxoTwo = ((e, codigo) => {
        e.preventDefault();
        setCodigoFluxoTwo(codigo);
        setShowFluxoTwo(!showFluxoTwo);
    })

    const toggleFluxoThree = ((e, codigo) => {
        e.preventDefault();
        setCodigoFluxoThree(codigo);
        setShowFluxoThree(!showFluxoThree);
    })

    return (

        <Fragment>
            <View style={styles.container}>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.boxAll}>
                        <View style={styles.boxTitle}>
                            <Text style={styles.boxTitleText}>Fluxo de caixa Grupo Solar</Text>
                        </View>
                        {loading
                            ?
                            <Loading color="#F5AB00" />
                            :
                            fluxototal.filter((n1) => (n1.nivel === 1))
                                .sort((a, b) => a.ordem > b.ordem ? 1 : -1)
                                .map((itemOne, indexOne) => (
                                    <View key={indexOne}>
                                        <View style={styles.rowOne}>
                                            {fluxototal.filter((n2a) => (n2a.nivel === 2 && itemOne.codigo === n2a.agrupador)).length
                                                ? <Icon onPress={(e) => toggleFluxoTwo(e, itemOne.codigo)} style={styles.icon} name={codigoFluxoTwo == itemOne.codigo && showFluxoTwo ? 'chevron-up-sharp' : 'chevron-down-sharp'} size={18} />
                                                : <Icon style={styles.iconEmpty} name="remove" size={18} color="#ccc" />
                                            }
                                            <Text onPress={(e) => toggleFluxoTwo(e, itemOne.codigo)} style={styles.title}>
                                                {itemOne.descricao}</Text>
                                            <Text onPress={(e) => toggleFluxoTwo(e, itemOne.codigo)} style={[styles.value, { color: (itemOne.valor) > 0 ? 'green' : 'red' }]}>
                                                {<MoneyPTBR number={itemOne.valor} />}
                                            </Text>
                                        </View>
                                        {codigoFluxoTwo == itemOne.codigo && showFluxoTwo &&
                                            <View>
                                                {fluxototal.filter((n2) => (n2.nivel === 2 && itemOne.codigo === n2.agrupador && n2.valor != 0))
                                                    .sort((a, b) => a.ordem > b.ordem ? 1 : -1)
                                                    .map((itemTwo, indexTwo) => (
                                                        <View key={indexTwo}>
                                                            <View style={styles.rowTwo}>
                                                                {fluxototal.filter((n3a) => (n3a.nivel === 3 && itemTwo.codigo === n3a.agrupador)).length
                                                                    ? <Icon onPress={(e) => toggleFluxoThree(e, itemTwo.codigo)} style={styles.icon} name={codigoFluxoThree == itemTwo.codigo && showFluxoThree ? 'chevron-up-sharp' : 'chevron-down-sharp'} size={18} />
                                                                    : <Icon style={styles.iconEmpty} name="remove" size={18} color="#ddd" />
                                                                }
                                                                <Text onPress={(e) => toggleFluxoThree(e, itemTwo.codigo)} style={styles.title}>
                                                                    {itemTwo.descricao}</Text>
                                                                <Text onPress={(e) => toggleFluxoThree(e, itemTwo.codigo)} style={[styles.value, { color: (itemTwo.valor) > 0 ? 'green' : 'red' }]}>
                                                                    {<MoneyPTBR number={itemTwo.valor} />}
                                                                </Text>
                                                            </View>
                                                            {codigoFluxoThree == itemTwo.codigo && showFluxoThree &&
                                                                <View>
                                                                    {fluxototal.filter((n3) => (n3.nivel === 3 && itemTwo.codigo === n3.agrupador && n3.valor != 0))
                                                                        .sort((a, b) => a.ordem > b.ordem ? 1 : -1)
                                                                        .map((itemThree, indexThree) => (
                                                                            <View style={styles.rowThree} key={indexThree}>
                                                                                <Icon style={styles.iconEmpty} name="remove" size={18} color="#eee" />
                                                                                <Text style={styles.title}>{itemThree.descricao}</Text>
                                                                                <Text style={[styles.value, { color: (itemThree.valor) > 0 ? 'green' : 'red' }]}>
                                                                                    {<MoneyPTBR number={itemThree.valor} />}
                                                                                </Text>
                                                                            </View>
                                                                        ))}
                                                                </View>
                                                            }
                                                        </View>

                                                    ))}
                                            </View>
                                        }
                                    </View>
                                ))}
                    </View>
                </ScrollView>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 0,
        paddingTop: 0
    },
    boxAll: {
        backgroundColor: '#fff',
        margin: 5,
        elevation: 2,
        borderRadius: 6
    },
    boxTitle: {
        backgroundColor: '#F5AB00',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    boxTitleText: {
        fontSize: 14,
        textTransform: 'uppercase',
        color: "#333",
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    rowOne: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#E5E5EA",
        paddingHorizontal: 5,

        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd'
    },
    rowTwo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#F3F4F6",
        paddingLeft: 15,
        paddingRight: 5,

        // borderBottomWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: '#ddd'
    },
    rowThree: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#F9FAFB",
        paddingLeft: 25,
        paddingRight: 5,

        // borderBottomWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: '#ddd'
    },
    icon: {
        // flex: 0.3,
        borderRadius: 4,
        paddingHorizontal: 4,
        marginRight: 4,
        paddingVertical: 10,
    },
    iconEmpty: {
        // flex: 0.3,
        borderRadius: 4,
        paddingHorizontal: 4,
        marginRight: 4,
        paddingVertical: 10,
    },
    title: {
        flex: 3,
        fontSize: 14,
        // backgroundColor: "#29ABE2",
        paddingVertical: 10,
    },
    value: {
        // flex: 2,
        // backgroundColor: "#000",
        textAlign: 'right',
        borderLeftWidth: 1,
        borderLeftColor: '#dcdcdc',
        width: 140,
        paddingVertical: 10,
    }
});