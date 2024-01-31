### TODO app using nodejs and mysql

1. DB:

   - The DB contain two tables; users and todos.

      1. users tables: This table contain `13 columns`:

           |  No.  | Column          | Description, notes or any infos.                                                                     |
           | :---: | :-------------- | :--------------------------------------------------------------------------------------------------- |
           |   1   | user_id         | primary, int(10),                                                                                    |
           |   2   | user_role       | ADMIN (Can `CRUD` any user or task), Owner (Can `CRUD` any task), visitor (Can `READ` PUBLIC tasks). |
           |   3   | user_first_name | varchar(45).                                                                                         |
           |   4   | user_last_name  | varchar(45).                                                                                         |
           |   4   | user_username   | varchar(45).                                                                                         |
           |   5   | user_email      | varcahr(150).                                                                                        |
           |   5   | user_password   | HASHED, MD5, SHA-x.                                                                                  |
           |   6   | user_picture    | varchar(250), picture name.                                                                          |
           |   7   | user_bio        | varchar(250).                                                                                        |
           |   8   | number_of_tasks | TINYINT.                                                                                             |
           |   9   | linked_accounts | Gmail, Facebook, X, Github.                                                                          |
           |  10   | profile_type    | Private (DEFAULT), Public.                                                                           |
           |  11   | created         | Day, Date, Time `(H:M)`.                                                                             |

      2. todo table: This table contain `8 columns`:

           |  No.  | Column        | Description, notes or any infos.  |
           | :---: | :------------ | :-------------------------------- |
           |   1   | task_id       | primary, int(10), random numbers. |
           |   2   | owner_id      | user_id.                          |
           |   3   | task_title    | varchar(150), main title.         |
           |   4   | task_subtitle | varchar(250), short description.  |
           |   5   | task_todo     | varcahr(max), task todo.          |
           |   6   | done          | (yes/no), (y/n), (0/1).           |
           |   7   | last_edited   | Day, Date, Time `(H:M)`.          |
           |   8   | created       | Day, Date, Time `(H:M)`.          |

      <br>

2. App:
3. Controllers:
4. Routes:
5. Middleware:
