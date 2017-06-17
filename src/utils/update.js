import https from 'https';

export const checkForUpdates = () => {
    return new Promise((resolve, reject) => {
        https.get({
            host: 'raw.githubusercontent.com',
            path: '/nick-michael/razer-paint/master/package.json',
        }, (response) => {
            let body = '';
            response.on('data', (d) => {
                body += d;
            });
            response.on('end', () => {
                const parsed = JSON.parse(body);
                resolve(parsed);
            });
        });
    });
};
