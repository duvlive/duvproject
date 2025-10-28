require('dotenv').config();

const url = process.env.DATABASE_URL;


if (!url) {
  console.error('\n ERROR: DATABASE_URL is not set in your environment.\n');
  console.error('Please add it to your .env file, e.g.:');
  console.error('DATABASE_URL=postgresql://user:password@postgres.railway.internal:5432/dbname\n');
  process.exit(1);
}

if (!/^postgres(ql)?:\/\//.test(url)) {
  console.warn('\n  Warning: DATABASE_URL might be invalid. It should start with "postgres://" or "postgresql://"\n');
  console.warn(`Current value: ${url}\n`);
}

console.log(` Using database URL: ${url}`);

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
};
