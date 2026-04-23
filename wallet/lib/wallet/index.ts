import * as bip39 from "bip39";
import HDKey from "hdkey";
import { ethers } from "ethers";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

// 1. Generate mnemonic
export const genrateMnemonic = () => {
    return bip39.generateMnemonic();
}

// 2. Mnemonic → Seed
export const mnemonicToSeed = async (mnemonic: any) => {
    return await bip39.mnemonicToSeed(mnemonic)
}

// 3. Ethereum Wallet
export const getEthereumWallet = async (seed) => {
    const hd = HDKey.fromMasterSeed(seed);

    const path = "m/44'/60'/0'/0/0";

    const child = hd.derive(path);

    const privateKey = child.privateKey.toString("hex");

    const wallet = new ethers.Wallet(privateKey);

    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
    };
};


// 4. Solana Wallet
export const getSolanaWallet = async (seed) => {
    const path = "m/44'/501'/0'/0'";

    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const keypair = Keypair.fromSeed(derivedSeed);

    return {
        address: keypair.publicKey.toBase58(),
        secretKey: Buffer.from(keypair.secretKey).toString("hex"),
    };
};