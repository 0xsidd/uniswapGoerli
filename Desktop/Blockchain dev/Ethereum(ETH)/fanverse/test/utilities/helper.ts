/* eslint-disable lines-between-class-members */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prettier/prettier */

const SIGNING_DOMAIN_NAME = "Fanverse"
const SIGNING_DOMAIN_VERSION = "1"  

class OrderHash{
  public contract : any; 
  public signer : any; 
  public _domain : any;
  public hashcount :number=0;

  constructor(data:any) { 
    const {_contract, _signer} =data; 
    this.contract = _contract 
    this.signer = _signer
  }

  async createPrimaryVoucher(nftOwner: any, tokenId: any, unitprice: any, countervalue: any, amount: any, listed: any){
      const voucher = {nftOwner, tokenId, unitprice, countervalue, amount, listed}
      const domain = await this._signingDomain()
      const types = {
        priListing: [
          {name: "nftOwner", type: "uint160"},
          {name: "tokenId", type: "uint256"},
          {name: "unitprice", type: "uint256"},
          {name: "countervalue", type: "uint256"},
          {name: "amount", type: "uint256"},
          {name: "listed", type: "bool"},

        ]
      }
      const signature = await this.signer._signTypedData(domain, types, voucher)
      return {
        ...voucher,
        signature,
      }
  }
  async createMintVoucher(nftAddress: any, nftOwner: any, tokenId: any, amount: any, tokenUri: any, royaltyKeeper: any, royaltyFees: any ){
    const voucher = {nftAddress, nftOwner, tokenId, amount, tokenUri, royaltyKeeper, royaltyFees}
    const domain = await this._signingDomain()
    const types = {
      mintVoucher: [
        {name: "nftAddress", type: "uint160"},
        {name: "nftOwner", type: "uint160"},
        {name: "tokenId", type: "uint256"},
        {name: "amount", type: "uint256"},
        {name: "tokenUri", type: "string"},
        {name: "royaltyKeeper", type: "uint160"},
        {name: "royaltyFees", type: "uint96"},
      ]
    }
    const signature = await this.signer._signTypedData(domain, types, voucher)
    return {
      ...voucher,
      signature,
    }
}
  async createVoucherAucBuyer(nftAddress: any, buyer: any, tokenId: any, nftBatchAmount: any, tokenURI: any, pricePaid: any){
    const voucher = {nftAddress, buyer, tokenId, nftBatchAmount, tokenURI, pricePaid}
    const domain = await this._signingDomain()
    const types = {
      auctionItemBuyer: [
        {name: "nftAddress", type: "address"},
        {name: "buyer", type: "address"},
        {name: "tokenId", type: "uint256"},
        {name: "nftBatchAmount", type: "uint256"},
        {name: "tokenURI", type: "string"},
        {name: "pricePaid", type: "uint256"},
      ]
    }
    const signature = await this.signer._signTypedData(domain, types, voucher)
    return {
      ...voucher,
      signature,
    }
}

  async _signingDomain() {
    if (this._domain != null) {
      return this._domain
    }
    const chainId = await this.contract.getChainID()
    this._domain  = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contract.address,
      chainId,
    }
    return this._domain
  }
}

export default OrderHash;