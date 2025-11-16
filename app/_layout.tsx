import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function RootLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Monitor",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="dashboard" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="settings" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="performance"
				options={{
					title: "Performance",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="speed" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="network"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="webview"
				options={{
					href: null,
					tabBarStyle: { display: "none" },
				}}
			/>
		</Tabs>
	);
}
