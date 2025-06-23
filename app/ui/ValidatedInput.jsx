import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const ValidatedInput = ({
  label,
  value,
  onChange,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  required = false,
  minLength,
  maxLength,
  validator, // Optional custom validator function
  onBlur,
  error: externalError, // Optional external error override
}) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (touched) validate(value);
  }, [value]);

  const validate = (text) => {
    if (required && !text) {
      setError("Bitte geben Sie Ihre Daten ein.");
    } else if (minLength && text.length < minLength) {
      setError(`Minimum length is ${minLength}`);
    } else if (maxLength && text.length > maxLength) {
      setError(`Maximum length is ${maxLength}`);
    } else if (validator && typeof validator === "function") {
      const validationError = validator(text);
      setError(validationError);
    } else {
      setError(null);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validate(value);
    if (onBlur) onBlur();
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, (error || externalError) && styles.inputError]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onBlur={handleBlur}
      />
      {(error || externalError) && (
        <Text style={styles.errorText}>{externalError || error}</Text>
      )}
    </View>
  );
};

export default ValidatedInput;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#c2ddf0",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    marginTop: 4,
  },
});
