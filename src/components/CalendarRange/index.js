import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from '../../contexts/auth';
import moment from 'moment';

export default function CalendarRange({ color }) {

  const { setDataFluxo1, setDataFluxo2, dataFluxo1, dataFluxo2, setTabFluxo } = useContext(AuthContext);
  // data picker 1
  const [date1, setDate1] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date1) => {
    setDate1(date1);
    setDataFluxo1(date1)
    hideDatePicker1();
  };

  // data picker 2
  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

  // const onChange2 = (event, selectedDate2) => {
  //   const currentDate2 = selectedDate2;
  //   setShow2(false);
  //   setDate2(currentDate2);
  //   setDataFluxo2(currentDate2)
  // };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = (date2) => {
    setDate2(date2);
    setDataFluxo2(date2)
    hideDatePicker2();
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <Icon onPress={showDatePicker1} name="calendar" size={25} color={color ? color : '#fff'} />
        <Text style={[styles.textDate1, { color: color ? color : '#fff'}]}>{moment(dataFluxo1).format('DD/MM/YYYY')}</Text>
        <Text style={[styles.textDate2, { color: color ? color : '#fff'}]}>{moment(dataFluxo2).format('DD/MM/YYYY')}</Text>
        <Icon onPress={showDatePicker2} name="calendar" size={25} color={color ? color : '#fff'} />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible1}
        value={date1}
        mode="date"
        onConfirm={handleConfirm1}
        onCancel={hideDatePicker1}
        // onChange={onChange1}
        locale="pt-br"
        confirmTextIOS="OK"
        cancelTextIOS="Cancelar"
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        value={date2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
        // onChange={onChange2}
        locale="pt-br"
        confirmTextIOS="OK"
        cancelTextIOS="Cancelar"
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 4
  },
  textDate1: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 12
  },
  textDate2: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 12
  }
})