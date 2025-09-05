import sarosSdk from '@saros-finance/sdk';
console.log('sarosSdk:', sarosSdk);
console.log('sarosSdk keys:', Object.keys(sarosSdk));
console.log('getSwapAmountSaros:', typeof sarosSdk.getSwapAmountSaros);
console.log('swapSaros:', typeof sarosSdk.swapSaros);
console.log('genConnectionSolana:', typeof sarosSdk.genConnectionSolana);