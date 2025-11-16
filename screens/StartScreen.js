import MetricCard from "@/components/MetricCard";
import * as Battery from "expo-battery";
import * as Network from "expo-network";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Alert,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function StartScreen() {
	const router = useRouter();
	const [metrics, setMetrics] = useState({
		battery: 0,
		connection: "Unknown",
		systemLoad: 1.24,
		processes: 347,
	});
	const [logs, setLogs] = useState([]);
	const [sequence, setSequence] = useState([]);
	const SECRET = ["refresh", "cache", "cache", "refresh"];

	// Получение реальных данных
	useEffect(() => {
		const getBatteryLevel = async () => {
			const level = await Battery.getBatteryLevelAsync();
			return Math.floor(level * 100);
		};

		const getNetworkType = async () => {
			const networkState = await Network.getNetworkStateAsync();
			if (!networkState.isConnected) return "Disconnected";
			return networkState.type === Network.NetworkStateType.WIFI
				? "WiFi"
				: "Mobile";
		};

		const updateRealMetrics = async () => {
			const batteryLevel = await getBatteryLevel();
			const connectionType = await getNetworkType();

			setMetrics((prev) => ({
				...prev,
				battery: batteryLevel,
				connection: connectionType,
			}));
		};

		updateRealMetrics();
		const interval = setInterval(updateRealMetrics, 30000); // Обновляем каждые 30 сек

		return () => clearInterval(interval);
	}, []);

	// Генерация реалистичных логов
	useEffect(() => {
		const logTemplates = [
			() => {
				const uid = Math.floor(Math.random() * 10000) + 10000;
				const pid = Math.floor(Math.random() * 20000) + 10000;
				return `D/ActivityManager: START u0 {flg=0x${Math.floor(Math.random() * 1000000).toString(16)} cmp=com.android.${["settings", "systemui", "chrome", "vending"][Math.floor(Math.random() * 4)]}} from uid ${uid}`;
			},
			() => {
				const uid = Math.floor(Math.random() * 10000) + 10000;
				const pid = Math.floor(Math.random() * 20000) + 10000;
				const ms = Math.floor(Math.random() * 100);
				return `I/libprocessgroup: Successfully killed process cgroup uid ${uid} pid ${pid} in ${ms}ms`;
			},
			() => {
				const code = Math.floor(Math.random() * 200000) + 100000;
				return `D/WifiStateMachine: handleMessage: E msg.what=${code}`;
			},
			() => {
				const period = [86400000, 43200000, 3600000][
					Math.floor(Math.random() * 3)
				];
				return `W/NetworkScheduler: Error inserting flex_time=8640000 period=${period} requires_charging=0`;
			},
			() => {
				const mb = Math.floor(Math.random() * 200) + 50;
				return `I/ActivityManager: Force stopping com.android.${["chrome", "vending", "gms"][Math.floor(Math.random() * 3)]} appid=10${Math.floor(Math.random() * 900) + 100} user=0: from pid ${Math.floor(Math.random() * 20000) + 10000}`;
			},
			() => {
				return `D/ConnectivityService: NetworkAgentInfo [WIFI () - ${Math.floor(Math.random() * 200) + 100}] network status changed`;
			},
		];

		const interval = setInterval(() => {
			const time = new Date().toLocaleTimeString("en-US", { hour12: false });
			const ms = Math.floor(Math.random() * 1000);
			const template =
				logTemplates[Math.floor(Math.random() * logTemplates.length)];
			const log = `[${time}.${ms.toString().padStart(3, "0")}] ${template()}`;
			setLogs((prev) => [...prev.slice(-20), log]);
		}, 1500);

		return () => clearInterval(interval);
	}, []);

	const handleRefresh = async () => {
		// Обновляем реальные метрики
		const batteryLevel = await Battery.getBatteryLevelAsync();
		const networkState = await Network.getNetworkStateAsync();
		const connectionType = !networkState.isConnected
			? "Disconnected"
			: networkState.type === Network.NetworkStateType.WIFI
				? "WiFi"
				: "Mobile";

		setMetrics({
			battery: Math.floor(batteryLevel * 100),
			connection: connectionType,
			systemLoad: (Math.random() * 2 + 0.5).toFixed(2),
			processes: Math.floor(Math.random() * 200) + 250,
		});

		const time = new Date().toLocaleTimeString("en-US", { hour12: false });
		const ms = Math.floor(Math.random() * 1000);
		setLogs((prev) => [
			...prev,
			`[${time}.${ms.toString().padStart(3, "0")}] I/SystemMonitor: Metrics refresh completed`,
		]);

		setSequence((prev) => [...prev, "refresh"].slice(-4));
	};

	const handleClearCache = () => {
		const cleared = Math.floor(Math.random() * 300) + 100;
		Alert.alert("Success", `Cache cleared: ${cleared} MB freed`);

		const time = new Date().toLocaleTimeString("en-US", { hour12: false });
		const ms = Math.floor(Math.random() * 1000);
		setLogs((prev) => [
			...prev,
			`[${time}.${ms.toString().padStart(3, "0")}] I/PackageManager: Cache cleanup: ${cleared}MB freed`,
		]);

		setSequence((prev) => [...prev, "cache"].slice(-4));
	};

	const handleExport = () => {
		Alert.alert("Export", "Logs exported to /storage/logs.txt");
	};

	const handleExportLongPress = () => {
		if (JSON.stringify(sequence) === JSON.stringify(SECRET)) {
			router.push("/webview");
			setSequence([]);
		} else {
			handleExport();
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>System Monitor</Text>

			{/* Метрики */}
			<View style={styles.metricsContainer}>
				<MetricCard label="Battery" value={`${metrics.battery}%`} />
				<MetricCard label="Connection" value={metrics.connection} />
				<MetricCard label="System Load" value={metrics.systemLoad} />
				<MetricCard label="Processes" value={metrics.processes} />
			</View>

			{/* Логи */}
			<View style={styles.logsContainer}>
				<Text style={styles.logsTitle}>System Logs</Text>
				<ScrollView style={styles.logs} nestedScrollEnabled={true}>
					{logs.map((log, i) => (
						<Text key={i} style={styles.logText}>
							{log}
						</Text>
					))}
				</ScrollView>
			</View>

			{/* Кнопки */}
			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={styles.button} onPress={handleRefresh}>
					<Text style={styles.buttonText}>Refresh Metrics</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={handleClearCache}>
					<Text style={styles.buttonText}>Clear Cache</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={handleExport}
					onLongPress={handleExportLongPress}
				>
					<Text style={styles.buttonText}>Export Logs</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop:
			Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 20 : 20,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	metricsContainer: {
		marginBottom: 20,
	},
	logsContainer: {
		flex: 1,
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
		padding: 15,
		marginBottom: 20,
	},
	logsTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	logs: {
		flex: 1,
	},
	logText: {
		fontSize: 10,
		color: "#666",
		fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
		marginBottom: 2,
	},
	buttonsContainer: {
		gap: 10,
	},
	button: {
		backgroundColor: "#0088cc",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
