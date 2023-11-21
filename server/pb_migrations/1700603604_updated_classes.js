/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ta38sa546styn0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "deszgiq9",
    "name": "difficulty",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "low",
        "medium",
        "high"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ta38sa546styn0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "deszgiq9",
    "name": "dificulty",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "low",
        "medium",
        "high"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
