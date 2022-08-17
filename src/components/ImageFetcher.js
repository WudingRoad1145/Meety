const ImageFetcher = async (address) => {
    const reservoirResponse = await fetch('https://api.reservoir.tools/users/' + address + '/tokens/v3?sortBy=acquiredAt&sortDirection=desc&offset=0&limit=20&includeTopBid=false', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'x-api-key': 'demo-api-key'
        }
    });
    const reservoirJson = await reservoirResponse.json(); 
    reservoirJson.tokens.map(async tokenJson => {
        const openSeaResponse = await fetch('https://api.opensea.io/api/v1/asset/' + tokenJson.token.contract + '/' + tokenJson.token.tokenId + '/?include_orders=false', {
            method: 'GET'
        })
        const openSeaJson = await openSeaResponse.json();
        console.log(openSeaJson.image_url)
    })
}
export default ImageFetcher
