/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prettier/prettier */

const SIGNING_DOMAIN_NAME = "Secondary" 
const SIGNING_DOMAIN_VERSION = "2"

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

  async createSecondaryVoucher(nftAddress: any, owner: any, tokenId: any, unitprice: any, nftBatchAmount: any, tokenURI: any, listed: any) {
    const voucher = {nftAddress, owner, tokenId, unitprice, nftBatchAmount, tokenURI, listed}
    const domain = await this._signingDomain()
    const types = {
      MarketItem: [
        {name: "nftAddress", type: "address"},
        {name: "owner", type: "address"},
        {name: "tokenId", type: "uint256"},
        {name: "unitprice", type:"uint256"},
        {name: "nftBatchAmount", type: "uint256"}, 
        {name: "tokenURI", type: "string"},
        {name: "listed", type: "bool"}
      ]
    }
    const signature = await this.signer._signTypedData(domain, types, voucher)
    return {
      ...voucher,
      signature,
    }
  }

  async createVoucherAucSeller(nftAddress: any, owner: any, tokenId: any, nftBatchAmount: any, tokenURI: any, minimumBid: any, startTime: any,
      endTime: any, started: any, ended: any) {
        const voucher = {nftAddress, owner, tokenId, nftBatchAmount, tokenURI, minimumBid, startTime, endTime, started, ended}
        const domain = await this._signingDomain()
        const types = {
          auctionItemSeller: [
            {name: "nftAddress", type: "address"},
            {name: "owner", type: "address"},
            {name: "tokenId", type: "uint256"},
            {name: "nftBatchAmount", type: "uint256"},
            {name: "tokenURI", type: "string"},
            {name: "minimumBid", type: "uint256"},
            {name: "startTime", type: "uint256"},
            {name: "endTime", type: "uint256"},
            {name: "started", type: "bool"},
            {name: "ended", type: "bool"}
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
//   async createVoucherMarketItem(nftAddress: any, owner: any, tokenId:any,unitPrice:any,nftBatchAmount: any, tokenURI: any,listed:any){
//     const voucher = {nftAddress, owner, tokenId,unitPrice, nftBatchAmount, tokenURI,listed}
//     const domain = await this._signingDomain()
//     const types = {
//       auctionItemBuyer: [
//         {name: "nftAddress", type: "address"},
//         {name: "owner", type: "address"},
//         {name: "tokenId", type: "uint256"},
//         {name: "unitPrice",type: "uint256"},
//         {name: "nftBatchAmount", type: "uint256"},
//         {name: "tokenURI", type: "string"},
//         {name: "listed", type: "bool"},
//       ]
//     }
//     const signature = await this.signer._signTypedData(domain, types, voucher)
//     return {
//       ...voucher,
//       signature,
//     }
// }
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