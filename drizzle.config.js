/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ruvadb_owner:zt4A7JjflkwO@ep-black-bonus-a1g83207.ap-southeast-1.aws.neon.tech/ruvadb?sslmode=require',
    }
  };