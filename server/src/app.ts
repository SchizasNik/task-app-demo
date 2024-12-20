import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import 'module-alias/register';
import { mongo_url, PORT } from '@server/config';
import { connectToMongo } from '@server/db/controllers/mongo_controllers';
import { tokenAuthentication } from '@server/middleware/token_authentication';
import { userAuthentication } from '@server/middleware/user_authentication';
import { tasksRouter } from '@server/routes/tasks';
import { errors } from 'celebrate';
import { validateUser } from '@server/validations/create_user';
import { validateLogin } from '@server/validations/login';
import { router as loginRouter } from '@server/routes/login';
import { router as createUserRouter } from '@server/routes/create_user';
import { router as usersRouter } from '@server/routes/users';
import { invitationsRouter } from '@server/routes/invitations';
import { initializeAdmin } from '@server/db/init_functions/initialize_admin';

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
// login & create-user
app.use('/api/users/account', validateUser, createUserRouter);
app.use('/api/auth', validateLogin, loginRouter);
// Middleware
app.use(tokenAuthentication);
app.use(userAuthentication);
// Routes
app.use('/api/users', usersRouter);
// tasks
app.use('/api', tasksRouter);
// invitations
app.use('/api', invitationsRouter);
// handler for all input error from celebrate
app.use(errors());
//
(async () => {
  await connectToMongo({ url: mongo_url });
  await initializeAdmin();
  app.listen(PORT, function () {
    console.log('App listening on port ' + PORT);
  });
})();
