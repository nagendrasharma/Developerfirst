import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import TextReelList from '/Users/nagendrasharma/Developer/Text_Reel/src/components/textReelList.js';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Button title="Logout" onPress={() => dispatch(logout())} />
      <TextReelList />
    </View>
  );
};

export default HomeScreen;
