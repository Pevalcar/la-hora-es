import { Picker } from "@react-native-picker/picker"
import { useRef, useState } from "react"

export function PickerM() {
    const [selectedLanguage, setSelectedLanguage] = useState()

    return (
        <Picker
            style={{
                textAlignVertical: "center",
                textShadowColor: "black",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
            }}
            itemStyle={{ color: "black", fontSize: 16, fontWeight: "bold" }}
            className="text-black dark:text-white"
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
            }
        >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>
    )
}
