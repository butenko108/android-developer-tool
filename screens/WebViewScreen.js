import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
	return (
		<View style={styles.container}>
			<WebView
				source={{ uri: "https://web.telegram.org" }}
				style={styles.webview}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				cacheEnabled={true}
				allowsInlineMediaPlayback={true}
				mediaPlaybackRequiresUserAction={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
	},
	webview: {
		flex: 1,
	},
});
