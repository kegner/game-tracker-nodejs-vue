const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: ["number", "null"] },
        firstName: { type: ["string", "null"] },
        lastName: { type: ["string", "null"] },
        email: { type: ["string", "null" ] },
        username: { type: ["string", "null"] },
        password: { type: ["string", "null"] }
      }
    }
  }
}

module.exports = User