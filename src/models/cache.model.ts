"use strict";

class User {
  name: string;
    email: string;
  constructor(name:string, email:string) {
    this.name = name;
    this.email = email;
  }
}

module.exports = User;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */