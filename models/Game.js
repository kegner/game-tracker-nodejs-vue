const { Model } = require("objection");

class Game extends Model {
  static get tableName() {
    return "games";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: ["number", "null"] },
        title: { type: ["string", "null"] },
        platform: { type: ["string", "null"] },
        startDate: { type: ["string", "null"] },
        endDate: { type: ["string", "null"] },
        status: { type: ["string", "null"] },
        hoursToComplete: { type: ["number", "null"] },
        rating: { type: ["number", "null"] },
        price: { type: ["number", "null"] },
        userId: { type: ["number", "null"] }
      }
    }
  }

  static get relationMappings() {
    const User = require("./User");

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "games.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Game