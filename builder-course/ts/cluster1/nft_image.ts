import wallet from "../../turbin-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFileSync } from "fs"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const image = readFileSync("cluster1/generug.png");

        //2. Convert image to generic file.
        const file = createGenericFile(image, "rug.png");

        //3. Upload image
        const [myUri] = await umi.uploader.upload([file]);
        console.log("Your image URI: ", myUri);
        // https://arweave.net/7NLJzKRbQnXz1acEB8rJe1YZXphRT5AMHRLLBDLfyRWp
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
