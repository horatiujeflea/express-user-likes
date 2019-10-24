INSERT INTO "app_user"("id", "username", "password") VALUES(1, 'johndoe1@gmail.com', 'pass1');
INSERT INTO "app_user"("id", "username", "password") VALUES(2, 'johndoe2@gmail.com', 'pass2');
INSERT INTO "app_user"("id", "username", "password") VALUES(3, 'johndoe3@gmail.com', 'pass3');
INSERT INTO "app_user"("id", "username", "password") VALUES(4, 'johndoe4@gmail.com', 'pass4');
INSERT INTO "app_user"("id", "username", "password") VALUES(5, 'johndoe5@gmail.com', 'pass5');

INSERT INTO "user_like"("from_user", "to_user") VALUES(1, 2);
INSERT INTO "user_like"("from_user", "to_user") VALUES(3, 2);
INSERT INTO "user_like"("from_user", "to_user") VALUES(3, 1);
INSERT INTO "user_like"("from_user", "to_user") VALUES(1, 4);
INSERT INTO "user_like"("from_user", "to_user") VALUES(2, 4);
INSERT INTO "user_like"("from_user", "to_user") VALUES(3, 4);