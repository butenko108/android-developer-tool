import MetricCard from "@/components/MetricCard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Platform,
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	StatusBar
} from "react-native";

export default function StartScreen() {
	const router = useRouter();
	const [metrics, setMetrics] = useState({
		cpu: 45,
		ram: 2.1,
		battery: 78,
		network: 12.4,
	});
	const [logs, setLogs] = useState([]);
	const [sequence, setSequence] = useState([]);
	const SECRET = ["refresh", "cache", "cache", "refresh"];

	// Генерация фейковых логов
	useEffect(() => {
		const messages = [
			"Service com.android.systemui started",
			"Network state changed: CONNECTED",
			"Background task completed: GC_EXPLICIT",
			"App cache cleared: 124 MB freed",
			"Process optimization complete",
			"Battery saver mode: disabled",
			"System update check: no updates",
			"Memory usage: normal",
		];

		const interval = setInterval(() => {
			const time = new Date().toLocaleTimeString();
			const msg = messages[Math.floor(Math.random() * messages.length)];
			setLogs((prev) => [...prev.slice(-15), `[${time}] ${msg}`]);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	const handleRefresh = () => {
		// Обновляем метрики
		setMetrics({
			cpu: Math.floor(Math.random() * 60) + 20,
			ram: (Math.random() * 2 + 1).toFixed(1),
			battery: Math.floor(Math.random() * 30) + 60,
			network: (Math.random() * 20 + 5).toFixed(1),
		});

		// Добавляем в логи
		const time = new Date().toLocaleTimeString();
		setLogs((prev) => [...prev, `[${time}] Metrics refreshed`]);

		// Записываем в секретную последовательность
		setSequence((prev) => [...prev, "refresh"].slice(-4));
	};

	const handleClearCache = () => {
		const cleared = Math.floor(Math.random() * 300) + 100;
		Alert.alert("Success", `Cache cleared: ${cleared} MB freed`);

		const time = new Date().toLocaleTimeString();
		setLogs((prev) => [...prev, `[${time}] Cache cleanup: ${cleared}MB freed`]);

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
				<MetricCard label="CPU Usage" value={`${metrics.cpu}%`} />
				<MetricCard label="RAM" value={`${metrics.ram} GB / 6 GB`} />
				<MetricCard label="Battery" value={`${metrics.battery}%`} />
				<MetricCard label="Network" value={`↓ ${metrics.network} Mbps`} />
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
		fontSize: 11,
		color: "#666",
		fontFamily: "monospace",
		marginBottom: 3,
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
