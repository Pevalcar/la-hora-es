import { MaterialCommunityIcons } from "@expo/vector-icons"
import Slider from "@react-native-community/slider"
import * as Speech from "expo-speech"
import { useColorScheme } from "nativewind"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, StyleSheet, Switch, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Picker } from "@react-native-picker/picker"
import { PickerM } from "@/components/PickerM"

export default function LaHoraEs() {
    const [isActive, setIsActive] = useState(false)
    const [interval, setIntervals] = useState(15) // minutes
    const { colorScheme, setColorScheme } = useColorScheme()
    const [lastSpoken, setLastSpoken] = useState("")
    const [timer, setTimer] = useState("")
    const [timer2, setTimer2] = useState("")
    const doce = useRef(false)

    const formatTime = useCallback(() => {
        const now = new Date()
        let hours = now.getHours()
        if (doce.current) {
            setTimer2(hours > 12 ? "p. m." : "a. m.")
            hours = hours > 12 ? hours - 12 : hours
        }
        let minutes: string | number = now.getMinutes()
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        const relog = `${hours}:${minutes}`

        setTimer(relog)
    }, [doce])

    const speakTime = () => {
        const now = new Date()

        let hours = now.getHours()
        if (hours > 12 && doce.current) {
            hours = hours - 12
        }
        const minutes = now.getMinutes()

        // Construct Spanish time message
        let timeMessage = "La hora es "
        Speech.speak(timeMessage, {
            language: "es-ES",
            pitch: 1,
            rate: 0.8,
        })

        if (hours === 1) {
            timeMessage = "la una"
        } else {
            timeMessage = `las ${hours}`
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

    // useEffect(() => {
    //     let timer
    //     if (isActive) {
    //         speakTime() // Speak immediately when activated
    //         timer = setInterval(
    //             () => {
    //                 speakTime()
    //                 console.log("timer")
    //             },
    //             interval * 60 * 1000
    //         ) // Convert minutes to milliseconds
    //     }
    //     return () => clearInterval(timer)
    // }, [isActive, interval])

    useEffect(() => {
        const timer = setInterval(() => {
            formatTime()
        }, 1000) // Convert minutes to milliseconds
        return () => clearInterval(timer)
    }, [])

    const onIntervalesChange = useCallback((value: number) => {
        setIntervals(value)
    }, [])

    const onDoceChange = (value: boolean) => {
        doce.current = value
        formatTime()
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
                <View className="flex flex-row items-baseline justify-center">
                    <Text className="text my-3 py-5 text-7xl font-bold">
                        {timer}
                    </Text>
                    {doce.current && (
                        <Text className="text my-3 py-5 text-xl font-bold">
                            {timer2}
                        </Text>
                    )}
                </View>
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
                <View style={styles.switchContainer}>
                    <Text className="text text-base">12 horas</Text>
                    <Switch
                        value={doce.current}
                        onValueChange={onDoceChange}
                        trackColor={{ false: "#767577", true: "#4A90E2" }}
                        thumbColor={doce ? "#fff" : "#f4f3f4"}
                    />
                </View>

                <View style={styles.sliderContainer}>
                    <Text className="text">Intervalo: {interval} minutos</Text>
                    <PickerM />
                </View>

                <Pressable
                    className="text m-2 flex flex-row items-center justify-center rounded-full border-black bg-white p-6 shadow-lg shadow-slate-950 dark:bg-slate-600 dark:shadow-gray-200"
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

// import { ThemedText } from "@/components/ThemedText"
// import { ThemedView } from "@/components/ThemedView"
// import { useNotification } from "@/context/NotificationContext"
// import * as Notifications from "expo-notifications"
// import { Platform, Pressable, StatusBar } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//     }),
// })

// async function sendPushNotification(expoPushToken: string) {
//     const message = {
//         to: expoPushToken,
//         sound: "default",
//         title: "Original Title",
//         body: "And here is the body!",
//         data: { someData: "goes here" },
//     }

//     await fetch("https://exp.host/--/api/v2/push/send", {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Accept-encoding": "gzip, deflate",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//     })
// }

// export default function App() {
//     const { expoPushToken, notification, error } = useNotification()
//     if (error) {
//         return <ThemedText type="title">{error.message}</ThemedText>
//     }
//     console.log(JSON.stringify(notification, null, 2))
//     return (
//         <ThemedView
//             style={{
//                 flex: 1,
//                 padding: 10,
//                 paddingTop:
//                     Platform.OS == "android" ? StatusBar.currentHeight : 10,
//             }}
//         >
//             <SafeAreaView style={{ flex: 1 }}>
//                 <ThemedText type="subtitle">Updates Demo 5</ThemedText>
//                 {/* <ThemedText>{runTypeMessage}</ThemedText>
//                 <Button
//                     onPress={() => Updates.checkForUpdateAsync()}
//                     title="Check manually for updates"
//                 />
//                 {showDownloadButton ? (
//                     <Button
//                         onPress={() => Updates.fetchUpdateAsync()}
//                         title="Download and run update"
//                     />
//                 ) : null} */}
//                 <ThemedText type="subtitle" style={{ color: "red" }}>
//                     Your push token:
//                 </ThemedText>
//                 <ThemedText>{expoPushToken}</ThemedText>
//                 <ThemedText type="subtitle">Latest notification:</ThemedText>
//                 <ThemedText>{notification?.request.content.title}</ThemedText>
//                 <ThemedText>
//                     {JSON.stringify(
//                         notification?.request.content.data,
//                         null,
//                         2
//                     )}
//                 </ThemedText>
//                 <Pressable onPress={schedulePushNotification}>
//                     <ThemedText>Press to schedule a notification</ThemedText>
//                 </Pressable>
//             </SafeAreaView>
//         </ThemedView>
//     )
// }

// async function schedulePushNotification() {
//     const indentificer = await Notifications.scheduleNotificationAsync({
//         content: {
//             title: "Alarma activa",
//             body: "Sonando...",
//             autoDismiss: false,
//             sticky: true, // Propiedad experimental (ver nota abajo)
//             sound: "alarm_sound.wav",
//             data: { type: "alarm" },
//             categoryIdentifier: "alarm",
//             attachments: [],
//         },

//         trigger: null,
//     })

//     await Notifications.cancelScheduledNotificationAsync(indentificer)
// }

// import React from "react"
// import { Button, View, StyleSheet, Text, StatusBar } from "react-native"
// import * as TaskManager from "expo-task-manager"
// import * as Location from "expo-location"

// const LOCATION_TASK_NAME = "background-location-task"

// const requestPermissions = async () => {
//     const { status: foregroundStatus } =
//         await Location.requestForegroundPermissionsAsync()
//     if (foregroundStatus === "granted") {
//         const { status: backgroundStatus } =
//             await Location.requestBackgroundPermissionsAsync()
//         if (backgroundStatus === "granted") {
//             await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//                 accuracy: Location.Accuracy.Balanced,
//             })
//         }
//     }
// }

// export default function App() {

//     return (
//         <View style={styles.container}>
//             <PermissionsButton />
//             <Text>Open up App.tsx to start working on your app!</Text>
//             <StatusBar animated barStyle="dark-content" />
//             <Text></Text>
//         </View>
//     )
// }

// const PermissionsButton = () => (
//     <View style={styles.container}>
//         <Button
//             onPress={requestPermissions}
//             title="Enable background location"
//         />
//     </View>
// )

// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//     if (error) {
//         // Error occurred - check `error.message` for more details.
//         console.log(error.message)
//         return
//     }
//     if (data) {
//         const { locations } = data
//         // do something with the locations captured in the background
//         console.log(locations)
//     }
// })

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//     },
// })
