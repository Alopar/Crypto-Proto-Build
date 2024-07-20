if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
}

const app_id = "n/a";
const canvas = document.querySelector("#unity-canvas");
const config = {
    arguments: [],
    dataUrl: "Build/build_uncompress.data",
    frameworkUrl: "Build/build_uncompress.framework.js",
    codeUrl: "Build/build_uncompress.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Crypto",
    productName: "Crypto-Proto",
    productVersion: "0.0.1",
};

createUnityInstance(canvas, config, (progress) => { /*...*/ })
    .then((unityInstance) => {
    window.unityGame = unityInstance;
});

window.addEventListener("message", (event) => {
    console.log(app_id + " полученные данные:", event);

    let receivedData = event.data;
    switch (receivedData.message) {
        case "OnInitResponse":
            let jsonData = JSON.stringify(receivedData.data);
            window.unityGame.SendMessage("ConnectorUnityToWebGL", "OnInitResponse", jsonData);
            console.log(app_id + " " + receivedData.message, receivedData.data);
        break;
        case "OnSetGameDataResponse":
            console.log(app_id + " " + receivedData.message, receivedData.data);
        break;
        default:
            console.log("Message incorrect :" + receivedData.message, receivedData.data);
    }
});
