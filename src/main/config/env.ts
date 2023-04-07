export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/e-commerce-back',
  port: process.env.PORT || 3033,
  jwtSecret: process.env.JWT_SECRET || 'tj67d6f5g4h3j2k1l'
}
