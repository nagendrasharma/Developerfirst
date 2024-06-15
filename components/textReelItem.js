import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { likeTextReel, unlikeTextReel } from '../actions/textReel';

const TextReelItem = ({ textReel }) => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>{textReel.content}</Text>
      <Button title="Like" onPress={() => dispatch(likeTextReel(textReel._id))} />
      <Button title="Unlike" onPress={() => dispatch(unlikeTextReel(textReel._id))} />
    </View>
  );
};

export default TextReelItem;
