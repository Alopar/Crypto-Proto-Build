function checkMobileMode(){
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        let meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
}

function initializeUnityPlayer(canvas, config){
    createUnityInstance(canvas, config, (progress) => { /*...*/ })
        .then((unityInstance) => {
            window.unityGame = unityInstance;
    });
}

function subscribeOnServerResponses(){
    window.addEventListener("message", (event) => {
        console.log("app_id: " + app_id + " - полученные данные:", event);

        let receivedData = event.data;
        switch (receivedData.message) {
            case "OnInitResponse":
                console.log(receivedData.message + " - дата:", receivedData.data);

                let jsonData = JSON.stringify(receivedData.data);
                window.unityGame.SendMessage("ConnectorUnityToWebGL", "OnInitResponse", jsonData);
            break;
            case "OnSetGameDataResponse":
                console.log(receivedData.message + " - дата:", receivedData.data);
            break;
            default:
                console.log("Message incorrect :" + receivedData.message, receivedData.data);
        }
    });
}

const app_id = "undefined";
const canvas = document.querySelector("#unity-canvas");
const config = {
    arguments: [],
    dataUrl: "Build/build_uncompress.data",
    frameworkUrl: "Build/build_uncompress.framework.js",
    codeUrl: "Build/build_uncompress.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "CryptoMans",
    productName: "Crypto Prototype",
    productVersion: "0.0.1",
};

checkMobileMode();
initializeUnityPlayer(canvas, config);
subscribeOnServerResponses();
