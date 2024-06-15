import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTextReel } from '../actions/textReel';

const CreateTextReelScreen = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addTextReel(content));
    setContent('');
  };

  return (
    <View>
      <TextInput
        placeholder="What's happening?"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Post" onPress={handleSubmit} />
    </View>
  );
};

export default CreateTextReelScreen;
