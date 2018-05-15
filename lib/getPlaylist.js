export default async channelCode =>  await (await fetch(
  `https://services.vrt.be/playlist/onair?channel_code=${channelCode}`,
  {
    headers: {
      accept: `application/vnd.playlist.vrt.be.noa_1.0+json`,
    },
  }
)).json();
