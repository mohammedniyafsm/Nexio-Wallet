"use client";

import { useState } from "react";
import { createHDWallet } from "../lib/wallet";

export default function Home() {
  const [wallet, setWallet] = useState(null);

  const handleCreate = async () => {
    const data = await createHDWallet();
    setWallet(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>HD Wallet</h1>

      <button onClick={handleCreate}>
        Generate Wallet
      </button>

      {wallet && (
        <>
          <h3>Mnemonic</h3>
          <p>{wallet.mnemonic}</p>

          <h3>Ethereum</h3>
          <p>Address: {wallet.ethereum.address}</p>
          <p>Private Key: {wallet.ethereum.privateKey}</p>

          <h3>Solana</h3>
          <p>Address: {wallet.solana.address}</p>
          <p>Secret Key: {wallet.solana.secretKey}</p>
        </>
      )}
    </div>
  );
}