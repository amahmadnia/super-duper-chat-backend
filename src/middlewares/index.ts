import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from './../db/users';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['PIRATE_KING_LUFFY'];

    if (!sessionToken) {
      return res.status(403).send('Unauthorized');
    }

    const exisitingUser = await getUserBySessionToken(sessionToken);

    if (!exisitingUser) {
      return res.status(403).send('Unauthorized');
    }

    merge(req, { identity: exisitingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).send('Bad request');
  }
};
