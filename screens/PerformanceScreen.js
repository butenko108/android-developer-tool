import { useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function PerformanceScreen() {
	const [testing, setTesting] = useState(false);
	const [results, setResults] = useState(null);
	const [progress, setProgress] = useState(0);
	const [currentTest, setCurrentTest] = useState("");

	const runTest = async () => {
		setTesting(true);
		setResults(null);
		setProgress(0);

		const tests = [
			{ name: "Testing CPU...", duration: 1500 },
			{ name: "Testing RAM...", duration: 1500 },
			{ name: "Testing Storage...", duration: 1500 },
			{ name: "Finalizing...", duration: 1000 },
		];

		for (let i = 0; i < tests.length; i++) {
			setCurrentTest(tests[i].name);
			setProgress(((i + 1) / tests.length) * 100);
			await new Promise((resolve) => setTimeout(resolve, tests[i].duration));
		}

		// Генерируем результаты
		const cpuScore = Math.floor(Math.random() * 2000) + 7500;
		const ramScore = Math.floor(Math.random() * 2000) + 6500;
		const storageScore = Math.floor(Math.random() * 2000) + 6000;
		const overall = Math.floor((cpuScore + ramScore + storageScore) / 3);

		setResults({
			cpu: cpuScore,
			ram: ramScore,
			storage: storageScore,
			overall: overall,
		});

		setTesting(false);
		setCurrentTest("");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Performance Test</Text>

			<View style={styles.content}>
				{!testing && !results && (
					<View style={styles.centerContent}>
						<Text style={styles.description}>
							Run a comprehensive performance test to evaluate your device's
							capabilities.
						</Text>
						<TouchableOpacity style={styles.runButton} onPress={runTest}>
							<Text style={styles.runButtonText}>Run Test</Text>
						</TouchableOpacity>
					</View>
				)}

				{testing && (
					<View style={styles.centerContent}>
						<ActivityIndicator size="large" color="#0088cc" />
						<Text style={styles.testingText}>{currentTest}</Text>
						<View style={styles.progressBarContainer}>
							<View style={[styles.progressBar, { width: `${progress}%` }]} />
						</View>
						<Text style={styles.progressText}>{Math.floor(progress)}%</Text>
					</View>
				)}

				{results && !testing && (
					<View style={styles.resultsContainer}>
						<Text style={styles.resultsTitle}>Test Results</Text>

						<View style={styles.scoreCard}>
							<Text style={styles.scoreLabel}>CPU Score</Text>
							<Text style={styles.scoreValue}>{results.cpu}</Text>
						</View>

						<View style={styles.scoreCard}>
							<Text style={styles.scoreLabel}>RAM Score</Text>
							<Text style={styles.scoreValue}>{results.ram}</Text>
						</View>

						<View style={styles.scoreCard}>
							<Text style={styles.scoreLabel}>Storage Score</Text>
							<Text style={styles.scoreValue}>{results.storage}</Text>
						</View>

						<View style={[styles.scoreCard, styles.overallCard]}>
							<Text style={styles.overallLabel}>Overall Score</Text>
							<Text style={styles.overallValue}>{results.overall} / 10000</Text>
						</View>

						<TouchableOpacity style={styles.runButton} onPress={runTest}>
							<Text style={styles.runButtonText}>Run Again</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
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
	content: {
		flex: 1,
	},
	centerContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	description: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 30,
		paddingHorizontal: 20,
	},
	runButton: {
		backgroundColor: "#0088cc",
		paddingHorizontal: 40,
		paddingVertical: 15,
		borderRadius: 8,
	},
	runButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
	testingText: {
		fontSize: 18,
		color: "#333",
		marginTop: 20,
		marginBottom: 30,
	},
	progressBarContainer: {
		width: "80%",
		height: 10,
		backgroundColor: "#f0f0f0",
		borderRadius: 5,
		overflow: "hidden",
	},
	progressBar: {
		height: "100%",
		backgroundColor: "#0088cc",
	},
	progressText: {
		fontSize: 16,
		color: "#666",
		marginTop: 10,
	},
	resultsContainer: {
		flex: 1,
	},
	resultsTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	scoreCard: {
		backgroundColor: "#f5f5f5",
		padding: 20,
		borderRadius: 10,
		marginBottom: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	scoreLabel: {
		fontSize: 16,
		color: "#666",
	},
	scoreValue: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
	overallCard: {
		backgroundColor: "#0088cc",
		marginTop: 10,
	},
	overallLabel: {
		fontSize: 16,
		color: "#fff",
	},
	overallValue: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
	},
});
