export default {
  mongoUrl: process.env.MONGO_URL || 'localhost',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj670==2'

}
