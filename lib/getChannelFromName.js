import channels from '../channels';

export default channelName => {
  const normalizedRequest = channelName
    .toLowerCase()
    .trim()
    .replace(/\s+/, `-`);

  const [foundChannel] = channels.filter(channel => channel.names.includes(normalizedRequest));
  return foundChannel;
};
