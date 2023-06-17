import axios from 'axios';
import * as rax from './retry-axios';

const client = axios.create({
  timeout: 6000,
  headers: {
    Accept: '*/*',
    Origin: 'https://app.gmx.io',
    AcceptEncoding: 'gzip',
    Referer: 'https://app.gmx.io/',
    Authority: 'gmx-server-mainnet.uw.r.appspot.com',
  },
});

client.defaults.raxConfig = {
  instance: client,
  retryDelay: 100,
  backoffType: 'static',
  onRetryAttempt: (err) => {
    const cfg = rax.getConfig(err);
    console.error(`Retry attempt #${cfg?.currentRetryAttempt}`);
  },
};

const interceptorId = rax.attach(client);

export default client;
