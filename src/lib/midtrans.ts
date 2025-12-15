import midtransClient from 'midtrans-client';

export const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-TEST',
});

export const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-TEST',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-TEST'
});
