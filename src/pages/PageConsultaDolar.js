import WebView from "react-native-webview";

function PageConsultaDolar() {
    const url = "https://wise.com/br/currency-converter/dolar-hoje"

    return (
        <WebView
            source={{ uri: url }}
        />
    )

}

export default PageConsultaDolar;