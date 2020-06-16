import React, { useContext } from 'react';
import { Button, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Spacer from '../components/Spacer';
import PageHeading from '../components/PageHeading';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <PageHeading headerText="My Account" />
      <Spacer />
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
});

export default AccountScreen;
