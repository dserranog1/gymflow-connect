/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1ta38sa546styn0",
    "created": "2023-11-21 21:15:41.352Z",
    "updated": "2023-11-21 21:15:41.352Z",
    "name": "classes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "psuem61j",
        "name": "maxAttendees",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "behkcvwt",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "4tnrrbkw",
        "name": "date",
        "type": "date",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "crbckzbe",
        "name": "attendees",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1ta38sa546styn0");

  return dao.deleteCollection(collection);
})
