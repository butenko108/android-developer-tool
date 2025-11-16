import { useEffect, useState } from "react";
import {
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function NetworkScreen() {
	const [connections, setConnections] = useState([]);
	const [stats, setStats] = useState({
		download: 12.4,
		upload: 3.2,
		ping: 45,
	});

	const generateConnections = () => {
		const apps = [
			"com.android.chrome",
			"com.whatsapp",
			"com.google.android.gms",
			"com.android.vending",
			"com.spotify.music",
			"com.instagram.android",
		];

		const ips = [
			"142.250.185.78",
			"31.13.82.51",
			"216.58.214.174",
			"172.217.14.206",
			"151.101.65.195",
		];

		const protocols = ["HTTPS", "HTTP", "XMPP", "WebSocket"];

		const newConnections = [];
		const numConnections = Math.floor(Math.random() * 3) + 4;

		for (let i = 0; i < numConnections; i++) {
			newConnections.push({
				id: i,
				app: apps[Math.floor(Math.random() * apps.length)],
				ip: ips[Math.floor(Math.random() * ips.length)],
				port: Math.random() > 0.5 ? 443 : 80,
				protocol: protocols[Math.floor(Math.random() * protocols.length)],
			});
		}

		setConnections(newConnections);
	};

	const handleRefresh = () => {
		generateConnections();
		setStats({
			download: (Math.random() * 20 + 5).toFixed(1),
			upload: (Math.random() * 5 + 1).toFixed(1),
			ping: Math.floor(Math.random() * 50) + 20,
		});
	};

	useEffect(() => {
		generateConnections();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Network Monitor</Text>

			{/* Network Stats */}
			<View style={styles.statsContainer}>
				<View style={styles.statCard}>
					<Text style={styles.statLabel}>Download</Text>
					<Text style={styles.statValue}>↓ {stats.download} Mbps</Text>
				</View>

				<View style={styles.statCard}>
					<Text style={styles.statLabel}>Upload</Text>
					<Text style={styles.statValue}>↑ {stats.upload} Mbps</Text>
				</View>

				<View style={styles.statCard}>
					<Text style={styles.statLabel}>Ping</Text>
					<Text style={styles.statValue}>{stats.ping} ms</Text>
				</View>
			</View>

			{/* Active Connections */}
			<View style={styles.connectionsHeader}>
				<Text style={styles.connectionsTitle}>Active Connections</Text>
				<TouchableOpacity onPress={handleRefresh}>
					<Text style={styles.refreshButton}>Refresh</Text>
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.connectionsList}>
				{connections.map((conn) => (
					<View key={conn.id} style={styles.connectionCard}>
						<Text style={styles.appName}>{conn.app}</Text>
						<Text style={styles.connectionDetails}>
							{conn.ip}:{conn.port} ({conn.protocol})
						</Text>
					</View>
				))}
			</ScrollView>
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
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	statCard: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		padding: 15,
		borderRadius: 10,
		marginHorizontal: 5,
		alignItems: "center",
	},
	statLabel: {
		fontSize: 12,
		color: "#666",
		marginBottom: 5,
	},
	statValue: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#0088cc",
	},
	connectionsHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	connectionsTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	refreshButton: {
		color: "#0088cc",
		fontSize: 16,
		fontWeight: "600",
	},
	connectionsList: {
		flex: 1,
	},
	connectionCard: {
		backgroundColor: "#f9f9f9",
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
		borderLeftWidth: 3,
		borderLeftColor: "#0088cc",
	},
	appName: {
		fontSize: 14,
		fontWeight: "600",
		color: "#333",
		marginBottom: 5,
	},
	connectionDetails: {
		fontSize: 12,
		color: "#666",
		fontFamily: "monospace",
	},
});
