import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  //logitud y latitud

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Se denegó el permiso para acceder a la ubicación");
        return;
      }
      //Obtiene la ubicación actual y nombre de la ciudad
      let location = await Location.getCurrentPositionAsync({});
      //Obtiene la ubicación actual y nombre de la ciudad
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,

        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      //Obtiene la ubicación actual y nombre de la ciudad

      const { city, country, postalCode, region, street, subregion } =
        geocode[0];

      setLocation({
        Cuidad: city,
        Pais: country,

        Codigo_Postal: postalCode,
        Region: region,
        Calle: street,
        Region: subregion,
      });
    })();
  }, []);

  let text = "Esperando..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
