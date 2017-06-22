import { makeArray } from './lib/utils';
import Faker from 'faker'

const data = makeArray(500, id => {
  return {
    id,
    title: `Task ${id}`,
    description: Faker.lorem.paragraph(),
    duration: Faker.random.number() + ' days',
    percentComplete: Math.round(Math.random() * 100),
    start: Faker.date.past(),
    finish: Faker.date.future(),
    effortDriven: (id % 5 == 0)
  }
});

export default data;
