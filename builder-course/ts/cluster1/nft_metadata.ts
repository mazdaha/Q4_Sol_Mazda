import wallet from "../../turbin-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://arweave.net/6strkvBXyCJh8eCoXdk2cF7pKq4SgctVdqL43N2X2gmp";
        const metadata = {
            name: "MazRug",
            symbol: "MZDR",
            description: "Persian!",
            image,
            attributes: [
                {trait_type: 'rarity', value: '1'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
        //  https://arweave.net/GyXYk4rX52cvEZF3HtLRwF9krB2qCPix7sTaDWNkieJR
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
