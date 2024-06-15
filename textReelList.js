import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTextReels } from '../actions/textReel';
import TextReelItem from '/Users/nagendrasharma/Developer/Text_Reel/src/components/textReelItem';

const TextReelList = () => {
  const dispatch = useDispatch();
  const textReels = useSelector(state => state.textReel.textReels);

  useEffect(() => {
    dispatch(getTextReels());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={textReels}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TextReelItem textReel={item} />}
      />
    </View>
  );
};

export default TextReelList;
