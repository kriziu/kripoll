import { NextApiRequest, NextApiResponse } from 'next';

import { getPublicPoll } from '@/common/lib/getPublicPoll';

// declare global {
//   // eslint-disable-next-line
//   var pinCodes: Map<string, string>;
// }

const pinCodes = new Map<string, string>();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: 'Missing poll id' });

  const poll = await getPublicPoll(id.toString());

  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  if ([...pinCodes.values()].includes(id.toString()))
    return res.status(200).json({ pinCode: pinCodes.get(id.toString()) });

  let pinCode: string;
  do {
    pinCode = Math.floor(Math.random() * 1000000).toString();
  } while (pinCodes.has(pinCode));

  pinCodes.set(pinCode, id.toString());

  setTimeout(() => pinCodes.delete(pinCode), 1000 * 60 * 15);

  return res.status(200).json({ pinCode });
};

export { pinCodes };

export default handler;
