import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Platform, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from '../../contexts/auth';

export default function Calendar({ color }) {

  const { setDataFiltro } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setDataFiltro(currentDate)
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    setDataFiltro(date)
    hideDatePicker();
  };

  return (
    <Fragment>
      <View>
        {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
        <Icon onPress={showDatePicker}  name="calendar" size={25} color={color ? color : '#333'} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          value={date}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onChange={onChange}
          locale="pt-br"
        />
      </View>
    </Fragment>
  );
}