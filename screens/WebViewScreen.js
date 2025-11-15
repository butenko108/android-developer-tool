import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
	return (
		<WebView
			source={{ uri: "https://web.telegram.org" }}
			style={styles.webview}
			javaScriptEnabled={true}
			domStorageEnabled={true}
			cacheEnabled={true}
			allowsInlineMediaPlayback={true}
			mediaPlaybackRequiresUserAction={false}
		/>
	);
}

const styles = StyleSheet.create({
	webview: {
		flex: 1,
	},
});
