import React, { useContext } from 'react';
import { Button, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import PageHeading from '../components/PageHeading';
import { Context as AuthContext } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <PageHeading headerText="My Account" />
      <Spacer />
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
});

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <Feather name="settings" size={20} />,
};

export default AccountScreen;
