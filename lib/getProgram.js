const getProgram = async channelCode => await (await fetch(
  `https://services.vrt.be/epg/onair?channel_code=${channelCode}`,
  {
    headers: {
      accept: `application/vnd.epg.vrt.be.onairs_1.2+json`,
    },
  },
)).json();

export const getCurrentProgram = async channelCode => {
  const { onairs } = await getProgram(channelCode);
  return onairs[0].now;
};

export const getPreviousProgram = async channelCode => {
  const { onairs } = await getProgram(channelCode);
  return onairs[0].previous;
};

export const getNextProgram = async channelCode => {
  const { onairs } = await getProgram(channelCode);
  return onairs[0].next;
};
