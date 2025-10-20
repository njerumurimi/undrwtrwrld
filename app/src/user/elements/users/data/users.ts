import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const users = Array.from({ length: 500 }, () => {
  const STATUSES = ['active', 'inactive', 'invited', 'suspended'] as const
  const ROLES = ['superadmin', 'admin', 'cashier', 'manager'] as const
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet.userName({ firstName, lastName }).toLocaleLowerCase(),
    email: faker.internet.email({ firstName, lastName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number(), // avoid unsupported options in this runtime
    status: faker.helpers.arrayElement(STATUSES) as typeof STATUSES[number],
    role: faker.helpers.arrayElement(ROLES) as typeof ROLES[number],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
