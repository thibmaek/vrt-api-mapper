import fetch from 'node-fetch';

import { STUBRU } from './channels';

const mapResponse = ({ properties, channelCode, onairType, startDate, endDate }) => {
  const artist = properties.filter(prop => prop.key === `ARTISTNAME`)[0].value;
  const title = properties.filter(prop => prop.key === `TITLE`)[0].value;

  return {
    artist,
    channel: {
      code: channelCode,
    },
    start: startDate,
    stop: endDate,
    title,
    trackName: `${artist} - ${title}`,
    type: onairType,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = async (_, ctx, done) => {
  const { onairs } = await (await fetch(`https://services.vrt.be/playlist/onair?channel_code=${STUBRU}`, {
    headers: {
      accept: `application/vnd.playlist.vrt.be.noa_1.0+json`,
    },
  })).json();

  const body = onairs.map(mapResponse);

  const response = {
    body: JSON.stringify({
      current: body.find(airing => airing.type === `NOW`),
      previous: body.find(airing => airing.type === `PREVIOUS`),
      timestamp: new Date().toISOString(),
    }),
    statusCode: 200,
  };

  done(null, response);
};
