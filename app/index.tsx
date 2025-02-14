import { MaterialCommunityIcons } from "@expo/vector-icons"
import Slider from "@react-native-community/slider"
import * as Speech from "expo-speech"
import { useColorScheme } from "nativewind"
import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Switch, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function LaHoraEs() {
    const [isActive, setIsActive] = useState(false)
    const [interval, setInterval] = useState<number>(15) // minutes
    const { colorScheme, setColorScheme } = useColorScheme()
    const [lastSpoken, setLastSpoken] = useState("")
    const speakTime = () => {
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()

        // Construct Spanish time message
        let timeMessage = "La hora es "
        if (hours === 1) {
            timeMessage += "la una"
        } else {
            timeMessage += `las ${hours}`
        }

        if (minutes === 0) {
            timeMessage += " en punto"
        } else if (minutes === 15) {
            timeMessage += " y cuarto"
        } else if (minutes === 30) {
            timeMessage += " y media"
        } else if (minutes === 45) {
            timeMessage += " menos cuarto"
        } else {
            timeMessage += ` y ${minutes} minutos`
        }

        Speech.speak(timeMessage, {
            language: "es-ES",
            pitch: 1,
            rate: 0.8,
        })

        setLastSpoken(timeMessage)
    }

    useEffect(() => {
        let timer
        if (isActive) {
            speakTime() // Speak immediately when activated
            timer = setInterval(
                () => {
                    speakTime()
                    console.log("timer")
                },
                interval * 60 * 1000
            ) // Convert minutes to milliseconds
        }
        return () => clearInterval(timer)
    }, [isActive, interval])

    const formatTime = () => {
        const now = new Date()
        return now.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    }

    return (
        <View className="h-full w-full bg-white p-5 dark:bg-black">
            <SafeAreaView />
            <View className="card items-center">
                <Text
                    className="text"
                    onPress={() =>
                        setColorScheme(
                            colorScheme === "light" ? "dark" : "light"
                        )
                    }
                >
                    {`The color scheme is ${colorScheme}`}
                </Text>
                <MaterialCommunityIcons
                    className="text my-1 py-1 text-7xl font-bold"
                    name="clock-outline"
                    size={60}
                    color="#4A90E2"
                />
                <Text className="text my-3 py-5 text-7xl font-bold">
                    {formatTime()}
                </Text>
                <Text className="text my-3 py-5 text-xl font-bold">
                    {lastSpoken}
                </Text>
            </View>

            <View className="card">
                <View style={styles.switchContainer}>
                    <Text className="text text-base">Activar anuncios</Text>
                    <Switch
                        value={isActive}
                        onValueChange={setIsActive}
                        trackColor={{ false: "#767577", true: "#4A90E2" }}
                        thumbColor={isActive ? "#fff" : "#f4f3f4"}
                    />
                </View>

                <View style={styles.sliderContainer}>
                    <Text className="text">Intervalo: {interval} minutos</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={60}
                        step={1}
                        value={interval}
                        onValueChange={setInterval}
                        minimumTrackTintColor="#4A90E2"
                        maximumTrackTintColor="#d3d3d3"
                        thumbTintColor="#4A90E2"
                    />
                </View>

                <Pressable
                    className="text m-2 flex flex-row items-center justify-center rounded-full bg-white p-6 shadow-lg shadow-slate-950 dark:bg-slate-600 dark:shadow-gray-200"
                    onPress={speakTime}
                >
                    <MaterialCommunityIcons
                        name="volume-high"
                        size={24}
                        color="#4A90E2"
                    />
                    <Text>Decir hora ahora</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    currentTime: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 10,
    },
    lastSpoken: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    sliderContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    slider: {
        height: 40,
    },
    speakButton: {
        backgroundColor: "#4A90E2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    speakButtonPressed: {
        backgroundColor: "#357ABD",
    },
    speakButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
    },
})
