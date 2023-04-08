import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers/mongo-helper'
import mongoose from 'mongoose'

describe('Mongo Helper', () => {
  describe('startListeners()', () => {
    it('Should call listeners when starts connection', async () => {
      const startListenersSpy = jest.spyOn(MongoHelper, 'startListeners')
      await MongoHelper.connect(process.env.MONGO_URL)
      await MongoHelper.disconnect()
      expect(startListenersSpy).toHaveBeenCalledTimes(1)
    })

    it('Should start listeners if NODE_ENV is development', () => {
      jest.spyOn(MongoHelper, 'startListeners')
      const tempEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      MongoHelper.startListeners()
      expect(MongoHelper.client.eventNames()).toContain('connected')
      expect(MongoHelper.client.eventNames()).toContain('disconnected')
      process.env.NODE_ENV = tempEnv
    })

    it('Should not start listeners if NODE_ENV is not development', async () => {
      await MongoHelper.connect(process.env.MONGO_URL)
      expect(MongoHelper.client.eventNames()).not.toContain('connected')
      expect(MongoHelper.client.eventNames()).not.toContain('disconnected')
      await MongoHelper.disconnect()
    })

    it('Should return if connection is already started', async () => {
      const createConnectionSpy = jest.spyOn(mongoose, 'createConnection')
      await MongoHelper.connect(process.env.MONGO_URL)
      await MongoHelper.connect(process.env.MONGO_URL)
      expect(createConnectionSpy).toHaveBeenCalledTimes(1)
      await MongoHelper.disconnect()
    })

    it('Should call close with disconnect are used', async () => {
      await MongoHelper.connect(process.env.MONGO_URL)
      const destroySpy = jest.spyOn(MongoHelper.client, 'close')
      await MongoHelper.disconnect()
      expect(destroySpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('map()', () => {
    it('Should return a mapped object', () => {
      const stub = {
        _id: 'any_id',
        any_field: 'any_value'
      }

      const stubMapped = {
        id: 'any_id',
        any_field: 'any_value'
      }
      const objectMapped = MongoHelper.map(stub)
      expect(objectMapped).toEqual(stubMapped)
    })

    it('Should return a mapped collection', () => {
      const stub = [{
        _id: 'any_id',
        any_field: 'any_value'
      }, {
        _id: 'any_id_2',
        any_field: 'any_value_2'
      }]

      const stubMapped = [{
        id: 'any_id',
        any_field: 'any_value'
      }, {
        id: 'any_id_2',
        any_field: 'any_value_2'
      }]
      const collectionMapped = MongoHelper.map(stub)
      expect(collectionMapped).toEqual(stubMapped)
    })

    it('Should call map some times if collection are provided', () => {
      const mapSpy = jest.spyOn(MongoHelper, 'map')
      const stub = [{
        _id: 'any_id',
        any_field: 'any_value'
      }, {
        _id: 'any_id_2',
        any_field: 'any_value_2'
      }]
      MongoHelper.map(stub)
      expect(mapSpy).toHaveBeenCalledTimes(3)
    })
  })

  describe('isConnected()', () => {
    it('should return true if connection is established', async () => {
      await MongoHelper.connect(process.env.MONGO_URL)
      expect(MongoHelper.isConnected()).toBeTruthy()
    })
  })
})
