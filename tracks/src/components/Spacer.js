import React from 'react';
import { StyleSheet, View } from 'react-native';

const Spacer = ({ children }) => {
  // Whenever an element is placed within Spacer using regular jsx,
  // it will be passed into this component as the prop `children` and
  // wrapped in the view which contains the stylesheet applied margin.
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});

export default Spacer;
