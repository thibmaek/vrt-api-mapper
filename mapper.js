import fetch from 'node-fetch';

const mapResponse = airing => {
  return {
    artist: airing.properties.filter(prop => prop.key === `ARTISTNAME`)[0].value,
    channel: {
      code: airing.channelCode,
    },
    title: airing.properties.filter(prop => prop.key === `TITLE`)[0].value,
    type: airing.onairType,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = async (event, context, callback) => {
  const res = await fetch(`https://services.vrt.be/playlist/onair?channel_code=41`, {
    headers: {
      accept: `application/vnd.playlist.vrt.be.noa_1.0+json`,
    },
  }).then(r => r.json());

  const body = res.onairs.map(mapResponse);

  const response = {
    body: JSON.stringify({
      current: body.find(airing => airing.type === `NOW`),
      previous: body.find(airing => airing.type === `PREVIOUS`),
    }),
    statusCode: 200,
  };

  callback(null, response);
};
