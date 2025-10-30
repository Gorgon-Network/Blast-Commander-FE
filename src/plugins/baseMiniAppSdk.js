// src/plugins/baseMiniAppSdk.js
import { sdk } from '@farcaster/miniapp-sdk';

export async function initBaseMiniApp() {
  try {
    await sdk.actions.ready();
    console.log('Base MiniApp SDK is ready');
  } catch (err) {
    console.error('Failed to initialize Base MiniApp SDK:', err);
  }
}
