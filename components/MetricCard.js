import { StyleSheet, Text, View } from "react-native";

export default function MetricCard({ label, value, icon }) {
	return (
		<View style={styles.card}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{value}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#f5f5f5",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		borderLeftWidth: 4,
		borderLeftColor: "#0088cc",
	},
	label: {
		fontSize: 12,
		color: "#666",
		marginBottom: 5,
	},
	value: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
});
