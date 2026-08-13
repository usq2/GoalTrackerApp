import { TouchableOpacity, View } from 'react-native';

import RNFS from 'react-native-fs';

import { pick, types } from '@react-native-documents/picker';

import { FocusPlanSchema } from '../cache/cache.schema';
import { useTheme } from '../hooks/useTheme';
import { FileOpenIcon } from '../ui/icons/FileOpen';

export const AnalyticsScreen = () => {
  const { colors } = useTheme();
  // import a json file, validate its schema and replace the cache entries for it
  const handleJSONImport = async () => {
    try {
      const [res] = await pick({
        type: [types.json],
        mode: 'import',
      });
      const fileContents = await RNFS.readFile(res.uri);
      const parsedData = JSON.parse(fileContents);
      const validFile = FocusPlanSchema.parse(parsedData);
      return validFile;
    } catch (err) {
      console.log(err);
    }
  };
  // export weekly checkin json for chatgpt
  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          const file = await handleJSONImport();
        }}
      >
        <FileOpenIcon color={colors.primary} size={48} />
      </TouchableOpacity>
    </View>
  );
};
