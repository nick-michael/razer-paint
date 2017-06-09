/* eslint-disable no-alert */

// JavaScript source code


const ChromaSDK = {
    initialised: false,
    uri: null,
    timerId: null,
    keyboard: {},
    onTimer() {
        const chromaSDK = this;
        const request = new XMLHttpRequest();

        request.open('POST', `${chromaSDK.uri}/heartbeat`, true);

        request.setRequestHeader('content-type', 'application/json');

        request.send(null);
    },
    init(port, details, timeout = 10000) {
        const chromaSDK = this;
        const request = new XMLHttpRequest();
        request.open('POST', `http://localhost:${port}/razer/chromasdk`, true);

        request.setRequestHeader('content-type', 'application/json');

        const data = JSON.stringify({
            title: 'Razer Chroma - Visualiser Sample',
            description: 'Razer Chroma SDK Sample Application',
            author: {
                name: 'Chroma Developer',
                contact: 'www.razerzone.com',
            },
            device_supported: [
                'keyboard',
                'mouse',
                'headset',
                'mousepad',
                'keypad',
                'chromalink'],
            category: 'application',
        });

        request.send(data);

        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                chromaSDK.uri = JSON.parse(request.responseText).uri;
                chromaSDK.initGrids();
                chromaSDK.initialised = true;
                chromaSDK.timerId = setInterval(chromaSDK.onTimer.bind(chromaSDK), timeout);
            }
        };
    },
    initGrids() {
        const color = new Array(6);
        const key = new Array(6);
        for (let r = 0; r < 6; r += 1) {
            color[r] = new Array(22);
            key[r] = new Array(22);
            for (let c = 0; c < 22; c += 1) {
                color[r][c] = 0x111111;
                key[r][c] = 0;
            }
        }
        this.keyboard.customKey = { color, key };
    },
    uninit() {
        const chromaSDK = this;
        const request = new XMLHttpRequest();

        request.open('DELETE', this.uri, true);

        request.setRequestHeader('content-type', 'application/json');

        request.send(null);

        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                chromaSDK.initialised = false;
            }
        };

        clearInterval(this.timerId);
    },
    createKeyboardEffect(effect, data) {
        let jsonObj;
        const chromaSDK = this;
        if (effect === 'CHROMA_NONE') {
            jsonObj = JSON.stringify({ effect });
        } else if (effect === 'CHROMA_CUSTOM') {
            jsonObj = JSON.stringify({ effect, param: data });
        } else if (effect === 'CHROMA_STATIC') {
            const color = { color: data };
            jsonObj = JSON.stringify({ effect, param: color });
        } else if (effect === 'CHROMA_CUSTOM_KEY') {
            jsonObj = JSON.stringify({ effect, param: data });
        }

        const request = new XMLHttpRequest();

        request.open('PUT', `${chromaSDK.uri}/keyboard`, true);

        request.setRequestHeader('content-type', 'application/json');

        request.send(jsonObj);

        request.onreadystatechange = () => {
            if (request.readyState === 4) {
        // do nothing
            }
        };
    },
};

export default ChromaSDK;
