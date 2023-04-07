import { DbAddCompany } from '@/data/usecases'
import { type AddCompany } from '@/domain/usecases'
import { CompanyMongoRepository } from '@/infra/db/mongodb/repositories'

export const makeDbAddCompany = (): AddCompany => {
  return new DbAddCompany(new CompanyMongoRepository(), new CompanyMongoRepository())
}
