import { Tabs } from "expo-router";

export default function RootLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Monitor",
					tabBarIcon: () => null,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: () => null,
				}}
			/>
			<Tabs.Screen
				name="performance"
				options={{
					title: "Performance",
					tabBarIcon: () => null,
				}}
			/>
			<Tabs.Screen
				name="network"
				options={{
					title: "Network",
					tabBarIcon: () => null,
				}}
			/>
			<Tabs.Screen
				name="webview"
				options={{
					href: null, // Скрываем из таба
				}}
			/>
		</Tabs>
	);
}
