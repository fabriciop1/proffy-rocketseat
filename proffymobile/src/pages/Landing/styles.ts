import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8257E5",
    padding: 40,
  },
  banner: {
    width: "100%",
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    color: "#FFF",
    lineHeight: 30,
    marginTop: 80,
    fontSize: 20,
  },
  titleBold: {
    fontFamily: "Poppins_600SemiBold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },
  button: {
    height: 150,
    width: "48%",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 24,
    justifyContent: "space-between",
  },
  firstButton: {
    backgroundColor: "#9871F5",
  },
  secondButton: {
    backgroundColor: "#04D361",
  },
  buttonText: {
    fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 19,
  },
  connections: {
    fontFamily: "Poppins_400Regular",
    color: "#D4C2FF",
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 300,
    marginTop: 40,
  },
});

export default styles;
