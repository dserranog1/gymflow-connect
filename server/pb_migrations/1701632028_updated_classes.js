/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ta38sa546styn0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fr9zdjvy",
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
  const collection = dao.findCollectionByNameOrId("1ta38sa546styn0")

  // remove
  collection.schema.removeField("fr9zdjvy")

  return dao.saveCollection(collection)
})
