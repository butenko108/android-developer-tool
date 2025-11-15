import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StartScreen() {
	const router = useRouter();
	const [clicks, setClicks] = useState(0);
	const [lastClickTime, setLastClickTime] = useState(0);

	const handlePress = () => {
		const now = Date.now();

		if (now - lastClickTime > 2000) {
			setClicks(1);
		} else {
			const newClicks = clicks + 1;
			setClicks(newClicks);

			if (newClicks >= 2) {
				router.push("/webview");
				setClicks(0);
			}
		}

		setLastClickTime(now);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={handlePress}
				activeOpacity={0.7}
			>
				<Text style={styles.buttonText}>Developer Tools</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	button: {
		backgroundColor: "#0088cc",
		paddingHorizontal: 40,
		paddingVertical: 20,
		borderRadius: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});
