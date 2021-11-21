import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
}

export default function echo(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader('content-type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ 
    message: req.query.message as string ?? 'base-message' 
  }))
  // res.status(200).json({ 
  //   message: req.query.message as string || 'base-message' 
  // })
}
