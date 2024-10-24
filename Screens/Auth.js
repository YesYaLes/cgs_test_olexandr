import {
  TextInput,
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { Formik } from "formik";

import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

const UserData = {
  email: "admin@admin.com",
  password: "admin1234",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Wrong email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 symbols")
    .required("Password is required"),
});

const Auth = () => {
  const navigation = useNavigation();

  const handleSubmit = (values) => {
    values.email === UserData.email && values.password === UserData.password
      ? redirectToHome(values)
      : alert("No user with current data has found");
  };

  const redirectToHome = (data) => {
    navigation.navigate("Tabs", {
      screen: "Home",
    });
  };

  return (
    <SafeAreaView style={styles.screenView}>
      <KeyboardAvoidingView
        style={styles.scroll}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.userData}>
          <Text style={{ fontSize: 20 }}>Login data</Text>
          <Text>{UserData.email}</Text>
          <Text>{UserData.password}</Text>
        </View>

        <Text style={styles.topicText}>Log in</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Enter password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Button onPress={handleSubmit} title="Enter" />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topicText: { fontSize: 30 },
  userData: { position: "absolute", top: 0, right: 10, gap: 5 },
  screenView: {
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  scroll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Auth;
