/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k1njhpypnk60yul")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pek5q1zy",
    "name": "isActive",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k1njhpypnk60yul")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pek5q1zy",
    "name": "isActive",
    "type": "bool",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
