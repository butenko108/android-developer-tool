import { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function SettingsScreen() {
	const [settings, setSettings] = useState({
		usbDebugging: true,
		cpuOverlay: false,
		keepAwake: true,
		performanceMode: false,
		systemAlerts: true,
		batteryWarnings: false,
		networkStatus: true,
		autoClearLogs: false,
	});

	const [logLevel, setLogLevel] = useState("Debug");

	const toggleSetting = (key) => {
		setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const handleSave = () => {
		Alert.alert("Success", "Settings saved successfully");
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Settings</Text>

			{/* Developer Options */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Developer Options</Text>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Enable USB Debugging</Text>
					<Switch
						value={settings.usbDebugging}
						onValueChange={() => toggleSetting("usbDebugging")}
						trackColor={{ false: "#ccc", true: "#0088cc" }}
					/>
				</View>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Show CPU Usage Overlay</Text>
					<Switch
						value={settings.cpuOverlay}
						onValueChange={() => toggleSetting("cpuOverlay")}
						trackColor={{ false: "#ccc", true: "#0088cc" }}
					/>
				</View>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Keep Screen Awake</Text>
					<Switch
						value={settings.keepAwake}
						onValueChange={() => toggleSetting("keepAwake")}
						trackColor={{ false: "#ccc", true: "#0088cc" }}
					/>
				</View>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Enable Performance Mode</Text>
					<Switch
						value={settings.performanceMode}
						onValueChange={() => toggleSetting("performanceMode")}
						trackColor={{ false: "#ccc", true: "#0088cc" }}
					/>
				</View>
			</View>

			{/* Notification Settings */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Notification Settings</Text>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>System Alerts</Text>
					<Switch
						value={settings.systemAlerts}
						onValueChange={() => toggleSetting("systemAlerts")}
						trackColor={{ false: "#ccc", true: "#0088cc" }}
					/>
				</View>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Battery Warnings</Text>
					<Switch
						value={settings.batteryWarnings}
						onValueChange={() => toggleSetting("batteryWarnings")}
						trackColor={{ false: "#ccc", true: "#0088cc" }}
					/>
				</View>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Network Status</Text>
					<Switch
						value={settings.networkStatus}
						onValueChange={() => toggleSetting("networkStatus")}
						trackColor={{ false: "#ccc", true: "#0088cc" }}
					/>
				</View>
			</View>

			{/* Log Settings */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Log Settings</Text>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Log Level</Text>
					<Text style={styles.settingValue}>{logLevel}</Text>
				</View>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Auto-clear old logs</Text>
					<Switch
						value={settings.autoClearLogs}
						onValueChange={() => toggleSetting("autoClearLogs")}
						trackColor={{ false: "#ccc", true: "#0088cc" }}
					/>
				</View>

				<View style={styles.settingRow}>
					<Text style={styles.settingLabel}>Max log size</Text>
					<Text style={styles.settingValue}>100 MB</Text>
				</View>
			</View>

			{/* Save Button */}
			<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
				<Text style={styles.saveButtonText}>Save Settings</Text>
			</TouchableOpacity>

			<View style={{ height: 40 }} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
		paddingTop: 50,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	section: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
		color: "#0088cc",
	},
	settingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	settingLabel: {
		fontSize: 16,
		color: "#333",
	},
	settingValue: {
		fontSize: 16,
		color: "#666",
	},
	saveButton: {
		backgroundColor: "#0088cc",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 20,
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
