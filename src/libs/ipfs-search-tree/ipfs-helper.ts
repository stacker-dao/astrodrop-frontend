import IPFS from '../ipfs-mini';
import Pinata from '@pinata/sdk';

export class IPFSHelper {
  PINATA_KEY_PUBLIC = '51c6e3db9ff491db6a55';
  PINATA_KEY_PRIVATE =
    '95c8c457acfa2157e3d636c7559ac9d4dbb7f5df98e9e47b157ba26918020904';

  pinata: any;
  ipfs: any;

  constructor(ipfsEndpoint: string) {
    this.pinata = Pinata(this.PINATA_KEY_PUBLIC, this.PINATA_KEY_PRIVATE);
    this.ipfs = new IPFS({
      host: ipfsEndpoint,
      protocol: 'https',
      base: '/ipfs/',
    });
  }

  async getObjectFromIPFS(ipfsHash: string | null): Promise<any> {
    if (ipfsHash === null) {
      return null;
    }
    return new Promise((resolve, reject) => {
      this.ipfs.catJSON(ipfsHash, (err, result) => {
        if (err != null) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async uploadObjectToIPFS(value: any): Promise<string> {
    const options = {
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const response = await this.pinata.pinJSONToIPFS(value, options);
    return response.IpfsHash;
  }
}
