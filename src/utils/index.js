
const {ObjectId} = require('mongodb')
const _ = require('lodash')

const getInforData = ({ fields = [] , object = {} }) => {
  return _.pick(object, fields)
}


// ['a', 'b'] => {a : 1, b : 1}
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map(el => [el, 1]))
}

// ['a', 'b'] => {a : 0, b : 0}
const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map(el => [el, 0]))
}

const removeUndefinedObject = obj => {
  Object.keys(obj).forEach(k => {
    if(obj[k] == null){
      delete obj[k]
    }
  })

  return obj
}


const transformToObjectId = (id) => {
  const newId = new ObjectId(id)
  if(ObjectId.isValid(newId)){
    return newId
  }
}

const replacePlaceHolder = async (template, params) => {
  Object.keys(params).forEach(k => {
    const placeHolder = `{{ ${k}}}`//verify key
    template = template.replace(new RegExp(placeHolder, 'g'), params[k])

    return template
})}
module.exports = {
  getInforData,
  getSelectData,
  unGetSelectData,
  removeUndefinedObject,
  transformToObjectId,
  replacePlaceHolder
};