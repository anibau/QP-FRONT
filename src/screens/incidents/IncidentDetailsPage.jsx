import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Dimensions, ScrollView } from 'react-native';
import { AppBar } from '../../ui/general/AppBar';
import { texts, colors } from '../../utils/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { getIncidentDetails } from '../../controllers/incidents_controller';
import Toast from 'react-native-toast-message';
import * as Sharing from 'expo-sharing';
import { downloadFileToLocal } from '../../services/files/download';

const screenHeight = Dimensions.get('window').height;

export const IncidentDetailsPage = ({ navigation, route }) => {
  const { id = "", incident } = route.params;

  const [details, setDetails] = useState(undefined);

  const getDetails = async () => {
    const resp = await getIncidentDetails(id);
    if (resp.hasError) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: resp.message,
        position: "bottom",
      });
      return;
    }
    setDetails(resp.data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleDownload = async () => {
    try {
      const fileUrl = incident?.incidence_file || details?.incidence_file;

      if (!fileUrl) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No hay archivo disponible',
        });
        return;
      }

      const filename = `archivo_${details.id}.png`;

      const localUri = await downloadFileToLocal(fileUrl, filename);

      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Toast.show({
          type: 'info',
          text1: 'Descargado',
          text2: 'Archivo guardado localmente',
        });
        return;
      }

      await Sharing.shareAsync(localUri);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo descargar el archivo',
      });
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 1,
          height: screenHeight,
        }}
      >
        <AppBar
          title="Buzón de incidencias"
          onPress={() => navigation.pop()}
        />

        <View
          style={{
            height: screenHeight * 0.1,
            justifyContent: "center",
            marginBottom: "3%",
          }}
        >
          <Text style={{ ...texts.titleSection, paddingHorizontal: "5%" }}>
            Detalle de incidencia
          </Text>
        </View>

        {details !== undefined && (
          <ScrollView style={{ paddingHorizontal: "5%" }}>
            <Text style={{ ...texts.generalHighlighText, marginBottom: "2%" }}>
              Tipo de incidencia
            </Text>
            <Text style={{ ...texts.simpleTextObscure, marginBottom: "15%" }}>
              {details.incidence_description}
            </Text>

            <Text style={{ ...texts.generalHighlighText, marginBottom: "2%" }}>
              Comentario
            </Text>
            <Text style={{ ...texts.simpleTextObscure, marginBottom: "15%" }}>
              {details.incidence_comment}
            </Text>

            <Text style={{ ...texts.generalHighlighText, marginBottom: "2%" }}>
              Estado de incidencia
            </Text>
            <Text style={{ ...texts.simpleTextObscure, marginBottom: "15%" }}>
              {details.estado}
            </Text>

            {details.incidence_file && (
              <>
                <Text style={{ ...texts.generalHighlighText, marginBottom: "2%" }}>
                  Archivo adjunto
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10%",
                  }}
                >
                  <Text style={{ ...texts.simpleTextObscure }}>
                    Archivo 1
                  </Text>

                  <MaterialIcons
                    name="file-download"
                    size={24}
                    color={colors.greenColor}
                    onPress={handleDownload}
                  />
                </View>
              </>
            )}

            <Text style={{ ...texts.generalHighlighText, marginBottom: "2%" }}>
              Respuesta
            </Text>
            <Text style={{ ...texts.simpleTextObscure, marginBottom: "10%" }}>
              {details.incidence_resolution}
            </Text>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};
