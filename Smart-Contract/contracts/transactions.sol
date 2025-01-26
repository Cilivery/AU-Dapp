const handleSendToken = async () => {
  if (!window.ethereum) {
    alert('MetaMask is not installed. Please install it to proceed.');
    return;
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Assume the first account as the sender
    const senderAddress = accounts[0];

    // Example receiver address (you can replace it with your own wallet address)
    const receiverAddress = '0xYourReceiverWalletAddressHere';

    // Create a dummy transaction object
    const transactionParameters = {
      to: receiverAddress, // Receiver's wallet address
      from: senderAddress, // Sender's wallet address (auto-detected by MetaMask)
      value: '0x2386F26FC10000', // Amount to send in wei (0.01 ETH in this case)
      gas: '0x5208', // Gas limit (in hexadecimal, 21000 is standard for simple transfers)
    };

    // Request MetaMask to initiate the transaction
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    alert('Transaction submitted successfully!');
  } catch (error) {
    console.error('Failed to initiate transaction:', error);
    alert('Transaction failed. Please check the console for details.');
  }
};
