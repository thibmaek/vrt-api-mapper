import getChannelFromName from './lib/getChannelFromName';
import { getCurrentProgram } from './lib/getProgram';
import getPlaylist from './lib/getPlaylist';

import channels from './channels';

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

export const handler = async (event, ctx, done) => {
  try {
    const { code: channelCode } = getChannelFromName(event.pathParameters.channelCode);
    const [program, playlist] = await Promise.all([
      getCurrentProgram(channelCode),
      getPlaylist(channelCode),
    ]);

    const parsedResponse = playlist.onairs.map(mapResponse);

    done(null, {
      body: JSON.stringify({
        current: parsedResponse.find(airing => airing.type === `NOW`),
        previous: parsedResponse.find(airing => airing.type === `PREVIOUS`),
        program: program.title,
        timestamp: new Date().toISOString(),
      }),
      statusCode: 200,
    });
  } catch (error) {
    done(null, {
      body: JSON.stringify({
        statusCode: 400,
        error: `Invalid channel slug supplied`,
        request: {
          channel: event.pathParameters.channelCode,
        },
        availableChannels: channels,
      }),
    });
  }
};
