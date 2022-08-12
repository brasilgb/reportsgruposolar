import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../contexts/auth';

export default function Calendar({ color }) {

  const { setDataFiltro, dataFiltro} = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setDataFiltro(currentDate)
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <Fragment>
      <View>
        <Icon onPress={showDatepicker}  name="calendar" size={25} color={color ? color : '#333'} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
            locale="pt-br"
          />
        )}
      </View>
    </Fragment>
  );
}