import getChannelFromName from './lib/getChannelFromName';
import { getCurrentProgram } from './lib/getProgram';
import getPlaylist from './lib/getPlaylist';

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
  const { code: channelCode } = getChannelFromName(`stu bru`);

  const [program, playlist] = await Promise.all([
    getCurrentProgram(channelCode),
    getPlaylist(channelCode),
  ]);

  const parsedResponse = playlist.onairs.map(mapResponse);

  const response = {
    body: JSON.stringify({
      current: parsedResponse.find(airing => airing.type === `NOW`),
      previous: parsedResponse.find(airing => airing.type === `PREVIOUS`),
      program: program.title,
      timestamp: new Date().toISOString(),
    }),
    statusCode: 200,
  };

  done(null, response);
};
