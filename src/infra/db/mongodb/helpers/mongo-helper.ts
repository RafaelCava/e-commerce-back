import mongoose from 'mongoose'

export class MongoHelper {
  static client: mongoose.Connection = null
  static async connect (uri: string): Promise<void> {
    this.client = mongoose.createConnection(uri)
    this.startListeners()
    await this.client.asPromise()
  }

  static startListeners (): void {
    if (process.env.NODE_ENV === 'development') {
      this.client.on('connected', () => { console.log('MongoDB connected') })
      this.client.on('disconnected', () => { console.log('MongoDB disconnected') })
    }
  }

  static async disconnect (): Promise<void> {
    await this.client.destroy()
  }

  static getModel (model: string, schema: any): mongoose.Model<any> {
    return this.client.model(model, schema)
  }
}
